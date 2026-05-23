/**
 * @fileoverview Type declarations for the `window.api` object exposed by the preload script.
 * Import these types in renderer code for full IntelliSense and type safety.
 */

import type {
  ScanProgress,
  ScanResults,
  ComparisonResult,
  DuplicateGroup
} from '../main/types'

export interface ElectronAPI {
  // ---------- Scan Operations ----------

  /** Opens a native folder picker dialog. Returns selected paths or empty array. */
  selectFolders(): Promise<string[]>

  /** Opens a native file picker dialog for selecting image files. Returns selected paths or empty array. */
  selectFiles(): Promise<string[]>

  /** Starts a full duplicate scan. Returns results or null if cancelled. */
  startScan(folders: string[], threshold?: number): Promise<ScanResults | null>

  /** Cancels the currently running scan. Returns true if cancelled. */
  cancelScan(): Promise<boolean>

  /** Subscribes to scan progress events. Returns a cleanup function. */
  onScanProgress(callback: (progress: ScanProgress) => void): () => void

  /** Subscribes to scan results events. Returns a cleanup function. */
  onScanResults(callback: (results: ScanResults) => void): () => void

  // ---------- File Actions ----------

  /** Moves files to trash. Returns count of deleted files and any errors. */
  deleteFiles(filePaths: string[]): Promise<{
    deletedCount: number
    errors: Array<{ path: string; error: string }>
    undoId: string
  }>

  /** Attempts to undo a delete operation. Returns undo info. */
  undoDelete(undoId?: string): Promise<{
    success: boolean
    message: string
    files?: Array<{ originalPath: string; fileName: string }>
  }>

  // ---------- Image Comparison ----------

  /** Compares two images with SHA-256, pHash, and pixel diff. */
  compareImages(pathA: string, pathB: string): Promise<ComparisonResult>

  // ---------- Export ----------

  /** Exports duplicate groups to CSV (shows save dialog). Returns saved path or null. */
  exportCSV(groups: DuplicateGroup[]): Promise<string | null>

  // ---------- Thumbnails ----------

  /** Gets a thumbnail as a base64 data URL. Returns null if not found. */
  getThumbnail(thumbnailPath: string): Promise<string | null>

  // ---------- System Actions ----------

  /** Opens a file with the system's default application. */
  openFile(path: string): Promise<void>
}

declare global {
  interface Window {
    api: ElectronAPI
  }
}
