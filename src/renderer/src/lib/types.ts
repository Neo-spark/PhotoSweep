/* ═══════════════════════════════════════════════════
   Core Domain Types — mirrored from src/main/types.ts
   ═══════════════════════════════════════════════════ */

/** Image within a duplicate group with ranking metadata (mirrors backend RankedImage) */
export interface ImageFile {
  filePath: string
  fileName: string
  sha256: string
  phash: string
  width: number
  height: number
  format: string
  size: number
  thumbnailPath: string
  createdAt: string
  error?: string
  blurScore?: number
  /** Whether this image is the recommended "keep" candidate */
  isOriginal: boolean
  /** Total pixel count (width × height) */
  resolution: number
  /** Quality rank within the group (1 = best) */
  rank: number
}

export interface DuplicateGroup {
  id: string
  type: 'exact' | 'similar'
  similarity: number
  spaceSavings: number
  images: ImageFile[]
}

export interface ScanProgress {
  phase: 'scanning' | 'hashing' | 'grouping' | 'complete' | 'error' | 'cancelled'
  current: number
  total: number
  currentFile?: string
  message: string
}

export interface ScanResults {
  groups: DuplicateGroup[]
  totalFilesScanned: number
  totalDuplicates: number
  totalSpaceSavings: number
  scanDurationMs: number
  failedFiles: Array<{ filePath: string; error: string }>
}

export interface ComparisonResult {
  type: 'exact' | 'visual' | 'different'
  similarity: number
  hammingDistance: number
  diffImageBase64?: string
}

export interface ScanStats {
  totalImages: number
  totalFilesScanned: number
  duplicateGroups: number
  exactDuplicates: number
  similarImages: number
  totalSize: number
  duplicateSize: number
  scanDurationMs: number
}

/* ═══════════════════════════════════════════════════
   App State Types
   ═══════════════════════════════════════════════════ */

export type AppView = 'scan' | 'results' | 'compare' | 'settings'

export type ScanState = 'idle' | 'scanning' | 'complete' | 'cancelled'

export type FilterType = 'all' | 'exact' | 'similar'

export type SortBy = 'similarity' | 'size' | 'date'

export interface DeleteOperation {
  undoId: string
  paths: string[]
  deletedCount: number
  timestamp: number
}

/* ═══════════════════════════════════════════════════
   Electron API Bridge — exactly mirrors preload/index.d.ts
   ═══════════════════════════════════════════════════ */

export interface ElectronAPI {
  // Scan Operations
  selectFolders(): Promise<string[]>
  selectFiles(): Promise<string[]>
  startScan(folders: string[], threshold?: number): Promise<ScanResults | null>
  cancelScan(): Promise<boolean>
  onScanProgress(callback: (progress: ScanProgress) => void): () => void
  onScanResults(callback: (results: ScanResults) => void): () => void

  // File Actions
  deleteFiles(filePaths: string[]): Promise<{
    deletedCount: number
    errors: Array<{ path: string; error: string }>
    undoId: string
  }>
  undoDelete(undoId?: string): Promise<{
    success: boolean
    message: string
    files?: Array<{ originalPath: string; fileName: string }>
  }>

  // Image Comparison
  compareImages(pathA: string, pathB: string): Promise<ComparisonResult>

  // Export
  exportCSV(groups: DuplicateGroup[]): Promise<string | null>

  // Thumbnails
  getThumbnail(thumbnailPath: string): Promise<string | null>

  // System
  openFile(path: string): Promise<void>
}

declare global {
  interface Window {
    api: ElectronAPI
  }
}
