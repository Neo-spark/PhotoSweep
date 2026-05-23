import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'node:path'
import { rm } from 'node:fs/promises'
import type { HashedImage } from '../types'

/** Database connection instance */
let db: Database.Database

/** Interface matching the `files` table schema */
export interface FileCacheRecord {
  path: string
  mtime: string
  size: number
  sha256: string
  phash: string
  width: number
  height: number
  format: string
  thumbnailPath: string
  createdAt: string
}

/**
 * Initializes the SQLite database inside the app's user data directory.
 * Sets up tables for file caching and thumbnail LRU tracking.
 */
export function initDB(): void {
  const dbPath = join(app.getPath('userData'), 'scan-cache.db')
  db = new Database(dbPath)

  // Use write-ahead logging for better performance
  db.pragma('journal_mode = WAL')

  // Create files table
  db.exec(`
    CREATE TABLE IF NOT EXISTS files (
      path TEXT PRIMARY KEY,
      mtime TEXT NOT NULL,
      size INTEGER NOT NULL,
      sha256 TEXT NOT NULL,
      phash TEXT NOT NULL,
      width INTEGER NOT NULL,
      height INTEGER NOT NULL,
      format TEXT NOT NULL,
      thumbnailPath TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `)

  // Create thumbnails tracking table for LRU cleanup
  db.exec(`
    CREATE TABLE IF NOT EXISTS thumbnails (
      hash TEXT PRIMARY KEY,
      lastAccessed INTEGER NOT NULL
    )
  `)
}

/**
 * Closes the database connection.
 */
export function closeDB(): void {
  if (db) {
    db.close()
  }
}

/**
 * Gets a cached file entry if the size and modification time match.
 *
 * @param filePath - Absolute path to the file
 * @param mtime - Current ISO string of the file's last modified time
 * @param size - Current size of the file in bytes
 * @returns The cached HashedImage data or null if cache miss/invalid
 */
export function getFileCache(filePath: string, mtime: string, size: number): HashedImage | null {
  if (!db) return null

  const stmt = db.prepare('SELECT * FROM files WHERE path = ?')
  const row = stmt.get(filePath) as FileCacheRecord | undefined

  if (row && row.mtime === mtime && row.size === size) {
    // Return structured HashedImage data
    return {
      filePath: row.path,
      fileName: filePath.split(/[\\/]/).pop() || '',
      sha256: row.sha256,
      phash: row.phash,
      width: row.width,
      height: row.height,
      format: row.format,
      size: row.size,
      thumbnailPath: row.thumbnailPath,
      createdAt: row.createdAt
    }
  }

  return null
}

/**
 * Saves or updates a hashed image result into the cache.
 *
 * @param img - The complete hashed image data
 * @param mtime - The current file's mtime ISO string
 */
export function saveFileCache(img: HashedImage, mtime: string): void {
  if (!db || img.error || !img.sha256) return

  const stmt = db.prepare(`
    INSERT INTO files (path, mtime, size, sha256, phash, width, height, format, thumbnailPath, createdAt)
    VALUES (@path, @mtime, @size, @sha256, @phash, @width, @height, @format, @thumbnailPath, @createdAt)
    ON CONFLICT(path) DO UPDATE SET
      mtime = excluded.mtime,
      size = excluded.size,
      sha256 = excluded.sha256,
      phash = excluded.phash,
      width = excluded.width,
      height = excluded.height,
      format = excluded.format,
      thumbnailPath = excluded.thumbnailPath,
      createdAt = excluded.createdAt
  `)

  stmt.run({
    path: img.filePath,
    mtime,
    size: img.size,
    sha256: img.sha256,
    phash: img.phash,
    width: img.width,
    height: img.height,
    format: img.format,
    thumbnailPath: img.thumbnailPath,
    createdAt: img.createdAt
  })

  // Update thumbnail access time
  updateThumbnailAccess(img.sha256)
}

/**
 * Marks a thumbnail as recently accessed.
 *
 * @param sha256 - The SHA-256 hash (used as thumbnail filename)
 */
export function updateThumbnailAccess(sha256: string): void {
  if (!db || !sha256) return

  const now = Date.now()
  const stmt = db.prepare(`
    INSERT INTO thumbnails (hash, lastAccessed)
    VALUES (?, ?)
    ON CONFLICT(hash) DO UPDATE SET lastAccessed = excluded.lastAccessed
  `)
  stmt.run(sha256, now)
}

/**
 * Cleans up old thumbnails that haven't been accessed in a specified duration.
 *
 * @param thumbnailDir - Directory where thumbnails are stored
 * @param maxAgeMs - Maximum age in milliseconds (default: 30 days)
 * @returns Number of thumbnails deleted
 */
export async function cleanupThumbnails(
  thumbnailDir: string,
  maxAgeMs: number = 30 * 24 * 60 * 60 * 1000
): Promise<number> {
  if (!db) return 0

  const cutoff = Date.now() - maxAgeMs
  const stmt = db.prepare('SELECT hash FROM thumbnails WHERE lastAccessed < ?')
  const rows = stmt.all(cutoff) as { hash: string }[]

  let deletedCount = 0
  const deleteStmt = db.prepare('DELETE FROM thumbnails WHERE hash = ?')

  for (const row of rows) {
    const thumbPath = join(thumbnailDir, `${row.hash}.webp`)
    try {
      await rm(thumbPath, { force: true })
      deleteStmt.run(row.hash)
      deletedCount++
    } catch (err) {
      console.warn(`[DB] Failed to delete old thumbnail ${thumbPath}:`, err)
    }
  }

  return deletedCount
}
