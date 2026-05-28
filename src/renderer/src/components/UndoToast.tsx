import { useEffect, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { formatBytes } from '../lib/utils'
import { RotateCcw, Trash2, X } from 'lucide-react'

export function UndoToast(): JSX.Element {
  const showUndoToast  = useAppStore((s) => s.showUndoToast)
  const lastDeleteOp   = useAppStore((s) => s.lastDeleteOp)
  const dismissUndoToast = useAppStore((s) => s.dismissUndoToast)
  const popDeleteOp    = useAppStore((s) => s.popDeleteOp)
  const removeDeletedFiles = useAppStore((s) => s.removeDeletedFiles)

  /* Auto-dismiss after 6s */
  useEffect(() => {
    if (!showUndoToast) return
    const t = setTimeout(() => dismissUndoToast(), 6000)
    return () => clearTimeout(t)
  }, [showUndoToast, dismissUndoToast])

  const handleUndo = useCallback(async () => {
    const op = popDeleteOp()
    if (!op) return
    try {
      await window.api.undoDelete(op.undoId)
    } catch (err) {
      console.error('Undo failed:', err)
    }
  }, [popDeleteOp])

  if (!showUndoToast || !lastDeleteOp) return <></>

  const count = lastDeleteOp.deletedCount

  return (
    <div
      className="fixed bottom-6 right-6 z-50 animate-toast-in"
      role="alert"
      aria-live="assertive"
    >
      <div
        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl min-w-[280px] max-w-xs"
        style={{
          background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.06))',
          border: '1px solid rgba(0,212,255,0.2)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 24px rgba(0,212,255,0.1)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)'
        }}
      >
        {/* Icon */}
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-500/15 border border-emerald-500/20">
          <Trash2 className="w-4 h-4 text-emerald-400" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white/80">
            {count} file{count !== 1 ? 's' : ''} deleted
          </div>
          <div className="text-[11px] text-white/35 mt-0.5">Moved to recycle bin</div>
        </div>

        {/* Undo button */}
        <button
          onClick={handleUndo}
          aria-label="Undo deletion"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/30 transition-all duration-200 flex-shrink-0"
        >
          <RotateCcw className="w-3 h-3" />
          Undo
        </button>

        {/* Dismiss */}
        <button
          onClick={dismissUndoToast}
          aria-label="Dismiss"
          className="w-5 h-5 rounded-md flex items-center justify-center text-white/25 hover:text-white/50 hover:bg-white/[0.06] transition-colors flex-shrink-0"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Auto-dismiss progress bar */}
      <div className="mt-1.5 h-0.5 rounded-full bg-white/[0.05] overflow-hidden mx-1">
        <div
          className="h-full rounded-full auto-dismiss-bar"
          style={{
            background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
            animationDuration: '6000ms'
          }}
        />
      </div>
    </div>
  )
}
