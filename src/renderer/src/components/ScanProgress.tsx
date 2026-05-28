import { useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { truncatePath } from '../lib/utils'
import { Loader2, X, CheckCircle2, Hash, GitMerge } from 'lucide-react'

const PHASES = [
  { key: 'scanning', label: 'Scanning',  icon: Loader2      },
  { key: 'hashing',  label: 'Hashing',   icon: Hash         },
  { key: 'grouping', label: 'Grouping',  icon: GitMerge     }
] as const

export function ScanProgress(): JSX.Element {
  const progress    = useAppStore((s) => s.progress)
  const setScanState = useAppStore((s) => s.setScanState)

  const { phase, current, total, currentFile, message } = progress
  const percent = total > 0 ? Math.round((current / total) * 100) : (current > 0 ? 100 : 0)

  const radius      = 88
  const stroke      = 7
  const circumference = 2 * Math.PI * radius
  const dashOffset  = circumference - (percent / 100) * circumference

  const currentPhaseIdx = PHASES.findIndex((p) => p.key === phase)

  const handleCancel = useCallback(async () => {
    try {
      await window.api.cancelScan()
      setScanState('cancelled')
    } catch (err) {
      console.error('Failed to cancel scan:', err)
    }
  }, [setScanState])

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-10 animate-fade-in">

      {/* ── Phase Stepper ── */}
      <div className="flex items-center gap-0 mb-10 animate-slide-up">
        {PHASES.map((p, i) => {
          const done    = i < currentPhaseIdx
          const active  = i === currentPhaseIdx
          const Icon    = p.icon
          return (
            <div key={p.key} className="flex items-center">
              {/* Step */}
              <div className="flex flex-col items-center gap-1.5">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500
                  ${done   ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : ''}
                  ${active ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 shadow-[0_0_16px_rgba(0,212,255,0.3)]' : ''}
                  ${!done && !active ? 'bg-white/[0.03] border-white/[0.08] text-white/20' : ''}
                `}>
                  {done
                    ? <CheckCircle2 className="w-4 h-4" />
                    : <Icon className={`w-4 h-4 ${active ? 'animate-spin' : ''}`} />}
                </div>
                <span className={`text-[10px] font-medium uppercase tracking-wider ${
                  active ? 'text-cyan-400' : done ? 'text-emerald-400/70' : 'text-white/20'
                }`}>{p.label}</span>
              </div>

              {/* Connector */}
              {i < PHASES.length - 1 && (
                <div className={`w-16 h-px mx-2 mb-5 transition-all duration-500 ${
                  i < currentPhaseIdx ? 'bg-emerald-500/40' : 'bg-white/[0.07]'
                }`} />
              )}
            </div>
          )
        })}
      </div>

      {/* ── Circular Progress Ring ── */}
      <div className="relative mb-8 animate-slide-up" style={{ animationDelay: '0.08s' }}>
        {/* Glow halo */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, rgba(124,58,237,0.2) 50%, transparent 80%)' }}
        />

        <div className="relative card-glass rounded-full p-5">
          <svg width="210" height="210" viewBox="0 0 210 210" className="circular-progress">
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#00d4ff" />
                <stop offset="50%"  stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Track */}
            <circle className="circular-progress-track" cx="105" cy="105" r={radius} strokeWidth={stroke} />

            {/* Progress bar */}
            <circle
              className="circular-progress-bar"
              cx="105" cy="105" r={radius}
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              filter="url(#glow)"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              {percent}
            </span>
            <span className="text-lg text-white/40 font-light">%</span>
            <span className="text-[11px] text-white/30 uppercase tracking-widest mt-1">
              {phase}
            </span>
          </div>
        </div>
      </div>

      {/* ── Linear progress bar ── */}
      <div className="w-full max-w-sm mb-6 animate-slide-up" style={{ animationDelay: '0.12s' }}>
        <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-600 ease-out"
            style={{
              width: `${percent}%`,
              background: 'linear-gradient(90deg, #7c3aed, #00d4ff)',
              boxShadow: '0 0 8px rgba(0,212,255,0.6)'
            }}
          />
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 gap-4 mb-6 w-full max-w-sm animate-slide-up" style={{ animationDelay: '0.16s' }}>
        <div className="card-glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-white tabular-nums" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {current.toLocaleString()}
          </div>
          <div className="text-[11px] text-white/35 mt-1">
            of {total > 0 ? total.toLocaleString() : '…'} files
          </div>
        </div>
        <div className="card-glass rounded-xl p-4 text-center">
          <div className="text-sm font-medium text-cyan-400 mt-1 leading-snug">
            {message || 'Processing…'}
          </div>
        </div>
      </div>

      {/* ── Current file ── */}
      <div className="flex items-center gap-2 text-[11px] text-white/25 max-w-sm w-full mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <Loader2 className="w-3 h-3 text-cyan-400/60 animate-spin flex-shrink-0" />
        <span className="truncate font-mono">{truncatePath(currentFile || '', 55) || 'Waiting…'}</span>
      </div>

      {/* ── Cancel ── */}
      <button
        onClick={handleCancel}
        aria-label="Cancel scan"
        className="btn btn-ghost text-red-400/70 hover:text-red-400 hover:border-red-500/20 animate-slide-up"
        style={{ animationDelay: '0.24s' }}
      >
        <X className="w-4 h-4" />
        Cancel Scan
      </button>
    </div>
  )
}
