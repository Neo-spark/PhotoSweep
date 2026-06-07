/**
 * @fileoverview Preload script — exposes a typed `window.api` object to the renderer
 * using Electron's contextBridge for secure IPC communication.
 *
 * All IPC calls are wrapped in typed methods. Event listeners return cleanup
 * functions for proper resource management.
 */

import { contextBridge, ipcRenderer } from 'electron'
import type {
  ScanProgress,
  ScanResults,
  ComparisonResult,
  DuplicateGroup
} from '../main/types'

/** IPC channel constants (duplicated here to avoid importing main process code) */
const CHANNELS = {
  SELECT_FOLDERS: 'scan:select-folders',
  SCAN_START: 'scan:start',
  SCAN_CANCEL: 'scan:cancel',
  SCAN_PROGRESS: 'scan:progress',
  SCAN_RESULTS: 'scan:results',
  ACTION_DELETE: 'action:delete',
  ACTION_UNDO: 'action:undo',
  COMPARE_IMAGES: 'compare:images',
  EXPORT_CSV: 'export:csv',
  THUMBNAIL_GET: 'thumbnail:get'
} as const

/** The API object exposed to the renderer via window.api */
const api = {
  // ---------- Scan Operations ----------

  /**
   * Opens a native folder picker dialog for selecting directories to scan.
   * @returns Array of selected folder paths, or empty array if cancelled
   */
  selectFolders: (): Promise<string[]> => {
    try {
      return ipcRenderer.invoke(CHANNELS.SELECT_FOLDERS)
    } catch (err) {
      // Fail-safe: log and return empty selection
      // Renderer should handle empty arrays gracefully
      // eslint-disable-next-line no-console
      console.error('preload.selectFolders failed', err)
      return Promise.resolve([])
    }
  },

  /**
   * Opens a native file picker dialog for selecting image files.
   * @returns Array of selected file paths, or empty array if cancelled
   */
  selectFiles: (): Promise<string[]> => {
    try {
      return ipcRenderer.invoke('system:select-files')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('preload.selectFiles failed', err)
      return Promise.resolve([])
    }
  },

  /**
   * Starts a full duplicate scan on the given folders.
   * Progress updates are received via `onScanProgress`.
   * Final results are received via `onScanResults`.
   *
   * @param folders - Array of folder paths to scan
   * @param threshold - Hamming distance threshold for similar image matching (default 5)
   * @returns The scan results, or null if cancelled
   */
  startScan: (folders: string[], threshold?: number): Promise<ScanResults | null> => {
    try {
      return ipcRenderer.invoke(CHANNELS.SCAN_START, folders, threshold)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('preload.startScan failed', err)
      return Promise.resolve(null)
    }
  },

  /**
   * Cancels the currently running scan.
   * @returns True if a scan was cancelled, false if no scan was running
   */
  cancelScan: (): Promise<boolean> => {
    try {
      return ipcRenderer.invoke(CHANNELS.SCAN_CANCEL)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('preload.cancelScan failed', err)
      return Promise.resolve(false)
    }
  },

  /**
   * Subscribes to scan progress events.
   *
   * @param callback - Function called with each progress update
   * @returns Cleanup function to remove the listener
   */
  onScanProgress: (callback: (progress: ScanProgress) => void): (() => void) => {
    const handler = (_event: Electron.IpcRendererEvent, progress: ScanProgress): void => {
      callback(progress)
    }
    ipcRenderer.on(CHANNELS.SCAN_PROGRESS, handler)
    return () => {
      ipcRenderer.removeListener(CHANNELS.SCAN_PROGRESS, handler)
    }
  },

  /**
   * Subscribes to scan results events.
   *
   * @param callback - Function called with the final scan results
   * @returns Cleanup function to remove the listener
   */
  onScanResults: (callback: (results: ScanResults) => void): (() => void) => {
    const handler = (_event: Electron.IpcRendererEvent, results: ScanResults): void => {
      callback(results)
    }
    ipcRenderer.on(CHANNELS.SCAN_RESULTS, handler)
    return () => {
      ipcRenderer.removeListener(CHANNELS.SCAN_RESULTS, handler)
    }
  },

  // ---------- File Actions ----------

  /**
   * Deletes files by moving them to the system Recycle Bin.
   *
   * @param filePaths - Array of absolute file paths to delete
   * @returns Object with deletedCount, any errors, and undoId
   */
  deleteFiles: (
    filePaths: string[]
  ): Promise<{ deletedCount: number; errors: Array<{ path: string; error: string }>; undoId: string }> => {
    try {
      return ipcRenderer.invoke(CHANNELS.ACTION_DELETE, filePaths)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('preload.deleteFiles failed', err)
      return Promise.resolve({ deletedCount: 0, errors: [], undoId: '' })
    }
  },

  /**
   * Attempts to undo a previous delete operation.
   *
   * @param undoId - Optional specific undo entry ID (defaults to most recent)
   * @returns Object with success status and message
   */
  undoDelete: (
    undoId?: string
  ): Promise<{ success: boolean; message: string; files?: Array<{ originalPath: string; fileName: string }> }> => {
    try {
      return ipcRenderer.invoke(CHANNELS.ACTION_UNDO, undoId)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('preload.undoDelete failed', err)
      return Promise.resolve({ success: false, message: 'undo failed' })
    }
  },

  // ---------- Image Comparison ----------

  /**
   * Compares two images in detail (SHA-256, pHash, pixel diff).
   *
   * @param pathA - Absolute path to the first image
   * @param pathB - Absolute path to the second image
   * @returns Detailed comparison result with similarity score
   */
  compareImages: (pathA: string, pathB: string): Promise<ComparisonResult> => {
    try {
      return ipcRenderer.invoke(CHANNELS.COMPARE_IMAGES, pathA, pathB)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('preload.compareImages failed', err)
      // Return a rejected promise (consistent with all other preload methods)
      return Promise.reject(err)
    }
  },

  // ---------- Export ----------

  /**
   * Exports duplicate groups to a CSV file (shows save dialog).
   *
   * @param groups - Array of DuplicateGroup objects to export
   * @returns Saved file path, or null if the user cancelled
   */
  exportCSV: (groups: DuplicateGroup[]): Promise<string | null> => {
    try {
      return ipcRenderer.invoke(CHANNELS.EXPORT_CSV, groups)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('preload.exportCSV failed', err)
      return Promise.resolve(null)
    }
  },

  // ---------- Thumbnails ----------

  /**
   * Gets a cached thumbnail as a base64 data URL.
   *
   * @param thumbnailPath - Absolute path to the thumbnail file
   * @returns Base64 data URL string (image/webp), or null if not found
   */
  getThumbnail: (thumbnailPath: string): Promise<string | null> => {
    try {
      return ipcRenderer.invoke(CHANNELS.THUMBNAIL_GET, thumbnailPath)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('preload.getThumbnail failed', err)
      return Promise.resolve(null)
    }
  },

  // ---------- System Actions ----------
  openFile: (path: string): Promise<void> => {
    try {
      return ipcRenderer.invoke('system:open-file', path)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('preload.openFile failed', err)
      return Promise.resolve()
    }
  }
}

// Expose the API object to the renderer via window.api
contextBridge.exposeInMainWorld('api', api)

// Export type for use in the .d.ts file
export type ElectronAPI = typeof api
