import { useCallback } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useAppStore } from '../store/useAppStore'
import { DuplicateCard } from './DuplicateCard'
import { FilterBar } from './FilterBar'
import { ScanStats } from './ScanStats'
import { formatBytes } from '../lib/utils'
import { Zap, Download, FolderSearch, Sparkles } from 'lucide-react'

export function DuplicateGroups(): JSX.Element {
  const results            = useAppStore((s) => s.results)
  const stats              = useAppStore((s) => s.stats)
  const selectAllDuplicates = useAppStore((s) => s.selectAllDuplicates)
  const getFilteredResults = useAppStore((s) => s.getFilteredResults)
  const setView            = useAppStore((s) => s.setView)
  const setSearchQuery     = useAppStore((s) => s.setSearchQuery)
  const setFilterType      = useAppStore((s) => s.setFilterType)
  const setFormatFilter    = useAppStore((s) => s.setFormatFilter)

  const filteredResults = getFilteredResults()

  const handleExportCSV = useCallback(async () => {
    try { await window.api.exportCSV(results) }
    catch (err) { console.error('Export failed:', err) }
  }, [results])

  /* ── Empty State ── */
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 animate-fade-in" role="region" aria-label="No results">
        <div className="relative mb-6">
          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl blur-2xl bg-violet-500/10 scale-150 pointer-events-none" />
          <div className="relative w-24 h-24 rounded-2xl bg-white/[0.035] border border-white/[0.07] flex items-center justify-center">
            <FolderSearch className="w-12 h-12 text-white/20" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white/80 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          No duplicates found yet
        </h3>
        <p className="text-sm text-white/35 text-center max-w-sm mb-8 leading-relaxed">
          Run a scan to locate duplicate photos across your selected folders.
          The AI engine will find both exact copies and visually similar images.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setView('scan')}
            className="btn btn-primary"
            aria-label="Go to Scan tab"
          >
            <Sparkles className="w-4 h-4" />
            Select Folders
          </button>
          <button
            onClick={() => setView('settings')}
            className="btn btn-ghost"
            aria-label="Open settings"
          >
            Settings
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">

      {/* ── Stats ── */}
      <div className="shrink-0 px-5 pt-5 pb-3">
        <ScanStats />
      </div>

      {/* ── Header row ── */}
      <div className="shrink-0 px-5 pb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg font-bold text-white/80" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {filteredResults.length}
          </span>
          <span className="text-sm text-white/35">
            group{filteredResults.length !== 1 ? 's' : ''}
          </span>
          {stats.duplicateSize > 0 && (
            <div className="badge badge-cyan ml-1">
              {formatBytes(stats.duplicateSize)} recoverable
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={selectAllDuplicates}
            aria-label="Auto-select duplicates"
            className="btn btn-sm btn-ghost"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Auto-select
          </button>
          <button
            onClick={handleExportCSV}
            aria-label="Export to CSV"
            className="btn btn-sm btn-ghost"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="shrink-0 px-5 pb-4">
        <FilterBar />
      </div>

      {/* ── Results list ── */}
      <div className="flex-1 px-5 pb-4 min-h-0">
        {filteredResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full" role="status" aria-live="polite">
            <p className="text-sm text-white/30 mb-4">No groups match your current filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setFilterType('all'); setFormatFilter([]) }}
              className="btn btn-sm btn-ghost"
              aria-label="Clear filters"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <Virtuoso
            data={filteredResults}
            overscan={300}
            itemContent={(index, group) => (
              <div className="pb-3" key={group.id}>
                <DuplicateCard group={group} index={index} />
              </div>
            )}
            style={{ height: '100%' }}
          />
        )}
      </div>
    </div>
  )
}
