/**
 * @fileoverview IPC handlers — bridges all backend services to the renderer process.
 *
 * Registers ipcMain.handle() for request/response patterns and uses
 * mainWindow.webContents.send() for streaming progress events.
 *
 * Manages the scan lifecycle (start, cancel) and maintains an undo stack
 * for file deletions.
 */

import { ipcMain, dialog, BrowserWindow } from 'electron'
import { readFile } from 'node:fs/promises'
import { scanDirectories } from './services/scanner'
import { HasherService } from './services/hasher'
import { groupDuplicates } from './services/grouper'
import { compareImages } from './services/comparator'
import { exportToCSV } from './services/exporter'
import type { ScanProgress, ScanResults, DuplicateGroup, UndoEntry } from './types'
import { IPC_CHANNELS } from './types'

/** Active abort controller for the current scan (null if no scan running) */
let scanAbortController: AbortController | null = null

/** Active hasher service instance (null if no scan running) */
let activeHasher: HasherService | null = null

/** Stack of delete operations that can be undone */
const undoStack: UndoEntry[] = []

/** Maximum number of undo operations to keep in memory */
const MAX_UNDO_STACK = 50

/**
 * Registers all IPC handlers for the application.
 * Should be called once during app initialization, after the main window is created.
 *
 * @param mainWindow - The main BrowserWindow instance to send events to
 * @param thumbnailDir - Absolute path to the thumbnail cache directory
 */
export function registerIPCHandlers(
  mainWindow: BrowserWindow,
  thumbnailDir: string
): void {
  // ---------- Folder Selection ----------

  /**
   * Opens a native folder selection dialog.
   * Returns an array of selected folder paths, or empty array if cancelled.
   */
  ipcMain.handle(IPC_CHANNELS.SELECT_FOLDERS, async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Select Folders to Scan for Duplicates',
      properties: ['openDirectory', 'multiSelections'],
      buttonLabel: 'Scan These Folders'
    })

    return result.canceled ? [] : result.filePaths
  })

  // ---------- Scan Lifecycle ----------

  /**
   * Starts a full scan pipeline: directory walking → hashing → grouping.
   * Streams progress events to the renderer throughout the process.
   *
   * @param _event - IPC event (unused)
   * @param folders - Array of folder paths to scan
   * @param threshold - Hamming distance threshold for similar image grouping (default 5)
   */
  ipcMain.handle(
    IPC_CHANNELS.SCAN_START,
    async (_event, folders: string[], threshold?: number) => {
      // Prevent concurrent scans
      if (scanAbortController) {
        throw new Error('A scan is already in progress. Cancel it first.')
      }

      scanAbortController = new AbortController()
      const { signal } = scanAbortController
      const startTime = Date.now()

      /** Helper to send progress updates to the renderer */
      const sendProgress = (progress: ScanProgress): void => {
        if (!mainWindow.isDestroyed()) {
          mainWindow.webContents.send(IPC_CHANNELS.SCAN_PROGRESS, progress)
        }
      }

      try {
        // --- Phase 1: Scan directories ---
        sendProgress({
          phase: 'scanning',
          current: 0,
          total: 0,
          message: 'Discovering image files...'
        })

        const scannedFiles = await scanDirectories(
          folders,
          (count, currentFile) => {
            sendProgress({
              phase: 'scanning',
              current: count,
              total: 0,
              currentFile,
              message: `Found ${count} images...`
            })
          },
          signal
        )

        if (signal.aborted) {
          sendProgress({ phase: 'cancelled', current: 0, total: 0, message: 'Scan cancelled.' })
          return null
        }

        if (scannedFiles.length === 0) {
          sendProgress({
            phase: 'complete',
            current: 0,
            total: 0,
            message: 'No image files found in the selected folders.'
          })
          const emptyResults: ScanResults = {
            groups: [],
            totalFilesScanned: 0,
            totalDuplicates: 0,
            totalSpaceSavings: 0,
            scanDurationMs: Date.now() - startTime
          }
          mainWindow.webContents.send(IPC_CHANNELS.SCAN_RESULTS, emptyResults)
          return emptyResults
        }

        // --- Phase 2: Hash all files ---
        sendProgress({
          phase: 'hashing',
          current: 0,
          total: scannedFiles.length,
          message: `Analyzing ${scannedFiles.length} images...`
        })

        activeHasher = new HasherService()

        const hashedImages = await activeHasher.hashFiles(
          scannedFiles,
          thumbnailDir,
          (completed, total, currentFile) => {
            sendProgress({
              phase: 'hashing',
              current: completed,
              total,
              currentFile,
              message: `Analyzing image ${completed} of ${total}...`
            })
          },
          signal
        )

        // Cleanup hasher
        await activeHasher.destroy()
        activeHasher = null

        if (signal.aborted) {
          sendProgress({ phase: 'cancelled', current: 0, total: 0, message: 'Scan cancelled.' })
          return null
        }

        // --- Phase 3: Group duplicates ---
        sendProgress({
          phase: 'grouping',
          current: 0,
          total: hashedImages.length,
          message: 'Grouping duplicates...'
        })

        const groups = groupDuplicates(hashedImages, threshold ?? 5)

        // --- Build results ---
        const totalDuplicates = groups.reduce(
          (sum, g) => sum + g.images.length - 1, // subtract 1 for the original
          0
        )
        const totalSpaceSavings = groups.reduce((sum, g) => sum + g.spaceSavings, 0)
        
        const failedFiles = hashedImages
          .filter(img => img.error)
          .map(img => ({ filePath: img.filePath, error: img.error! }))

        const results: ScanResults = {
          groups,
          totalFilesScanned: scannedFiles.length,
          totalDuplicates,
          totalSpaceSavings,
          scanDurationMs: Date.now() - startTime,
          failedFiles
        }

        sendProgress({
          phase: 'complete',
          current: scannedFiles.length,
          total: scannedFiles.length,
          message: `Found ${groups.length} groups with ${totalDuplicates} duplicates.`
        })

        // Send final results
        if (!mainWindow.isDestroyed()) {
          mainWindow.webContents.send(IPC_CHANNELS.SCAN_RESULTS, results)
        }

        return results
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        sendProgress({
          phase: 'error',
          current: 0,
          total: 0,
          message: `Scan error: ${message}`
        })
        throw err
      } finally {
        scanAbortController = null
        if (activeHasher) {
          await activeHasher.destroy()
          activeHasher = null
        }
      }
    }
  )

  /**
   * Cancels the currently running scan.
   */
  ipcMain.handle(IPC_CHANNELS.SCAN_CANCEL, async () => {
    if (scanAbortController) {
      scanAbortController.abort()
      scanAbortController = null

      // Also destroy the hasher if active
      if (activeHasher) {
        await activeHasher.destroy()
        activeHasher = null
      }

      return true
    }
    return false
  })

  // ---------- File Actions ----------

  /**
   * Moves files to the system recycle bin.
   * Stores original paths in the undo stack for potential restoration.
   *
   * @param _event - IPC event (unused)
   * @param filePaths - Array of absolute file paths to delete
   */
  ipcMain.handle(IPC_CHANNELS.ACTION_DELETE, async (_event, filePaths: string[]) => {
    // Dynamically import trash (ESM-only)
    const { default: trash } = await import('trash')

    // Store undo info before deleting
    const undoEntry: UndoEntry = {
      id: crypto.randomUUID(),
      deletedAt: new Date().toISOString(),
      files: filePaths.map((p) => ({
        originalPath: p,
        fileName: p.split(/[\\/]/).pop() ?? '',
        size: 0 // Size tracking is best-effort
      }))
    }

    // Move files to trash
    const errors: Array<{ path: string; error: string }> = []

    for (const filePath of filePaths) {
      try {
        await trash(filePath)
      } catch (err) {
        errors.push({
          path: filePath,
          error: err instanceof Error ? err.message : String(err)
        })
      }
    }

    // Only add to undo stack if at least some files were deleted
    const successCount = filePaths.length - errors.length
    if (successCount > 0) {
      // Filter out failed paths from undo entry
      const failedPaths = new Set(errors.map((e) => e.path))
      undoEntry.files = undoEntry.files.filter((f) => !failedPaths.has(f.originalPath))

      undoStack.push(undoEntry)

      // Cap the undo stack size
      while (undoStack.length > MAX_UNDO_STACK) {
        undoStack.shift()
      }
    }

    return {
      deletedCount: successCount,
      errors,
      undoId: undoEntry.id
    }
  })

  /**
   * Attempts to "undo" a delete operation.
   * Note: The system trash doesn't support programmatic restore, so this is
   * a best-effort operation that logs what was deleted for manual recovery.
   *
   * @param _event - IPC event (unused)
   * @param undoId - The undo entry ID to restore (most recent if not specified)
   */
  ipcMain.handle(IPC_CHANNELS.ACTION_UNDO, async (_event, undoId?: string) => {
    let entry: UndoEntry | undefined

    if (undoId) {
      const index = undoStack.findIndex((e) => e.id === undoId)
      if (index !== -1) {
        entry = undoStack.splice(index, 1)[0]
      }
    } else {
      entry = undoStack.pop()
    }

    if (!entry) {
      return { success: false, message: 'No undo operation available.' }
    }

    // We can't reliably restore from trash programmatically on all platforms.
    // Return the file info so the UI can show what was deleted.
    return {
      success: true,
      message: `Found undo entry from ${entry.deletedAt} with ${entry.files.length} files. Files were moved to the system Recycle Bin. Please restore them manually from the Recycle Bin.`,
      files: entry.files
    }
  })

  // ---------- Image Comparison ----------

  /**
   * Compares two images in detail.
   *
   * @param _event - IPC event (unused)
   * @param pathA - Absolute path to the first image
   * @param pathB - Absolute path to the second image
   */
  ipcMain.handle(
    IPC_CHANNELS.COMPARE_IMAGES,
    async (_event, pathA: string, pathB: string) => {
      return await compareImages(pathA, pathB)
    }
  )

  // ---------- CSV Export ----------

  /**
   * Exports duplicate groups to a CSV file.
   *
   * @param _event - IPC event (unused)
   * @param groups - Array of DuplicateGroup objects to export
   */
  ipcMain.handle(
    IPC_CHANNELS.EXPORT_CSV,
    async (_event, groups: DuplicateGroup[]) => {
      return await exportToCSV(groups, mainWindow)
    }
  )

  // ---------- Thumbnail Retrieval ----------

  /**
   * Reads a thumbnail file and returns it as a base64 data URL.
   *
   * @param _event - IPC event (unused)
   * @param thumbnailPath - Absolute path to the thumbnail WebP file
   */
  ipcMain.handle(IPC_CHANNELS.THUMBNAIL_GET, async (_event, thumbnailPath: string) => {
    try {
      const buffer = await readFile(thumbnailPath)
      return `data:image/webp;base64,${buffer.toString('base64')}`
    } catch (err) {
      console.warn('[IPC] Failed to read thumbnail:', thumbnailPath, (err as Error).message)
      return null
    }
  })

  // ---------- System Actions ----------
  ipcMain.handle('system:open-file', async (_event, filePath: string) => {
    const { shell } = require('electron')
    await shell.openPath(filePath)
  })

  ipcMain.handle('system:select-files', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Select Images to Compare',
      properties: ['openFile'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'webp', 'heic', 'tiff', 'tif', 'bmp', 'gif'] }
      ]
    })
    return result.canceled ? [] : result.filePaths
  })
}

/**
 * Unregisters all IPC handlers. Call during app shutdown.
 */
export function unregisterIPCHandlers(): void {
  const channels = Object.values(IPC_CHANNELS)
  for (const channel of channels) {
    ipcMain.removeHandler(channel)
  }
  ipcMain.removeHandler('system:open-file')
  ipcMain.removeHandler('system:select-files')
}
