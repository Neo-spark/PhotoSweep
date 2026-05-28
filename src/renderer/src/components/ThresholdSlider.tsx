import React from 'react'
import { useAppStore } from '../store/useAppStore'
import { Sliders } from 'lucide-react'

export const ThresholdSlider: React.FC = () => {
  const { similarityThreshold, setSimilarityThreshold } = useAppStore()

  const pct = (similarityThreshold / 20) * 100

  const modeLabel =
    similarityThreshold === 0  ? 'Exact duplicates only'         :
    similarityThreshold <= 4   ? 'High precision'                :
    similarityThreshold <= 9   ? 'Balanced (recommended)'        :
    similarityThreshold <= 14  ? 'Moderate — catches more'       :
    'Loose — may catch non-duplicates'

  const modeColor =
    similarityThreshold === 0  ? 'text-emerald-400' :
    similarityThreshold <= 4   ? 'text-cyan-400'    :
    similarityThreshold <= 9   ? 'text-violet-400'  :
    similarityThreshold <= 14  ? 'text-amber-400'   :
    'text-rose-400'

  return (
    <div className="card-glass rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-white/35" />
          <label className="text-sm font-semibold text-white/70">
            Similarity Threshold
          </label>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${modeColor} transition-colors duration-300`}>
            {modeLabel}
          </span>
          <span className="px-2.5 py-0.5 rounded-lg text-sm font-bold text-white/80 bg-white/[0.06] border border-white/[0.08] tabular-nums min-w-[32px] text-center"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {similarityThreshold}
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Track fill indicator */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 rounded-full bg-white/[0.04] pointer-events-none">
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #00d4ff, #7c3aed)'
            }}
          />
        </div>
        <input
          type="range"
          min="0" max="20" step="1"
          value={similarityThreshold}
          onChange={(e) => setSimilarityThreshold(parseInt(e.target.value, 10))}
          className="w-full relative z-10"
          aria-label="Similarity threshold"
          aria-valuetext={`${similarityThreshold} — ${modeLabel}`}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-[10px] text-white/20 mt-2 font-medium uppercase tracking-wide">
        <span>0 — Exact</span>
        <span>10</span>
        <span>20 — Loose</span>
      </div>
    </div>
  )
}
