/**
 * @fileoverview Grouper service — groups hashed images into duplicate sets.
 *
 * Two grouping strategies:
 * 1. **Exact duplicates**: images sharing the same SHA-256 hash.
 * 2. **Similar images**: images whose perceptual hashes have a Hamming
 *    distance within a configurable threshold (default 5).
 *
 * Within each group, images are ranked by quality so the best version
 * is recommended for keeping.
 */

import { randomUUID } from 'node:crypto'
import { BKTree, hammingDistance, MAX_HAMMING_DISTANCE } from './bktree'
import type { HashedImage, DuplicateGroup, RankedImage } from '../types'

// Re-export hammingDistance for comparator.ts
export { hammingDistance }

/** Default Hamming distance threshold for "similar" grouping */
const DEFAULT_SIMILARITY_THRESHOLD = 5

/**
 * Groups hashed images into duplicate sets by exact SHA-256 match
 * and perceptual hash similarity.
 *
 * @param images - Array of successfully hashed images (entries with errors are skipped)
 * @param similarityThreshold - Maximum Hamming distance to consider two images similar (0–64).
 *   Lower = stricter matching. Default is 5.
 * @returns Array of DuplicateGroup objects sorted by space savings (largest first)
 *
 * @example
 * ```ts
 * const groups = groupDuplicates(hashedImages, 5)
 * console.log(`Found ${groups.length} duplicate groups`)
 * ```
 */
export function groupDuplicates(
  images: HashedImage[],
  similarityThreshold: number = DEFAULT_SIMILARITY_THRESHOLD
): DuplicateGroup[] {
  // Filter out errored images
  const validImages = images.filter((img) => !img.error && img.sha256)

  const groups: DuplicateGroup[] = []
  const assignedToExactGroup = new Set<string>()

  // --- Phase 1: Group exact duplicates by SHA-256 ---
  const sha256Map = new Map<string, HashedImage[]>()
  for (const img of validImages) {
    const existing = sha256Map.get(img.sha256)
    if (existing) {
      existing.push(img)
    } else {
      sha256Map.set(img.sha256, [img])
    }
  }

  for (const [, groupImages] of sha256Map) {
    if (groupImages.length < 2) continue

    // Mark all these file paths as assigned to an exact group
    for (const img of groupImages) {
      assignedToExactGroup.add(img.filePath)
    }

    const ranked = rankImages(groupImages)
    const spaceSavings = calculateSpaceSavings(ranked)

    groups.push({
      id: randomUUID(),
      type: 'exact',
      similarity: 100,
      spaceSavings,
      images: ranked
    })
  }

  // --- Phase 2: Group similar images by perceptual hash ---
  // Only consider images that have a valid pHash and aren't already in exact groups
  const candidates = validImages.filter(
    (img) => img.phash && !assignedToExactGroup.has(img.filePath)
  )

  const tree = new BKTree()
  for (const c of candidates) {
    tree.add(c.phash)
  }

  const assignedToSimilarGroup = new Set<string>()
  const similarGroups: HashedImage[][] = []

  for (let i = 0; i < candidates.length; i++) {
    const current = candidates[i]
    if (assignedToSimilarGroup.has(current.filePath)) continue

    const similarHashes = tree.search(current.phash, similarityThreshold)
    const similarSet = new Set(similarHashes)

    const group = candidates.filter(
      (c) => similarSet.has(c.phash) && !assignedToSimilarGroup.has(c.filePath)
    )

    if (group.length >= 2) {
      similarGroups.push(group)
      for (const g of group) {
        assignedToSimilarGroup.add(g.filePath)
      }
    }
  }

  for (const groupImages of similarGroups) {
    const ranked = rankImages(groupImages)

    // Calculate average similarity within the group
    const similarity = calculateGroupSimilarity(ranked)
    const spaceSavings = calculateSpaceSavings(ranked)

    groups.push({
      id: randomUUID(),
      type: 'similar',
      similarity,
      spaceSavings,
      images: ranked
    })
  }

  // Sort groups by space savings descending (biggest wins first)
  groups.sort((a, b) => b.spaceSavings - a.spaceSavings)

  return groups
}

/**
 * Ranks images within a group by quality. Best image is rank 1.
 *
 * Ranking criteria (in order of importance):
 * 1. Higher resolution (width × height) is better
 * 2. Larger file size is better (less compression = more detail)
 * 3. Older creation date is better (more likely the original)
 *
 * @param images - Array of images in a duplicate group
 * @returns Ranked array with the best image first
 */
function rankImages(images: HashedImage[]): RankedImage[] {
  if (images.length === 0) return []

  // Calculate max values for normalization
  let maxRes = 0, maxSize = 0, maxAge = 0, maxBlur = 0
  const now = Date.now()

  const intermediate = images.map((img) => {
    const resolution = img.width * img.height
    const age = now - (img.createdAt ? new Date(img.createdAt).getTime() : now)
    const blur = img.blurScore || 0

    if (resolution > maxRes) maxRes = resolution
    if (img.size > maxSize) maxSize = img.size
    if (age > maxAge) maxAge = age
    if (blur > maxBlur) maxBlur = blur

    return { ...img, resolution, age, blur }
  })

  // Calculate weighted score (higher is better)
  // Weights: Resolution (40%), File Size (30%), Age/Originality (20%), Sharpness (10%)
  const scored = intermediate.map((img) => {
    const resScore = maxRes ? (img.resolution / maxRes) * 40 : 0
    const sizeScore = maxSize ? (img.size / maxSize) * 30 : 0
    const ageScore = maxAge ? (img.age / maxAge) * 20 : 0
    const blurScore = maxBlur ? (img.blur / maxBlur) * 10 : 0

    const totalScore = resScore + sizeScore + ageScore + blurScore

    return {
      ...img,
      isOriginal: false,
      rank: 0,
      totalScore
    }
  })

  // Sort descending by score
  scored.sort((a, b) => b.totalScore - a.totalScore)

  // Assign ranks and mark the best as original
  for (let i = 0; i < scored.length; i++) {
    scored[i].rank = i + 1
    scored[i].isOriginal = i === 0
  }

  return scored
}



/**
 * Calculates the average similarity percentage for a group of images
 * based on pairwise Hamming distances of their perceptual hashes.
 *
 * @param images - Ranked images in the group
 * @returns Similarity percentage (0–100)
 */
function calculateGroupSimilarity(images: RankedImage[]): number {
  if (images.length < 2) return 100

  let totalDistance = 0
  let pairs = 0

  // Compare each image against the "original" (rank 1)
  const reference = images[0]
  for (let i = 1; i < images.length; i++) {
    totalDistance += hammingDistance(reference.phash, images[i].phash)
    pairs++
  }

  if (pairs === 0) return 100

  const avgDistance = totalDistance / pairs
  // Convert to percentage: 0 distance = 100% similar, 64 distance = 0% similar
  const similarity = Math.round(((MAX_HAMMING_DISTANCE - avgDistance) / MAX_HAMMING_DISTANCE) * 100)
  return Math.max(0, Math.min(100, similarity))
}

/**
 * Calculates space savings for a group — the total size of all duplicates
 * (everything except the best/original image).
 *
 * @param ranked - Ranked images where index 0 is the one to keep
 * @returns Total bytes that would be freed by deleting all but the original
 */
function calculateSpaceSavings(ranked: RankedImage[]): number {
  if (ranked.length < 2) return 0
  // Sum sizes of all images except the original (rank 1)
  return ranked.slice(1).reduce((sum, img) => sum + img.size, 0)
}
