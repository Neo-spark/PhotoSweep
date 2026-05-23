import { useState } from 'react'
import type { DuplicateGroup } from '../lib/types'
import { useAppStore } from '../store/useAppStore'
import { ImagePreview } from './ImagePreview'
import { formatBytes, cn } from '../lib/utils'
import { ChevronDown, ChevronRight, Shield, Copy } from 'lucide-react'

interface DuplicateCardProps {
  group: DuplicateGroup
  index: number
}

export function DuplicateCard({ group, index }: DuplicateCardProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(true)
  const selectedFiles = useAppStore((s) => s.selectedFiles)
  const selectFiles = useAppStore((s) => s.selectFiles)
  const deselectFiles = useAppStore((s) => s.deselectFiles)

  const selectedInGroup = group.images.filter((img) =>
    selectedFiles.has(img.filePath)
  ).length

  const handleSelectAll = () => {
    const nonBest = group.images
      .filter((img) => !img.isOriginal)
      .map((img) => img.filePath)
    selectFiles(nonBest)
  }

  const handleDeselectAll = () => {
    deselectFiles(group.images.map((img) => img.filePath))
  }

  const isExact = group.type === 'exact'

  return (
    <div
      className="card-glass overflow-hidden transition-all duration-300 hover:border-border-strong animate-scale-in"
      style={{ animationDelay: `${Math.min(index * 0.05, 0.3)}s` }}
    >
      {/* Header (keyboard accessible) */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsExpanded(!isExpanded)
          }
        }}
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
        )}

        {/* Type badge */}
        <span
          className={cn(
            'badge shrink-0 text-xs',
            isExact
              ? 'bg-accent-green/15 text-accent-green border border-accent-green/20'
              : 'bg-accent-amber/15 text-accent-amber border border-accent-amber/20'
          )}
        >
          {isExact ? (
            <span className="flex items-center gap-1">
              <Copy className="w-3 h-3" />
              Exact
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <div className="text-sm font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                {Math.round(group.similarity)}% Match
              </div>
            </span>
          )}
        </span>

        {/* Similarity */}
        <span className="text-xs text-text-secondary">
          {Math.round(group.similarity)}% match
        </span>

        {/* Image count */}
        <span className="text-xs text-text-muted">
          · {group.images.length} images
        </span>

        {/* Space savings */}
        <span className="text-xs text-accent-cyan ml-auto">
          {formatBytes(group.spaceSavings)} saveable
        </span>

        {/* Selection info */}
        {selectedInGroup > 0 && (
          <span className="text-xs text-accent-purple font-medium">
            {selectedInGroup} selected
          </span>
        )}

        {/* Select/deselect buttons */}
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={handleSelectAll}
            aria-label={`Select duplicates in group ${index + 1}`}
            className="btn btn-sm btn-ghost"
          >
            Select
          </button>
          <button
            type="button"
            onClick={handleDeselectAll}
            aria-label={`Clear selection in group ${index + 1}`}
            className="btn btn-sm btn-ghost"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Image thumbnails */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-1">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {group.images.map((image, idx) => (
              <ImagePreview
                key={image.filePath} // use path as key since id might be missing or not unique
                image={image}
                isBest={idx === 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
