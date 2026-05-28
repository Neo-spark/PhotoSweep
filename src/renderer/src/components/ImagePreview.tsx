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
  const selectedFiles       = useAppStore((s) => s.selectedFiles)
  const toggleFileSelection = useAppStore((s) => s.toggleFileSelection)
  const isSelected          = selectedFiles.has(image.filePath)

  const { observerRef, dataUrl, loading, error } = useThumbnail(image.thumbnailPath)

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    window.api?.openFile(image.filePath)
  }, [image.filePath])

  return (
    <div
      className="group relative flex-shrink-0 w-36 select-none animate-fade-in"
      onClick={() => toggleFileSelection(image.filePath)}
      onDoubleClick={handleDoubleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFileSelection(image.filePath) }
        if (e.key === 'o' || e.key === 'O') window.api?.openFile(image.filePath)
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      title={image.filePath}
    >
      {/* Thumbnail container */}
      <div
        ref={observerRef as any}
        className={cn(
          'relative aspect-square overflow-hidden rounded-xl border transition-all duration-200 cursor-pointer',
          isSelected
            ? 'border-cyan-400/60 selected-ring'
            : 'border-white/[0.07] hover:border-white/[0.14] bg-white/[0.02]'
        )}
      >
        {/* Image / skeleton / error */}
        {loading ? (
          <div className="w-full h-full skeleton" />
        ) : error || !dataUrl ? (
          <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
            <FileImage className="w-8 h-8 text-white/15" />
          </div>
        ) : (
          <img
            src={dataUrl}
            alt={image.fileName || 'Image preview'}
            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Selection overlay tint */}
        {isSelected && (
          <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none" />
        )}

        {/* BEST badge */}
        {isBest && (
          <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold text-white/90"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}
            aria-hidden>
            <Crown className="w-2.5 h-2.5" />
            BEST
          </div>
        )}

        {/* Selection checkbox */}
        <div
          className={cn(
            'absolute top-1.5 right-1.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200',
            isSelected
              ? 'opacity-100 scale-100'
              : 'opacity-0 group-hover:opacity-80 scale-90 group-hover:scale-100 bg-black/50 border border-white/20'
          )}
          style={isSelected ? { background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' } : {}}
          aria-hidden={!isSelected}
        >
          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
        </div>

        {/* Open button */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); window.api?.openFile(image.filePath) }}
          aria-label={`Open ${image.fileName}`}
          className="absolute bottom-1.5 right-1.5 icon-btn opacity-0 group-hover:opacity-100 transition-all duration-200 w-6 h-6 rounded-lg"
        >
          <ExternalLink className="w-3 h-3 text-white/70" />
        </button>
      </div>

      {/* Metadata */}
      <div className="mt-2 px-0.5">
        <p className="text-[11px] text-white/70 font-medium truncate leading-tight" title={image.fileName}>
          {image.fileName}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <span className="text-[10px] text-white/35 tabular-nums">
            {formatBytes(image.size)}
          </span>
          {image.width > 0 && image.height > 0 && (
            <span className="text-[10px] text-white/25">
              {image.width}×{image.height}
            </span>
          )}
          <span className="text-[9px] uppercase tracking-wider text-white/20 font-semibold">
            {image.format}
          </span>
        </div>
      </div>
    </div>
  )
}
