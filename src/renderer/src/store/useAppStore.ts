import { create } from 'zustand'
import type {
  AppView,
  ScanState,
  ScanProgress,
  ScanResults,
  DuplicateGroup,
  ScanStats,
  FilterType,
  SortBy,
  DeleteOperation
} from '../lib/types'

/* ═══════════════════════════════════════════════════
   Store Shape
   ═══════════════════════════════════════════════════ */

interface AppState {
  /* Navigation */
  view: AppView

  /* Folder selection */
  folders: string[]

  /* Scan */
  scanState: ScanState
  progress: ScanProgress
  similarityThreshold: number

  /* Results */
  results: DuplicateGroup[]
  failedFiles: Array<{ filePath: string; error: string }>
  stats: ScanStats

  /* Filtering & search */
  searchQuery: string
  filterType: FilterType
  sortBy: SortBy
  formatFilter: string[]

  /* Selection */
  selectedFiles: Set<string>

  /* Undo */
  undoStack: DeleteOperation[]
  showUndoToast: boolean
  lastDeleteOp: DeleteOperation | null

  /* Compare */
  comparePaths: [string, string] | null

  /* Settings */
  autoSelectLowerQuality: boolean

  /* ── Actions ── */
  setView: (view: AppView) => void

  addFolders: (paths: string[]) => void
  removeFolder: (path: string) => void
  clearFolders: () => void

  setScanState: (state: ScanState) => void
  setProgress: (progress: ScanProgress) => void
  setSimilarityThreshold: (val: number) => void

  setResults: (payload: ScanResults) => void
  clearResults: () => void

  setSearchQuery: (q: string) => void
  setFilterType: (f: FilterType) => void
  setSortBy: (s: SortBy) => void
  setFormatFilter: (formats: string[]) => void

  toggleFileSelection: (path: string) => void
  selectFiles: (paths: string[]) => void
  deselectFiles: (paths: string[]) => void
  selectAllDuplicates: () => void
  deselectAll: () => void

  pushDeleteOp: (op: DeleteOperation) => void
  popDeleteOp: () => DeleteOperation | null
  dismissUndoToast: () => void

  removeDeletedFiles: (paths: string[]) => void

  setComparePaths: (paths: [string, string] | null) => void

  setAutoSelectLowerQuality: (val: boolean) => void

  /* Computed */
  getFilteredResults: () => DuplicateGroup[]
  getSelectedSize: () => number
}

/* ═══════════════════════════════════════════════════
   Defaults
   ═══════════════════════════════════════════════════ */

const defaultProgress: ScanProgress = {
  phase: 'scanning',
  current: 0,
  total: 0,
  currentFile: '',
  message: ''
}

const defaultStats: ScanStats = {
  totalImages: 0,
  totalFilesScanned: 0,
  duplicateGroups: 0,
  exactDuplicates: 0,
  similarImages: 0,
  totalSize: 0,
  duplicateSize: 0,
  scanDurationMs: 0
}

/* ═══════════════════════════════════════════════════
   Store
   ═══════════════════════════════════════════════════ */

export const useAppStore = create<AppState>((set, get) => ({
  view: 'scan',
  folders: [],
  scanState: 'idle',
  progress: defaultProgress,
  similarityThreshold: 5,
  results: [],
  failedFiles: [],
  stats: defaultStats,
  searchQuery: '',
  filterType: 'all',
  sortBy: 'similarity',
  formatFilter: [],
  selectedFiles: new Set(),
  undoStack: [],
  showUndoToast: false,
  lastDeleteOp: null,
  comparePaths: null,
  autoSelectLowerQuality: true,

  /* Navigation */
  setView: (view) => set({ view }),

  /* Folders */
  addFolders: (paths) =>
    set((s) => {
      const existing = new Set(s.folders)
      const newFolders = paths.filter((p) => !existing.has(p))
      return { folders: [...s.folders, ...newFolders] }
    }),

  removeFolder: (path) =>
    set((s) => ({ folders: s.folders.filter((f) => f !== path) })),

  clearFolders: () => set({ folders: [] }),

  /* Scan */
  setScanState: (scanState) => set({ scanState }),

  setProgress: (progress) => set({ progress }),

  setSimilarityThreshold: (similarityThreshold) => set({ similarityThreshold }),

  /* Results — takes full ScanResults from backend */
  setResults: (scanResults) => {
    const { groups, failedFiles = [], totalFilesScanned, scanDurationMs } = scanResults
    const exactDuplicates = groups.filter((g) => g.type === 'exact').length
    const similarImages = groups.filter((g) => g.type === 'similar').length
    const totalImages = groups.reduce((acc, g) => acc + g.images.length, 0)
    const totalSize = groups.reduce(
      (acc, g) => acc + g.images.reduce((a, img) => a + img.size, 0),
      0
    )
    const duplicateSize = groups.reduce((acc, g) => acc + g.spaceSavings, 0)

    set({
      results: groups,
      failedFiles,
      stats: {
        totalImages,
        totalFilesScanned: totalFilesScanned || totalImages,
        duplicateGroups: groups.length,
        exactDuplicates,
        similarImages,
        totalSize,
        duplicateSize,
        scanDurationMs: scanDurationMs || 0
      }
    })
  },

  clearResults: () =>
    set({
      results: [],
      failedFiles: [],
      stats: defaultStats,
      selectedFiles: new Set(),
      searchQuery: '',
      filterType: 'all',
      sortBy: 'similarity'
    }),

  /* Filtering */
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilterType: (filterType) => set({ filterType }),
  setSortBy: (sortBy) => set({ sortBy }),
  setFormatFilter: (formatFilter) => set({ formatFilter }),

  /* Selection */
  toggleFileSelection: (path) =>
    set((s) => {
      const next = new Set(s.selectedFiles)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return { selectedFiles: next }
    }),

  selectFiles: (paths) =>
    set((s) => {
      const next = new Set(s.selectedFiles)
      paths.forEach((p) => next.add(p))
      return { selectedFiles: next }
    }),

  deselectFiles: (paths) =>
    set((s) => {
      const next = new Set(s.selectedFiles)
      paths.forEach((p) => next.delete(p))
      return { selectedFiles: next }
    }),

  selectAllDuplicates: () => {
    const { results } = get()
    const paths: string[] = []
    results.forEach((group) => {
      group.images.forEach((img) => {
        // Select non-original images (the backend marks best with isOriginal=true)
        if (!img.isOriginal) {
          paths.push(img.filePath)
        }
      })
    })
    set({ selectedFiles: new Set(paths) })
  },

  deselectAll: () => set({ selectedFiles: new Set() }),

  /* Undo — now uses undoId from backend */
  pushDeleteOp: (op) =>
    set((s) => ({
      undoStack: [...s.undoStack, op],
      lastDeleteOp: op,
      showUndoToast: true
    })),

  popDeleteOp: () => {
    const { undoStack } = get()
    if (undoStack.length === 0) return null
    const last = undoStack[undoStack.length - 1]
    set({ undoStack: undoStack.slice(0, -1), showUndoToast: false, lastDeleteOp: null })
    return last
  },

  dismissUndoToast: () => set({ showUndoToast: false }),

  /* Post-delete cleanup */
  removeDeletedFiles: (paths) => {
    const pathSet = new Set(paths)
    set((s) => {
      const newResults = s.results
        .map((group) => ({
          ...group,
          images: group.images.filter((img) => !pathSet.has(img.filePath))
        }))
        .filter((group) => group.images.length > 1)

      const newSelected = new Set(s.selectedFiles)
      paths.forEach((p) => newSelected.delete(p))

      return { results: newResults, selectedFiles: newSelected }
    })

    // Re-compute stats
    const { results, stats } = get()
    const exactDuplicates = results.filter((g) => g.type === 'exact').length
    const similarImages = results.filter((g) => g.type === 'similar').length
    const totalImages = results.reduce((acc, g) => acc + g.images.length, 0)
    const totalSize = results.reduce(
      (acc, g) => acc + g.images.reduce((a, img) => a + img.size, 0),
      0
    )
    const duplicateSize = results.reduce((acc, g) => acc + g.spaceSavings, 0)

    set({
      stats: {
        ...stats,
        totalImages,
        duplicateGroups: results.length,
        exactDuplicates,
        similarImages,
        totalSize,
        duplicateSize
      }
    })
  },

  /* Compare */
  setComparePaths: (comparePaths) => set({ comparePaths }),

  /* Settings */
  setAutoSelectLowerQuality: (autoSelectLowerQuality) => set({ autoSelectLowerQuality }),

  /* Computed helpers */
  getFilteredResults: () => {
    const { results, searchQuery, filterType, sortBy, formatFilter } = get()
    let filtered = [...results]

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter((g) => g.type === filterType)
    }

    // Format filter
    if (formatFilter.length > 0) {
      filtered = filtered.filter((g) =>
        g.images.some((img) => formatFilter.includes(img.format.toLowerCase()))
      )
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter((g) =>
        g.images.some(
          (img) =>
            img.fileName.toLowerCase().includes(q) || img.filePath.toLowerCase().includes(q)
        )
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'similarity':
          return b.similarity - a.similarity
        case 'size':
          return b.spaceSavings - a.spaceSavings
        case 'date':
          return (
            new Date(b.images[0]?.createdAt || 0).getTime() -
            new Date(a.images[0]?.createdAt || 0).getTime()
          )
        default:
          return 0
      }
    })

    return filtered
  },

  getSelectedSize: () => {
    const { results, selectedFiles } = get()
    let total = 0
    results.forEach((g) =>
      g.images.forEach((img) => {
        if (selectedFiles.has(img.filePath)) total += img.size
      })
    )
    return total
  }
}))
