/**
 * @fileoverview Exporter service — writes duplicate group data to CSV files.
 * Uses the csv-stringify library for proper CSV formatting and escaping.
 * Opens a native save dialog so the user can choose the output path.
 */

import { writeFile } from 'node:fs/promises'
import { basename } from 'node:path'
import { dialog } from 'electron'
import { stringify } from 'csv-stringify/sync'
import type { DuplicateGroup } from '../types'

/**
 * CSV column headers for the export.
 */
const CSV_COLUMNS = [
  'Group',
  'Type',
  'FileName',
  'Path',
  'Size (bytes)',
  'Resolution',
  'SHA256',
  'Similarity (%)',
  'Status'
]

/**
 * Exports duplicate groups to a CSV file. Opens a native save dialog for the user
 * to choose the output location.
 *
 * @param groups - Array of DuplicateGroup objects to export
 * @param parentWindow - Optional BrowserWindow to attach the dialog to
 * @returns The absolute path of the saved CSV file, or null if the user cancelled
 *
 * @example
 * ```ts
 * const savedPath = await exportToCSV(duplicateGroups, mainWindow)
 * if (savedPath) {
 *   console.log(`Report saved to ${savedPath}`)
 * }
 * ```
 */
export async function exportToCSV(
  groups: DuplicateGroup[],
  parentWindow?: Electron.BrowserWindow
): Promise<string | null> {
  // Show save dialog
  const result = await dialog.showSaveDialog(parentWindow ?? ({} as Electron.BrowserWindow), {
    title: 'Export Duplicate Report',
    defaultPath: `duplicate-report-${formatDateForFilename()}.csv`,
    filters: [
      { name: 'CSV Files', extensions: ['csv'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  })

  if (result.canceled || !result.filePath) {
    return null
  }

  // Build CSV rows
  const rows: string[][] = []

  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    const group = groups[groupIndex]
    const groupLabel = `Group ${groupIndex + 1}`

    for (const image of group.images) {
      rows.push([
        groupLabel,
        group.type,
        image.fileName,
        image.filePath,
        String(image.size),
        `${image.width}×${image.height}`,
        image.sha256,
        String(group.similarity),
        image.isOriginal ? 'Keep (Original)' : 'Duplicate'
      ])
    }
  }

  // Generate CSV string
  const csvContent = stringify(rows, {
    header: true,
    columns: CSV_COLUMNS,
    bom: true // Add BOM for Excel compatibility
  })

  // Write to disk
  await writeFile(result.filePath, csvContent, 'utf-8')

  return result.filePath
}

/**
 * Generates a date string suitable for filenames (no colons or spaces).
 *
 * @returns Formatted date string like "2024-03-15_143022"
 */
function formatDateForFilename(): string {
  const now = new Date()
  const date = now.toISOString().slice(0, 10) // 2024-03-15
  const time = now.toTimeString().slice(0, 8).replace(/:/g, '') // 143022
  return `${date}_${time}`
}
