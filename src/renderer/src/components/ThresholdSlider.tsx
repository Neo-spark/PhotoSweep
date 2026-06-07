import React from 'react'
import { useAppStore } from '../store/useAppStore'
import { SlidersHorizontal } from 'lucide-react'
import { cn } from '../lib/utils'

export const ThresholdSlider: React.FC = () => {
  const { similarityThreshold, setSimilarityThreshold } = useAppStore()

  const getModeDetails = (val: number) => {
    if (val === 0) return { label: 'Exact duplicates only', colorClass: 'bg-primary/10 text-primary' }
    if (val <= 4)  return { label: 'High precision', colorClass: 'bg-primary/10 text-primary' }
    if (val <= 9)  return { label: 'Balanced (recommended)', colorClass: 'bg-primary/10 text-primary' }
    if (val <= 14) return { label: 'Moderate — catches more', colorClass: 'bg-secondary/10 text-secondary' }
    return { label: 'Loose — may catch non-duplicates', colorClass: 'bg-error/10 text-error' }
  }

  const { label, colorClass } = getModeDetails(similarityThreshold)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-primary w-5 h-5" strokeWidth={2.5} />
          <span className="font-medium text-on-surface">Similarity Threshold</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-xs px-2 py-1 rounded-full font-bold", colorClass)}>
            {label}
          </span>
          <span className="px-2 py-1 rounded-md text-sm font-bold text-on-surface bg-surface-container border border-outline-variant tabular-nums min-w-[32px] text-center"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {similarityThreshold}
          </span>
        </div>
      </div>
      <div className="px-2">
        <input 
          className="w-full appearance-none bg-transparent custom-slider" 
          max="20" 
          min="0" 
          type="range" 
          value={similarityThreshold}
          onChange={(e) => setSimilarityThreshold(parseInt(e.target.value, 10))}
          aria-label="Similarity threshold"
        />
        <div className="flex justify-between mt-3 text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
          <span>0 — Exact</span>
          <span className="ml-auto">20 — Loose</span>
        </div>
      </div>
    </div>
  )
}
