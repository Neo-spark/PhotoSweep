import { useCallback } from 'react'
import type { ImageFile } from '../lib/types'
import { useAppStore } from '../store/useAppStore'
import { useThumbnail } from '../hooks/useThumbnail'
import { formatBytes, cn } from '../lib/utils'
import { Crown, Check, ExternalLink, FileImage } from 'lucide-react'

interface ImagePreviewProps {
  image: ImageFile
  isBest: boolean
}

export function ImagePreview({ image, isBest }: ImagePreviewProps): JSX.Element {
  const selectedFiles = useAppStore((s) => s.selectedFiles)
  const toggleFileSelection = useAppStore((s) => s.toggleFileSelection)
  const isSelected = selectedFiles.has(image.filePath)

  const { observerRef, dataUrl, loading, error } = useThumbnail(image.thumbnailPath)

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      window.api?.openFile(image.filePath)
    },
    [image.filePath]
  )

  return (
    <div
      className="group relative flex-shrink-0 w-32 md:w-40 select-none animate-fade-in"
      onClick={() => toggleFileSelection(image.filePath)}
      onDoubleClick={handleDoubleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleFileSelection(image.filePath)
        }
        if (e.key === 'o' || e.key === 'O') {
          // quick open with keyboard
          window.api?.openFile(image.filePath)
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      title={image.filePath}
    >
      {/* Thumbnail */}
      <div
        ref={observerRef as any}
        className={cn(
          'relative aspect-square overflow-hidden bg-bg-tertiary rounded-xl border transition-all duration-200',
          isSelected
            ? 'border-accent-cyan/50 shadow-glow-cyan bg-accent-cyan/5'
            : 'border-border-subtle hover:border-border-strong bg-white/[0.02]'
        )}
      >
        {loading ? (
          <div className="w-full h-full skeleton" />
        ) : error || !dataUrl ? (
          <div className="w-full h-full flex items-center justify-center bg-bg-tertiary">
            <FileImage className="w-8 h-8 text-text-muted" />
          </div>
        ) : (
          <img
            src={dataUrl}
            alt={image.fileName || 'Image preview'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Best badge */}
        {isBest && (
          <div className="absolute top-1.5 left-1.5 badge bg-accent-amber/90 text-white text-[10px] font-bold" aria-hidden>
            <Crown className="w-3 h-3" />
            BEST
          </div>
        )}

        {/* Selection checkbox */}
        <div
          className={cn(
            'absolute top-1.5 right-1.5 icon-btn',
            isSelected
              ? 'gradient-accent'
              : 'bg-black/40 border border-white/20 opacity-0 group-hover:opacity-100'
          )}
          aria-hidden={!isSelected}
        >
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>

        {/* Open button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            window.api?.openFile(image.filePath)
          }}
          aria-label={`Open ${image.fileName}`}
          className="absolute bottom-1.5 right-1.5 icon-btn opacity-0 group-hover:opacity-100"
        >
          <ExternalLink className="w-3 h-3 text-white" />
        </button>
      </div>

      {/* Metadata */}
      <div className="mt-2 px-1">
        <p className="text-xs text-text-primary font-medium truncate" title={image.fileName}>
          {image.fileName}
        </p>
        <div className="flex items-center gap-2 mt-1 text-[10px] text-text-tertiary">
          <span className="text-[10px] text-text-muted">
            {formatBytes(image.size)}
          </span>
          {image.width > 0 && image.height > 0 && (
            <span className="text-[10px] text-text-muted">
              {image.width}×{image.height}
            </span>
          )}
        </div>
        <span className="text-[10px] text-text-muted uppercase mt-0.5 block">
          {image.format}
        </span>
      </div>
    </div>
  )
}
