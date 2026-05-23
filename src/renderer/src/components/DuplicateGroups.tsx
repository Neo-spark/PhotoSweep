import { useCallback } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useAppStore } from '../store/useAppStore'
import { DuplicateCard } from './DuplicateCard'
import { FilterBar } from './FilterBar'
import { ScanStats } from './ScanStats'
import { formatBytes } from '../lib/utils'
import { Zap, FileImage } from 'lucide-react'

export function DuplicateGroups(): JSX.Element {
  const results = useAppStore((s) => s.results)
  const stats = useAppStore((s) => s.stats)
  const selectAllDuplicates = useAppStore((s) => s.selectAllDuplicates)
  const getFilteredResults = useAppStore((s) => s.getFilteredResults)
  const setView = useAppStore((s) => s.setView)
  const setSearchQuery = useAppStore((s) => s.setSearchQuery)
  const setFilterType = useAppStore((s) => s.setFilterType)
  const setFormatFilter = useAppStore((s) => s.setFormatFilter)

  const filteredResults = getFilteredResults()

  const handleExportCSV = useCallback(async () => {
    try {
      await window.api.exportCSV(results)
    } catch (err) {
      console.error('Export failed:', err)
    }
  }, [results])

  // Empty state
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 animate-fade-in" role="region" aria-label="No results">
        <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
          <FileImage className="w-10 h-10 text-text-muted" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          No duplicates yet
        </h3>
        <p className="text-sm text-text-secondary text-center max-w-sm mb-4">
          Run a scan to locate duplicate photos. Select folders from the Scan tab to get started.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setView('scan')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium"
            aria-label="Go to Scan tab"
          >
            Select Folders
          </button>
          <button
            onClick={() => setView('settings')}
            className="px-4 py-2 rounded-lg bg-white/5 text-text-secondary border border-border-subtle"
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
      {/* Stats */}
      <div className="shrink-0 px-6 pt-5 pb-3">
        <ScanStats />
      </div>

      {/* Summary header + actions */}
      <div className="shrink-0 px-6 pb-3 flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          <span className="text-text-primary font-semibold">{filteredResults.length}</span>{' '}
          group{filteredResults.length !== 1 ? 's' : ''} found
          {stats.duplicateSize > 0 && (
            <>
              {' · '}
              <span className="text-accent-cyan font-semibold">
                {formatBytes(stats.duplicateSize)}
              </span>{' '}
              can be freed
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={selectAllDuplicates}
            aria-label="Auto-select duplicates"
            className="btn btn-sm btn-ghost flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            Auto-select duplicates
          </button>
          <button
            onClick={handleExportCSV}
            aria-label="Export results to CSV"
            className="btn btn-sm btn-ghost"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="shrink-0 px-6 pb-3">
        <FilterBar />
      </div>

      {/* Virtual scrolled list */}
      <div className="flex-1 px-6 pb-4">
        {filteredResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full" role="status" aria-live="polite">
            <p className="text-sm text-text-muted mb-3">No groups match your current filters.</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilterType('all')
                  setFormatFilter([])
                }}
                className="btn btn-sm btn-ghost"
                aria-label="Clear filters"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setView('scan')}
                className="btn btn-sm"
                aria-label="Go to scan tab"
              >
                Select Folders
              </button>
            </div>
          </div>
        ) : (
          <Virtuoso
            data={filteredResults}
            overscan={200}
            itemContent={(index, group) => (
              <div className="pb-4" key={group.id}>
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
