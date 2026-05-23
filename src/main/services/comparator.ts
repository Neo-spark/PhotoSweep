/**
 * @fileoverview Comparator service — performs detailed comparison between two images.
 *
 * Three levels of comparison:
 * 1. **Exact match**: SHA-256 hashes are identical
 * 2. **Visual similarity**: Hamming distance on perceptual hashes
 * 3. **Pixel-level diff**: Uses pixelmatch to generate a visual diff image
 */

import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { extname } from 'node:path'
import sharp from 'sharp'
import { computeDhash } from '../workers/hash-worker'

import { PNG } from 'pngjs'
import { hammingDistance } from './grouper'
import type { ComparisonResult } from '../types'

/** Threshold below which two images are considered visually similar */
const VISUAL_SIMILARITY_THRESHOLD = 10
/** Standard size to which both images are resized for pixel comparison */
const COMPARE_SIZE = 256

/**
 * Compares two images using SHA-256, perceptual hashing, and pixel-level diff.
 *
 * @param pathA - Absolute path to the first image
 * @param pathB - Absolute path to the second image
 * @returns ComparisonResult with match type, similarity percentage, and optional diff image
 *
 * @example
 * ```ts
 * const result = await compareImages('/photos/a.jpg', '/photos/b.jpg')
 * if (result.type === 'exact') {
 *   console.log('These are identical files!')
 * }
 * ```
 */
export async function compareImages(pathA: string, pathB: string): Promise<ComparisonResult> {
  // Read both files
  const [bufferA, bufferB] = await Promise.all([
    readImageBuffer(pathA),
    readImageBuffer(pathB)
  ])

  // --- Step 1: SHA-256 exact match ---
  const sha256A = createHash('sha256').update(bufferA).digest('hex')
  const sha256B = createHash('sha256').update(bufferB).digest('hex')

  if (sha256A === sha256B) {
    return {
      type: 'exact',
      similarity: 100,
      hammingDistance: 0
    }
  }

  // --- Step 2: Perceptual hash comparison ---
  const [phashA, phashB] = await Promise.all([
    computeDhash(bufferA),
    computeDhash(bufferB)
  ])

  const distance = hammingDistance(phashA, phashB)
  const similarity = Math.round(((64 - distance) / 64) * 100)

  // --- Step 3: Pixel-level comparison ---
  let diffImageBase64: string | undefined

  try {
    diffImageBase64 = await generatePixelDiff(bufferA, bufferB)
  } catch (err) {
    console.warn('[Comparator] Pixel diff generation failed:', (err as Error).message)
  }

  const type = distance <= VISUAL_SIMILARITY_THRESHOLD ? 'visual' : 'different'

  return {
    type,
    similarity,
    hammingDistance: distance,
    diffImageBase64
  }
}

/**
 * Reads an image file, converting HEIC to JPEG if necessary.
 *
 * @param filePath - Absolute path to the image file
 * @returns Buffer containing image data in a format sharp can process
 */
async function readImageBuffer(filePath: string): Promise<Buffer> {
  const raw = await readFile(filePath)
  const ext = extname(filePath).toLowerCase()

  if (ext === '.heic') {
    const heicConvert = (await import('heic-convert')).default
    const result = await heicConvert({
      buffer: raw,
      format: 'JPEG',
      quality: 0.92
    })
    return Buffer.from(result)
  }

  return raw
}

/**
 * Generates a pixel-level diff image between two images using pixelmatch.
 * Both images are resized to the same dimensions before comparison.
 *
 * @param bufferA - First image buffer
 * @param bufferB - Second image buffer
 * @returns Base64-encoded PNG of the diff image
 */
async function generatePixelDiff(bufferA: Buffer, bufferB: Buffer): Promise<string> {
  // Resize both images to the same standard size and extract raw RGBA pixels
  const [rawA, rawB] = await Promise.all([
    sharp(bufferA)
      .resize(COMPARE_SIZE, COMPARE_SIZE, { fit: 'fill' })
      .ensureAlpha()
      .raw()
      .toBuffer(),
    sharp(bufferB)
      .resize(COMPARE_SIZE, COMPARE_SIZE, { fit: 'fill' })
      .ensureAlpha()
      .raw()
      .toBuffer()
  ])

  // Create output buffer for the diff
  const diffPixels = new Uint8Array(COMPARE_SIZE * COMPARE_SIZE * 4)

  // Run pixelmatch (dynamically imported as it's an ES module)
  const pixelmatch = (await import('pixelmatch')).default
  pixelmatch(
    new Uint8Array(rawA.buffer, rawA.byteOffset, rawA.byteLength),
    new Uint8Array(rawB.buffer, rawB.byteOffset, rawB.byteLength),
    diffPixels,
    COMPARE_SIZE,
    COMPARE_SIZE,
    { threshold: 0.1, alpha: 0.1, includeAA: true }
  )

  // Encode diff as PNG and convert to base64
  const diffPng = new PNG({ width: COMPARE_SIZE, height: COMPARE_SIZE })
  diffPng.data = Buffer.from(diffPixels)
  const pngBuffer = PNG.sync.write(diffPng)

  return `data:image/png;base64,${pngBuffer.toString('base64')}`
}
