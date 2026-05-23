/**
 * @fileoverview Hash worker — runs inside a Piscina worker thread.
 * For each image file, computes SHA-256 hash, perceptual hash, extracts
 * metadata, and generates a WebP thumbnail.
 *
 * HEIC files are first converted to JPEG buffers via heic-convert.
 * All errors are caught per-file so the worker never crashes.
 */

import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { stat, mkdir } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import sharp from 'sharp'

import type { HashWorkerInput, HashedImage } from '../types'

/**
 * Main worker entry point invoked by Piscina for each task.
 * Receives file path and thumbnail directory, returns full hash result.
 *
 * @param input - The file path and thumbnail output directory
 * @returns HashedImage with all computed hashes, metadata, and thumbnail path
 */
export default async function hashFile(input: HashWorkerInput): Promise<HashedImage & { blurScore: number }> {
  const { filePath, thumbnailDir } = input
  const fileName = basename(filePath)

  try {
    // Get file stats for creation date and size
    const fileStat = await stat(filePath)
    const createdAt = (fileStat.birthtime ?? fileStat.mtime).toISOString()
    const fileSize = fileStat.size

    // Read the file via stream to compute SHA-256 and accumulate buffer in parallel
    const { rawBuffer, sha256 } = await new Promise<{ rawBuffer: Buffer; sha256: string }>((resolve, reject) => {
      const stream = createReadStream(filePath)
      const hash = createHash('sha256')
      const chunks: Buffer[] = []

      stream.on('data', (chunk: Buffer) => {
        hash.update(chunk)
        chunks.push(chunk)
      })

      stream.on('end', () => {
        resolve({
          rawBuffer: Buffer.concat(chunks),
          sha256: hash.digest('hex')
        })
      })

      stream.on('error', reject)
    })

    // --- Step 2: Get a sharp-compatible buffer (handle HEIC) ---
    let imageBuffer: Buffer = rawBuffer
    const ext = extname(filePath).toLowerCase()

    // Guard against empty files which cause sharp to throw "Input buffer is empty"
    if (!imageBuffer || imageBuffer.length === 0) {
      const errorMessage = 'Input buffer is empty'
      console.warn(`[HashWorker] Skipping empty file ${filePath}`)
      return {
        filePath,
        fileName,
        sha256: '',
        phash: '',
        width: 0,
        height: 0,
        format: 'unknown',
        size: 0,
        thumbnailPath: '',
        createdAt: '',
        error: errorMessage,
        blurScore: 0
      }
    }

    if (ext === '.heic') {
      imageBuffer = await convertHeic(rawBuffer)
    }

    // --- Step 3: Extract metadata via sharp ---
    const sharpInstance = sharp(imageBuffer, { failOn: 'none' })
    const metadata = await sharpInstance.metadata()
    const width = metadata.width ?? 0
    const height = metadata.height ?? 0
    const format = metadata.format ?? 'unknown'

    // --- Step 4: Compute perceptual hash (dHash) ---
    const perceptualHash = await computeDhash(imageBuffer)

    // --- Step 5: Generate 200px wide WebP thumbnail ---
    const thumbnailPath = await generateThumbnail(imageBuffer, sha256, thumbnailDir)

    return {
      filePath,
      fileName,
      sha256,
      phash: perceptualHash,
      width,
      height,
      format: String(format),
      size: fileSize,
      thumbnailPath,
      createdAt,
      blurScore: 0 // Simplification for now, as Laplacian variance in TS adds overhead
    }
  } catch (err) {
    // Return error info instead of crashing the worker
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.error(`[HashWorker] Error processing ${filePath}: ${errorMessage}`)

    return {
      filePath,
      fileName,
      sha256: '',
      phash: '',
      width: 0,
      height: 0,
      format: 'unknown',
      size: 0,
      thumbnailPath: '',
      createdAt: '',
      error: errorMessage,
      blurScore: 0
    }
  }
}

/**
 * Converts a HEIC buffer to JPEG using heic-convert.
 *
 * @param buffer - Raw HEIC file buffer
 * @returns JPEG buffer usable by sharp
 */
async function convertHeic(buffer: Buffer): Promise<Buffer> {
  // heic-convert is ESM-only, use dynamic import
  const heicConvert = (await import('heic-convert')).default
  const result = await heicConvert({
    buffer,
    format: 'JPEG',
    quality: 0.92
  })
  // heic-convert may return ArrayBuffer or Buffer depending on version
  return Buffer.from(result)
}

/**
 * Generates a 200px-wide WebP thumbnail and saves it to disk.
 *
 * @param imageBuffer - Source image buffer (already converted from HEIC if needed)
 * @param sha256 - SHA-256 hash used as the thumbnail filename
 * @param thumbnailDir - Directory to save the thumbnail into
 * @returns Absolute path to the saved thumbnail file
 */
async function generateThumbnail(
  imageBuffer: Buffer,
  sha256: string,
  thumbnailDir: string
): Promise<string> {
  // Ensure the thumbnail directory exists
  await mkdir(thumbnailDir, { recursive: true })

  const thumbFileName = `${sha256}.webp`
  const thumbPath = join(thumbnailDir, thumbFileName)

  await sharp(imageBuffer, { failOn: 'none' })
    .resize(200, undefined, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbPath)

  return thumbPath
}

/**
 * Computes a Difference Hash (dHash) using sharp.
 * Resizes to 9x8 grayscale, compares adjacent pixels.
 */
export async function computeDhash(imageBuffer: Buffer): Promise<string> {
  const { data } = await sharp(imageBuffer, { failOn: 'none' })
    .greyscale()
    .resize(9, 8, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true })

  let hash = ''
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const left = data[y * 9 + x]
      const right = data[y * 9 + x + 1]
      hash += left > right ? '1' : '0'
    }
  }

  let hexHash = ''
  for (let i = 0; i < hash.length; i += 4) {
    hexHash += parseInt(hash.substring(i, i + 4), 2).toString(16)
  }
  return hexHash
}
