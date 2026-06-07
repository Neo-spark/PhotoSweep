import { useCallback } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useAppStore } from '../store/useAppStore'
import { DuplicateCard } from './DuplicateCard'
import { FilterBar } from './FilterBar'
import { ScanStats } from './ScanStats'
import { formatBytes } from '../lib/utils'
import { Zap, Download, FolderOpen, Search, Settings } from 'lucide-react'

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
      <div className="flex flex-col items-center justify-center h-full px-8 relative">
        {/* Background Atmospheric Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-tertiary/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 relative z-10">
          {/* Icon Composition */}
          <div className="relative inline-block">
            <div className="w-32 h-32 glass-panel-elevated rounded-3xl flex items-center justify-center relative z-10 mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <FolderOpen className="text-primary w-16 h-16 drop-shadow-[0_0_15px_rgba(125,211,252,0.4)]" strokeWidth={1} />
              <div className="absolute -bottom-2 -right-2 w-14 h-14 glass-panel rounded-2xl flex items-center justify-center border border-primary/20 shadow-xl">
                <Search className="text-secondary w-7 h-7" strokeWidth={1.5} />
              </div>
            </div>
            {/* Decorative rings */}
            <div className="absolute inset-0 border border-primary/10 rounded-3xl -m-4 scale-110 opacity-20 animate-pulse"></div>
            <div className="absolute inset-0 border border-primary/5 rounded-full -m-12 scale-150 opacity-10"></div>
          </div>

          {/* Typography Content */}
          <div className="space-y-4">
            <h2 className="text-4xl font-headline font-bold tracking-tight text-on-surface">No duplicates found yet</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-md mx-auto">
              Run a scan to locate duplicate photos across your selected folders. The engine will find both <span className="text-primary-fixed">exact copies</span> and <span className="text-tertiary">visually similar</span> images.
            </p>
          </div>

          {/* Action Cluster */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => setView('scan')}
              className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold flex items-center space-x-3 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all group"
            >
              <Search className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
              <span>Select Folders</span>
            </button>
            <button 
              onClick={() => setView('settings')}
              className="px-8 py-4 glass-panel hover:bg-surface-variant/40 text-on-surface rounded-xl font-medium border border-primary/20 flex items-center space-x-3 active:scale-95 transition-all"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* System Stats Bar (Bottom Aesthetic Decoration) */}
        <div className="absolute bottom-10 left-8 right-8 flex justify-between items-center text-[10px] uppercase tracking-widest text-on-surface-variant/40 font-bold px-4">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Engine Ready</span>
            <span>Version 2.4.0-PRIME</span>
          </div>
          <div className="flex items-center space-x-6 hidden sm:flex">
            <span>Optimized for GPU Acceleration</span>
            <span>Deep Glacier Architecture</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full animate-fade-in relative z-10">

      {/* ── Stats ── */}
      <div className="shrink-0 px-5 pt-5 pb-3">
        <ScanStats />
      </div>

      {/* ── Header row ── */}
      <div className="shrink-0 px-5 pb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg font-bold text-on-surface font-headline">
            {filteredResults.length}
          </span>
          <span className="text-sm text-on-surface-variant">
            group{filteredResults.length !== 1 ? 's' : ''}
          </span>
          {stats.duplicateSize > 0 && (
            <div className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold ml-1">
              {formatBytes(stats.duplicateSize)} recoverable
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={selectAllDuplicates}
            aria-label="Auto-select duplicates"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-bright text-primary text-xs font-medium border border-primary/20 rounded-lg transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            Auto-select
          </button>
          <button
            onClick={handleExportCSV}
            aria-label="Export to CSV"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-on-surface text-xs font-medium border border-outline-variant rounded-lg transition-colors"
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
            <p className="text-sm text-on-surface-variant mb-4">No groups match your current filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setFilterType('all'); setFormatFilter([]) }}
              className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
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
