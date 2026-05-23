/** Maximum possible Hamming distance for a 64-bit pHash */
export const MAX_HAMMING_DISTANCE = 64

/**
 * Computes the Hamming distance between two hexadecimal hash strings.
 * The Hamming distance is the number of bit positions where the hashes differ.
 *
 * @param hashA - First hex hash string
 * @param hashB - Second hex hash string
 * @returns Number of differing bits (0 = identical)
 */
export function hammingDistance(hashA: string, hashB: string): number {
  if (!hashA || !hashB) return MAX_HAMMING_DISTANCE

  let distance = 0
  const len = Math.min(hashA.length, hashB.length)

  for (let i = 0; i < len; i++) {
    const a = parseInt(hashA[i], 16)
    const b = parseInt(hashB[i], 16)
    // XOR to find differing bits, then count them
    let xor = a ^ b
    while (xor > 0) {
      distance += xor & 1
      xor >>= 1
    }
  }

  return distance
}

export class BKNode {
  hash: string
  children: Map<number, BKNode>

  constructor(hash: string) {
    this.hash = hash
    this.children = new Map()
  }
}

/**
 * Burkhard-Keller Tree for fast nearest-neighbor searches in metric spaces.
 * Drastically improves perceptual hash matching from O(N^2) to near O(N log N).
 */
export class BKTree {
  root: BKNode | null = null

  /**
   * Adds a new hash to the tree.
   * @param hash - Hexadecimal hash string
   */
  add(hash: string): void {
    if (!this.root) {
      this.root = new BKNode(hash)
      return
    }

    let current = this.root
    while (true) {
      const distance = hammingDistance(current.hash, hash)
      if (distance === 0) return // Already exists (exactly identical)

      const child = current.children.get(distance)
      if (child) {
        current = child
      } else {
        current.children.set(distance, new BKNode(hash))
        return
      }
    }
  }

  /**
   * Searches for hashes within a given Hamming distance.
   * @param hash - Target hash to search around
   * @param threshold - Maximum allowed distance
   * @returns Array of hashes that match the criteria
   */
  search(hash: string, threshold: number): string[] {
    const results: string[] = []
    if (!this.root) return results

    const queue: BKNode[] = [this.root]

    while (queue.length > 0) {
      const current = queue.shift()!
      const distance = hammingDistance(current.hash, hash)

      if (distance <= threshold) {
        results.push(current.hash)
      }

      const minDistance = distance - threshold
      const maxDistance = distance + threshold

      for (const [childDist, childNode] of current.children) {
        if (childDist >= minDistance && childDist <= maxDistance) {
          queue.push(childNode)
        }
      }
    }

    return results
  }
}
