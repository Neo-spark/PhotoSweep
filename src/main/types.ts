/**
 * @fileoverview Shared type definitions for Duplicate Photo Cleaner AI backend.
 * All interfaces used across main process services, workers, IPC, and preload.
 */

/** Supported image file extensions (lowercase) */
export const SUPPORTED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.heic',
  '.tiff',
  '.tif',
  '.bmp',
  '.gif'
])

/** Basic file info returned by the scanner */
export interface ScannedFile {
  /** Absolute file path */
  path: string
  /** File name with extension */
  name: string
  /** File size in bytes */
  size: number
  /** Last modification timestamp (ISO string) */
  modifiedAt: string
}

/** Input payload sent to each hash worker task */
export interface HashWorkerInput {
  /** Absolute path to the image file */
  filePath: string
  /** Directory where thumbnails should be saved */
  thumbnailDir: string
}

/** Result returned by each hash worker task */
export interface HashedImage {
  /** Absolute file path */
  filePath: string
  /** File name (basename) */
  fileName: string
  /** SHA-256 hex digest */
  sha256: string
  /** Perceptual hash (hex string from sharp-phash) */
  phash: string
  /** Image width in pixels */
  width: number
  /** Image height in pixels */
  height: number
  /** Image format (jpeg, png, webp, heif, etc.) */
  format: string
  /** File size in bytes */
  size: number
  /** Absolute path to the generated thumbnail file */
  thumbnailPath: string
  /** File creation timestamp (ISO string) */
  createdAt: string
  /** Error message if processing failed for this file */
  error?: string
  /** Blur score / sharpness estimation */
  blurScore?: number
}

/** A group of duplicate (or similar) images */
export interface DuplicateGroup {
  /** Unique group identifier */
  id: string
  /** Type of match within this group */
  type: 'exact' | 'similar'
  /** Visual similarity percentage (100 for exact, calculated for similar) */
  similarity: number
  /** Total space that could be saved by removing duplicates (bytes) */
  spaceSavings: number
  /** Images in this group, sorted by quality ranking (best first) */
  images: RankedImage[]
}

/** An image within a duplicate group, with ranking metadata */
export interface RankedImage extends HashedImage {
  /** Whether this image is the recommended "keep" candidate */
  isOriginal: boolean
  /** Total pixel count (width × height) */
  resolution: number
  /** Quality rank within the group (1 = best) */
  rank: number
}

/** Result of comparing two images */
export interface ComparisonResult {
  /** Type of match detected */
  type: 'exact' | 'visual' | 'different'
  /** Similarity percentage (0–100) */
  similarity: number
  /** Hamming distance between perceptual hashes */
  hammingDistance: number
  /** Base64-encoded diff image (PNG) when visual comparison is available */
  diffImageBase64?: string
}

/** Progress update emitted during scanning */
export interface ScanProgress {
  /** Current phase of the scan */
  phase: 'scanning' | 'hashing' | 'grouping' | 'complete' | 'error' | 'cancelled'
  /** Number of items processed so far */
  current: number
  /** Total number of items (0 if unknown yet) */
  total: number
  /** Currently processing file path */
  currentFile?: string
  /** Human-readable status message */
  message: string
}

/** Full scan results sent to renderer */
export interface ScanResults {
  /** All duplicate groups found */
  groups: DuplicateGroup[]
  /** Total number of files scanned */
  totalFilesScanned: number
  /** Total number of duplicate files found */
  totalDuplicates: number
  /** Total space that can be recovered (bytes) */
  totalSpaceSavings: number
  /** Time taken for the scan in milliseconds */
  scanDurationMs: number
  /** List of files that failed to process */
  failedFiles: Array<{ filePath: string; error: string }>
}

/** Entry in the undo stack for deleted files */
export interface UndoEntry {
  /** Unique identifier for this undo operation */
  id: string
  /** Timestamp of the delete action (ISO string) */
  deletedAt: string
  /** Files that were deleted, with their original paths */
  files: Array<{
    originalPath: string
    fileName: string
    size: number
  }>
}

/** IPC channel names used between main and renderer */
export const IPC_CHANNELS = {
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
