import { useState } from 'react'
import type { DuplicateGroup } from '../lib/types'
import { useAppStore } from '../store/useAppStore'
import { ImagePreview } from './ImagePreview'
import { formatBytes, cn } from '../lib/utils'
import { ChevronDown, ChevronRight, Copy, Eye, CheckSquare, Square } from 'lucide-react'

interface DuplicateCardProps {
  group: DuplicateGroup
  index: number
}

export function DuplicateCard({ group, index }: DuplicateCardProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(true)
  const selectedFiles  = useAppStore((s) => s.selectedFiles)
  const selectFiles    = useAppStore((s) => s.selectFiles)
  const deselectFiles  = useAppStore((s) => s.deselectFiles)
  const setComparePaths = useAppStore((s) => s.setComparePaths)
  const setView        = useAppStore((s) => s.setView)

  const selectedInGroup = group.images.filter((img) => selectedFiles.has(img.filePath)).length

  const handleSelectAll = () => {
    const nonBest = group.images.filter((img) => !img.isOriginal).map((img) => img.filePath)
    selectFiles(nonBest)
  }

  const handleDeselectAll = () => deselectFiles(group.images.map((img) => img.filePath))

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (group.images.length >= 2) {
      setComparePaths([group.images[0].filePath, group.images[1].filePath])
      setView('compare')
    }
  }

  const isExact      = group.type === 'exact'
  const similarity   = Math.round(group.similarity)
  const allSelected  = selectedInGroup === group.images.filter(i => !i.isOriginal).length && selectedInGroup > 0

  return (
    <div
      className={cn(
        'card-glass overflow-hidden card-lift transition-all duration-250',
        'border border-white/[0.07] hover:border-white/[0.11]',
        isExact
          ? 'border-l-[2px] border-l-emerald-500/40'
          : 'border-l-[2px] border-l-amber-500/40'
      )}
      style={{ animationDelay: `${Math.min(index * 0.04, 0.25)}s` }}
    >
      {/* ── Card Header ── */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsExpanded(!isExpanded) }
        }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
      >
        {/* Chevron */}
        <div className="flex-shrink-0 text-white/25">
          {isExpanded
            ? <ChevronDown className="w-4 h-4" />
            : <ChevronRight className="w-4 h-4" />}
        </div>

        {/* Type badge */}
        {isExact ? (
          <span className="badge badge-exact flex-shrink-0">
            <Copy className="w-3 h-3" />
            Exact
          </span>
        ) : (
          <span className="badge badge-similar flex-shrink-0">
            {similarity}% Match
          </span>
        )}

        {/* Image count */}
        <span className="text-xs text-white/30 flex-shrink-0">
          {group.images.length} images
        </span>

        {/* Space savings */}
        {group.spaceSavings > 0 && (
          <span className="badge badge-cyan ml-auto flex-shrink-0">
            {formatBytes(group.spaceSavings)} saveable
          </span>
        )}

        {/* Selected indicator */}
        {selectedInGroup > 0 && (
          <span className="text-xs font-semibold text-violet-400 flex-shrink-0">
            {selectedInGroup} selected
          </span>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          {/* Select/Deselect */}
          <button
            type="button"
            onClick={allSelected ? handleDeselectAll : handleSelectAll}
            aria-label={`${allSelected ? 'Deselect' : 'Select'} duplicates in group ${index + 1}`}
            className="btn btn-sm btn-ghost"
          >
            {allSelected
              ? <><CheckSquare className="w-3.5 h-3.5 text-cyan-400" /> Deselect</>
              : <><Square className="w-3.5 h-3.5" /> Select</>}
          </button>

          {/* Compare */}
          {group.images.length >= 2 && (
            <button
              type="button"
              onClick={handleCompare}
              aria-label={`Compare images in group ${index + 1}`}
              className="btn btn-sm btn-ghost"
            >
              <Eye className="w-3.5 h-3.5 text-violet-400" />
              Compare
            </button>
          )}
        </div>
      </div>

      {/* ── Image Thumbnails ── */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-1">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
            {group.images.map((image, idx) => (
              <ImagePreview
                key={image.filePath}
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
