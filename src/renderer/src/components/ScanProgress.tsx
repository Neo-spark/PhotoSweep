import { useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { truncatePath } from '../lib/utils'
import { Loader2, X } from 'lucide-react'

export function ScanProgress(): JSX.Element {
  const progress = useAppStore((s) => s.progress)
  const setScanState = useAppStore((s) => s.setScanState)

  const { phase, current, total, currentFile, message } = progress
  const percent = total > 0 ? Math.round((current / total) * 100) : (current > 0 ? 100 : 0)

  // Circular progress geometry
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (percent / 100) * circumference

  const handleCancel = useCallback(async () => {
    try {
      await window.api.cancelScan()
      setScanState('cancelled')
    } catch (err) {
      console.error('Failed to cancel scan:', err)
    }
  }, [setScanState])

  const phaseLabels: Record<string, string> = {
    scanning: 'Scanning folders',
    hashing: 'Hashing files',
    grouping: 'Grouping duplicates',
    complete: 'Complete',
    error: 'Error',
    cancelled: 'Cancelled'
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 animate-fade-in">
      {/* Circular Progress */}
      <div className="relative mb-8 card-glass p-6 rounded-2xl">
        <svg
          width="180"
          height="180"
          className="circular-progress"
          viewBox="0 0 180 180"
        >
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <circle
            className="circular-progress-track"
            cx="90"
            cy="90"
            r={radius}
            strokeWidth="6"
          />
          <circle
            className="circular-progress-bar"
            cx="90"
            cy="90"
            r={radius}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold gradient-text">{percent}%</span>
          <span className="text-xs text-text-tertiary mt-1 capitalize">
            {phaseLabels[phase] || phase}
          </span>
        </div>
      </div>

      {/* Linear progress bar */}
      <div className="w-full max-w-md mb-8">
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full gradient-accent transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-md">
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary animate-count-up">
            {current.toLocaleString()}
          </div>
          <div className="text-xs text-text-tertiary mt-1">
            of {total > 0 ? total.toLocaleString() : '?'} processed
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-text-secondary mt-2">
            {message}
          </div>
        </div>
      </div>

      {/* Current file */}
      <div className="flex items-center gap-2 text-xs text-text-muted max-w-md w-full mb-8">
        <Loader2 className="w-3.5 h-3.5 text-accent-cyan animate-spin shrink-0" />
        <span className="truncate">{truncatePath(currentFile || '', 60)}</span>
      </div>

      {/* Cancel button */}
      <button
        onClick={handleCancel}
        aria-label="Cancel scan"
        className="btn btn-ghost"
      >
        <X className="w-4 h-4" />
        Cancel Scan
      </button>
    </div>
  )
}
