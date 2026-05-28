import { useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { formatBytes, cn, uid } from '../lib/utils'
import { Trash2, Check, X, AlertTriangle, Loader2, ChevronDown } from 'lucide-react'

export function ActionBar(): JSX.Element {
  const selectedFiles      = useAppStore((s) => s.selectedFiles)
  const selectAllDuplicates = useAppStore((s) => s.selectAllDuplicates)
  const deselectAll        = useAppStore((s) => s.deselectAll)
  const getSelectedSize    = useAppStore((s) => s.getSelectedSize)
  const removeDeletedFiles = useAppStore((s) => s.removeDeletedFiles)
  const pushDeleteOp       = useAppStore((s) => s.pushDeleteOp)

  const [showConfirm, setShowConfirm] = useState(false)
  const [deleting, setDeleting]       = useState(false)

  const selectedCount = selectedFiles.size
  const selectedSize  = getSelectedSize()

  const handleDelete = useCallback(async () => {
    if (selectedCount === 0) return
    setDeleting(true)
    try {
      const paths  = Array.from(selectedFiles)
      const result = await window.api.deleteFiles(paths)
      if (result.deletedCount > 0) {
        const errorPaths  = new Set(result.errors.map((e: any) => e.path))
        const deletedPaths = paths.filter((p) => !errorPaths.has(p))
        pushDeleteOp({
          undoId: result.undoId,
          paths: deletedPaths,
          deletedCount: result.deletedCount,
          timestamp: Date.now()
        })
        removeDeletedFiles(deletedPaths)
      }
      if (result.errors.length > 0) console.warn('Some files failed to delete:', result.errors)
    } catch (err) {
      console.error('Delete failed:', err)
    } finally {
      setDeleting(false)
      setShowConfirm(false)
    }
  }, [selectedFiles, selectedCount, pushDeleteOp, removeDeletedFiles])

  if (selectedCount === 0) return <></>

  return (
    <>
      {/* ── Floating action bar ── */}
      <div
        role="region"
        aria-label="Selection actions"
        className={cn(
          'shrink-0 mx-5 mb-3 px-5 py-3 rounded-2xl flex items-center gap-4 animate-slide-up z-20',
          'bg-bg-elevated/80 backdrop-blur-2xl',
          'border border-white/[0.08]',
          'shadow-elevated'
        )}
        style={{
          borderTop: '1px solid rgba(0,212,255,0.15)',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05), 0 0 24px rgba(0,212,255,0.06)'
        }}
      >
        {/* Selection info */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#00d4ff)' }}>
            {selectedCount > 99 ? '99+' : selectedCount}
          </div>
          <div>
            <div className="text-sm font-semibold text-white/80">
              {selectedCount} file{selectedCount !== 1 ? 's' : ''} selected
            </div>
            <div className="text-[11px] text-white/35">{formatBytes(selectedSize)}</div>
          </div>
        </div>

        <div className="flex-1" />

        {/* Action buttons */}
        <button
          onClick={selectAllDuplicates}
          aria-label="Select all duplicate files"
          className="btn btn-sm btn-ghost"
        >
          Select All Dupes
        </button>

        <button
          onClick={deselectAll}
          aria-label="Deselect all files"
          className="btn btn-sm btn-ghost"
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          aria-label="Delete selected files"
          className="btn btn-danger"
        >
          <Trash2 className="w-4 h-4" />
          Delete {selectedCount} Files
        </button>
      </div>

      {/* ── Confirmation Modal ── */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => !deleting && setShowConfirm(false)}
          />

          {/* Modal */}
          <div className="relative card-premium rounded-3xl p-7 w-full max-w-md mx-4 animate-scale-in"
            style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)' }}>

            {/* Close */}
            {!deleting && (
              <button
                onClick={() => setShowConfirm(false)}
                className="absolute top-4 right-4 icon-btn"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-white/40" />
              </button>
            )}

            {/* Icon */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.22)' }}>
                <AlertTriangle className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white/90" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Confirm Deletion
                </h3>
                <p className="text-xs text-white/40 mt-0.5">Files will be moved to the recycle bin</p>
              </div>
            </div>

            {/* Details */}
            <div className="card-glass rounded-xl p-4 mb-5 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Files to delete</span>
                <span className="text-white/80 font-semibold">{selectedCount}</span>
              </div>
              <div className="h-px bg-white/[0.06]" />
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Space freed</span>
                <span className="text-cyan-400 font-semibold">{formatBytes(selectedSize)}</span>
              </div>
            </div>

            {/* File list preview */}
            <div className="max-h-28 overflow-y-auto mb-6 space-y-1 scrollbar-thin">
              {Array.from(selectedFiles).slice(0, 5).map((p) => (
                <div key={p} className="text-[11px] text-white/30 truncate font-mono px-1" title={p}>
                  {p}
                </div>
              ))}
              {selectedCount > 5 && (
                <div className="text-[11px] text-white/20 px-1">
                  <ChevronDown className="w-3 h-3 inline mr-1" />
                  …and {selectedCount - 5} more
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                aria-label="Cancel deletion"
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                aria-label={`Confirm delete ${selectedCount} files`}
                className="btn btn-danger min-w-[140px] justify-center"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting…
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Delete {selectedCount} Files
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
