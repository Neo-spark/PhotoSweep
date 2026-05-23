/**
 * @fileoverview Hasher service — orchestrates a Piscina worker pool to compute
 * hashes, metadata, and thumbnails for an array of image files in parallel.
 * Reports progress via callback and supports cancellation via AbortController.
 */

import { join } from 'node:path'
import { cpus } from 'node:os'
import Piscina from 'piscina'
import type { HashedImage, ScannedFile } from '../types'
import { getFileCache, saveFileCache } from './db'

/** Progress callback invoked after each file is processed */
export type HashProgressCallback = (completed: number, total: number, currentFile: string) => void

/**
 * Creates and manages the worker pool lifecycle.
 * Call `hashFiles()` to process images, then `destroy()` to clean up workers.
 */
export class HasherService {
  private pool: Piscina

  /**
   * @param workerPath - Absolute path to the compiled hash-worker.js file.
   *   In production this is resolved from the app's output directory.
   * @param maxThreads - Maximum number of worker threads (defaults to half the CPU cores)
   */
  constructor(workerPath?: string, maxThreads?: number) {
    const resolvedWorkerPath = workerPath ?? join(__dirname, 'hash-worker.js')

    this.pool = new Piscina({
      filename: resolvedWorkerPath,
      maxThreads: maxThreads ?? Math.max(1, Math.floor(cpus().length / 2)),
      idleTimeout: 30_000
    })
  }

  /**
   * Processes an array of file paths through the worker pool.
   * Each file gets hashed, its metadata extracted, and a thumbnail generated.
   *
   * @param files - Array of ScannedFile objects to process
   * @param thumbnailDir - Directory where thumbnails should be saved
   * @param onProgress - Optional callback invoked after each file completes
   * @param signal - Optional AbortSignal to cancel processing mid-flight
   * @returns Array of HashedImage results (may include entries with errors)
   */
  async hashFiles(
    files: ScannedFile[],
    thumbnailDir: string,
    onProgress?: HashProgressCallback,
    signal?: AbortSignal
  ): Promise<HashedImage[]> {
    const total = files.length
    const results: HashedImage[] = []
    let completed = 0

    // Create all task promises
    const taskPromises = files.map(async (file) => {
      const { path: filePath, modifiedAt: mtime, size } = file

      // Check cancellation before starting each task
      if (signal?.aborted) {
        return null
      }

      // 1. Check the SQLite Cache
      const cached = getFileCache(filePath, mtime, size)
      if (cached) {
        completed++
        onProgress?.(completed, total, filePath)
        return cached
      }

      try {
        const result: HashedImage = await this.pool.run(
          { filePath, thumbnailDir },
          { signal }
        )

        // 2. Save result to DB Cache
        if (!result.error && result.sha256) {
          saveFileCache(result, mtime)
        }

        completed++
        onProgress?.(completed, total, filePath)
        return result
      } catch (err) {
        // Handle cancellation (AbortError)
        if ((err as Error).name === 'AbortError') {
          return null
        }

        // Handle other errors — create an error result so we don't lose info
        completed++
        const errorResult: HashedImage = {
          filePath,
          fileName: filePath.split(/[\\/]/).pop() ?? '',
          sha256: '',
          phash: '',
          width: 0,
          height: 0,
          format: 'unknown',
          size: 0,
          thumbnailPath: '',
          createdAt: '',
          error: err instanceof Error ? err.message : String(err)
        }

        onProgress?.(completed, total, filePath)
        return errorResult
      }
    })

    // Wait for all tasks to complete (or be cancelled)
    const settledResults = await Promise.all(taskPromises)

    for (const result of settledResults) {
      if (result !== null) {
        results.push(result)
      }
    }

    return results
  }

  /**
   * Destroys the worker pool, cleaning up threads.
   * Should be called when the hasher is no longer needed.
   */
  async destroy(): Promise<void> {
    await this.pool.destroy()
  }

  /**
   * Returns the number of tasks currently queued in the worker pool.
   */
  get queueSize(): number {
    return this.pool.queueSize
  }
}
