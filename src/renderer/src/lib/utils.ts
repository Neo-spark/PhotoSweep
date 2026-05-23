/**
 * Format a byte count into a human-readable string.
 * e.g. 1536 → "1.50 KB"
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(i === 0 ? 0 : 2)} ${units[i]}`
}

/**
 * Format milliseconds into a human-readable duration.
 * e.g. 154000 → "2m 34s"
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  const totalSec = Math.floor(ms / 1000)
  const hours = Math.floor(totalSec / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  const seconds = totalSec % 60
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`
  if (minutes > 0) return `${minutes}m ${seconds}s`
  return `${seconds}s`
}

/**
 * Format a date string or Date into a readable format.
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Truncate a file path to maxLen chars, keeping the filename visible.
 * e.g. "C:\Users\...\photos\vacation\img001.jpg"
 */
export function truncatePath(path: string, maxLen: number = 50): string {
  if (path.length <= maxLen) return path
  const sep = path.includes('\\') ? '\\' : '/'
  const parts = path.split(sep)
  const filename = parts[parts.length - 1]

  if (filename.length >= maxLen - 4) {
    return '...' + filename.slice(-(maxLen - 3))
  }

  const prefix = parts.slice(0, 2).join(sep)
  const remaining = maxLen - prefix.length - filename.length - 5 // 5 = sep + "..." + sep
  if (remaining <= 0) {
    return prefix + sep + '...' + sep + filename
  }

  return prefix + sep + '...' + sep + filename
}

/**
 * Generate a simple unique ID.
 */
export function uid(): string {
  return Math.random().toString(36).slice(2, 11) + Date.now().toString(36)
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Get file extension from path (lowercased, without dot).
 */
export function getExtension(path: string): string {
  const dot = path.lastIndexOf('.')
  if (dot === -1) return ''
  return path.slice(dot + 1).toLowerCase()
}

/**
 * Classnames helper — filters falsy values and joins.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
