/**
 * @fileoverview Scanner service — recursively walks directories to discover image files.
 * Filters files by supported image extensions and collects metadata.
 * Handles permission errors gracefully without crashing.
 */

import { readdir, stat } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import { ScannedFile, SUPPORTED_EXTENSIONS } from '../types'

/** Callback invoked with progress updates during scanning */
export type ScanProgressCallback = (scanned: number, currentPath: string) => void

/**
 * Recursively walks a list of directories to find all supported image files.
 *
 * @param directories - Array of absolute directory paths to scan
 * @param onProgress - Optional callback invoked for each discovered file
 * @param signal - Optional AbortSignal to cancel the scan mid-operation
 * @returns Array of ScannedFile objects describing each discovered image
 *
 * @example
 * ```ts
 * const files = await scanDirectories(
 *   ['C:/Users/Photos'],
 *   (count, path) => console.log(`Found ${count}: ${path}`)
 * )
 * ```
 */
export async function scanDirectories(
  directories: string[],
  onProgress?: ScanProgressCallback,
  signal?: AbortSignal
): Promise<ScannedFile[]> {
  const results: ScannedFile[] = []
  let scannedCount = 0

  for (const dir of directories) {
    if (signal?.aborted) break
    await walkDirectory(dir, results, onProgress, signal, () => ++scannedCount)
  }

  return results
}

/**
 * Recursively walks a single directory, collecting image files.
 *
 * @param dirPath - Absolute path to the directory to walk
 * @param results - Accumulator array for discovered files (mutated in place)
 * @param onProgress - Optional progress callback
 * @param signal - Optional AbortSignal for cancellation
 * @param incrementCount - Function that increments and returns the current count
 */
async function walkDirectory(
  dirPath: string,
  results: ScannedFile[],
  onProgress?: ScanProgressCallback,
  signal?: AbortSignal,
  incrementCount?: () => number
): Promise<void> {
  if (signal?.aborted) return

  try {
    const entries = await readdir(dirPath, { withFileTypes: true })

    for (const entry of entries) {
      if (signal?.aborted) return

      const fullPath = join(dirPath, entry.name)

      if (entry.isDirectory()) {
        // Recurse into subdirectories
        await walkDirectory(fullPath, results, onProgress, signal, incrementCount)
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase()
        if (!SUPPORTED_EXTENSIONS.has(ext)) continue

        try {
          const fileStat = await stat(fullPath)
          const scannedFile: ScannedFile = {
            path: fullPath,
            name: basename(entry.name),
            size: fileStat.size,
            modifiedAt: fileStat.mtime.toISOString()
          }

          results.push(scannedFile)

          const count = incrementCount?.() ?? results.length
          onProgress?.(count, fullPath)
        } catch (err) {
          // Skip files we can't stat (locked, deleted between readdir and stat, etc.)
          const code = (err as NodeJS.ErrnoException).code
          console.warn(`[Scanner] Skipping unreadable file: ${fullPath} (${code})`)
        }
      }
    }
  } catch (err) {
    // Gracefully handle permission errors, missing directories, etc.
    const code = (err as NodeJS.ErrnoException).code
    if (code === 'EACCES' || code === 'EPERM' || code === 'ENOENT') {
      console.warn(`[Scanner] Skipping inaccessible directory: ${dirPath} (${code})`)
      return
    }
    throw err
  }
}

/**
 * Checks whether a file path has a supported image extension.
 *
 * @param filePath - File path or name to check
 * @returns True if the extension is a supported image format
 */
export function isSupportedImage(filePath: string): boolean {
  return SUPPORTED_EXTENSIONS.has(extname(filePath).toLowerCase())
}
