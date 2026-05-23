import { useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { formatBytes, cn, uid } from '../lib/utils'
import { Trash2, Check, X, AlertTriangle, Loader2 } from 'lucide-react'

export function ActionBar(): JSX.Element {
  const selectedFiles = useAppStore((s) => s.selectedFiles)
  const selectAllDuplicates = useAppStore((s) => s.selectAllDuplicates)
  const deselectAll = useAppStore((s) => s.deselectAll)
  const getSelectedSize = useAppStore((s) => s.getSelectedSize)
  const removeDeletedFiles = useAppStore((s) => s.removeDeletedFiles)
  const pushDeleteOp = useAppStore((s) => s.pushDeleteOp)

  const [showConfirm, setShowConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const selectedCount = selectedFiles.size
  const selectedSize = getSelectedSize()

  const handleDelete = useCallback(async () => {
    if (selectedCount === 0) return
    setDeleting(true)
    try {
      const paths = Array.from(selectedFiles)
      const result = await window.api.deleteFiles(paths)
      if (result.deletedCount > 0) {
        // Calculate which paths were successfully deleted
        const errorPaths = new Set(result.errors.map(e => e.path))
        const deletedPaths = paths.filter(p => !errorPaths.has(p))
        pushDeleteOp({
          undoId: result.undoId,
          paths: deletedPaths,
          deletedCount: result.deletedCount,
          timestamp: Date.now()
        })
        removeDeletedFiles(deletedPaths)
      }
      if (result.errors.length > 0) {
        console.warn('Some files failed to delete:', result.errors)
      }
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
      {/* Sticky bottom bar */}
      <div
        role="region"
        aria-label="Selection actions"
        className="card-glass shrink-0 px-6 py-3 flex items-center gap-4 animate-slide-up z-20 border-t"
      >
        {/* Selection info */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full gradient-accent" />
          <span className="text-sm text-text-primary font-medium">
            {selectedCount} file{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <span className="text-xs text-text-secondary">
            ({formatBytes(selectedSize)})
          </span>
        </div>

        <div className="flex-1" />

        {/* Action buttons */}
        <button
          onClick={selectAllDuplicates}
          aria-label="Select all duplicate files"
          className="btn btn-sm btn-ghost"
        >
          Select All Duplicates
        </button>

        <button
          onClick={deselectAll}
          aria-label="Deselect all files"
          className="btn btn-sm btn-ghost"
        >
          Deselect All
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          aria-label="Delete selected files"
          className="btn btn-primary flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete Selected
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowConfirm(false)}
          />

          {/* Modal */}
          <div className="relative card card-glass rounded-2xl p-6 w-full max-w-md mx-4 animate-scale-in shadow-elevated">
            {/* Icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-red/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-accent-red" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary">
                  Confirm Deletion
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Files will be moved to the recycle bin
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="card-glass rounded-lg p-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Files to delete</span>
                <span className="text-text-primary font-medium">{selectedCount}</span>
              </div>
              <div className="flex justify-between text-sm mt-1.5">
                <span className="text-text-secondary">Space freed</span>
                <span className="text-accent-cyan font-medium">
                  {formatBytes(selectedSize)}
                </span>
              </div>
            </div>

            {/* File list preview (up to 5) */}
            <div className="max-h-32 overflow-y-auto mb-5 text-xs space-y-1">
              {Array.from(selectedFiles)
                .slice(0, 5)
                .map((p) => (
                  <div
                    key={p}
                    className="text-text-muted truncate"
                    title={p}
                  >
                    {p}
                  </div>
                ))}
              {selectedCount > 5 && (
                <div className="text-text-muted">
                  ... and {selectedCount - 5} more
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                aria-label="Cancel deletion"
                className="btn btn-ghost"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleDelete}
                aria-label={`Confirm delete ${selectedCount} files`}
                disabled={deleting}
                className={cn('btn btn-primary', deleting ? 'opacity-60 cursor-not-allowed' : '')}
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
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
