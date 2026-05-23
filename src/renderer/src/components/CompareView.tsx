import { useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import type { CompareResult } from '../lib/types'
import { formatBytes, cn } from '../lib/utils'
import {
  Upload,
  Eye,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react'

export function CompareView(): JSX.Element {
  const comparePaths = useAppStore((s) => s.comparePaths)
  const setComparePaths = useAppStore((s) => s.setComparePaths)

  const [path1, setPath1] = useState<string>(comparePaths?.[0] ?? '')
  const [path2, setPath2] = useState<string>(comparePaths?.[1] ?? '')
  const [thumb1, setThumb1] = useState<string | null>(null)
  const [thumb2, setThumb2] = useState<string | null>(null)
  const [result, setResult] = useState<CompareResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSelectImage = useCallback(
    async (slot: 1 | 2) => {
      try {
        const files = await window.api.selectFiles()
        if (files.length > 0) {
          const filePath = files[0]
          const thumb = await window.api.getThumbnail(filePath)
          if (slot === 1) {
            setPath1(filePath)
            setThumb1(thumb)
          } else {
            setPath2(filePath)
            setThumb2(thumb)
          }
          setResult(null)
        }
      } catch (err) {
        console.error('Failed to select image:', err)
      }
    },
    []
  )

  const handleCompare = useCallback(async () => {
    if (!path1 || !path2) return
    setLoading(true)
    try {
      setComparePaths([path1, path2])
      const res = await window.api.compareImages(path1, path2)
      setResult(res)
    } catch (err) {
      console.error('Comparison failed:', err)
    } finally {
      setLoading(false)
    }
  }, [path1, path2, setComparePaths])

  const handleReset = useCallback(() => {
    setPath1('')
    setPath2('')
    setThumb1(null)
    setThumb2(null)
    setResult(null)
    setComparePaths(null)
  }, [setComparePaths])

  const resultConfig = result
    ? {
      exact: {
        icon: CheckCircle,
        color: 'text-accent-green',
        bg: 'bg-accent-green/10 border-accent-green/20',
        label: 'Exact Match',
        desc: 'These images are pixel-for-pixel identical.'
      },
      visual: {
        icon: AlertTriangle,
        color: 'text-accent-amber',
        bg: 'bg-accent-amber/10 border-accent-amber/20',
        label: `Visually Similar (${Math.round(result.similarity * 100)}%)`,
        desc: 'These images look very similar but have minor differences.'
      },
      different: {
        icon: XCircle,
        color: 'text-accent-red',
        bg: 'bg-accent-red/10 border-accent-red/20',
        label: 'Different Images',
        desc: 'These images are not duplicates.'
      }
    }[result.type]
    : null

  return (
    <div className="flex flex-col h-full px-6 py-6 animate-fade-in overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Eye className="w-5 h-5 text-accent-purple" />
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            Compare Two Images
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Select two images to compare pixel-by-pixel
          </p>
        </div>
        {(path1 || path2) && (
          <button
            onClick={handleReset}
            className="ml-auto flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Side-by-side */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Image 1 */}
        <DropSlot
          label="Image 1"
          thumb={thumb1}
          path={path1}
          onSelect={() => handleSelectImage(1)}
        />

        {/* Image 2 */}
        <DropSlot
          label="Image 2"
          thumb={thumb2}
          path={path2}
          onSelect={() => handleSelectImage(2)}
        />
      </div>

      {/* Compare button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleCompare}
          disabled={!path1 || !path2 || loading}
          aria-label="Compare selected images"
          className={`btn ${path1 && path2 && !loading ? 'btn-primary' : 'btn-ghost'}`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Comparing...
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Compare
            </>
          )}
        </button>
      </div>

      {/* Result */}
      {result && resultConfig && (
        <div className="animate-slide-up" role="status" aria-live="polite">
          {/* Result badge */}
          <div
            className={cn(
              'flex items-center gap-3 p-4 rounded-xl border mb-6',
              resultConfig.bg
            )}
          >
            <resultConfig.icon className={cn('w-6 h-6', resultConfig.color)} />
            <div>
              <p className={cn('text-sm font-semibold', resultConfig.color)}>
                {resultConfig.label}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                {resultConfig.desc}
              </p>
            </div>
          </div>

          {/* Diff image */}
          {result.diffImageBase64 && (
            <div className="card-glass rounded-xl p-4">
              <h3 className="text-sm font-medium text-text-primary mb-3">Difference Overlay</h3>
              <div className="rounded-lg overflow-hidden bg-bg-tertiary">
                <img
                  src={result.diffImageBase64}
                  alt="Difference overlay showing pixel differences between images"
                  className="w-full max-h-80 object-contain"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Drop slot sub-component ── */

interface DropSlotProps {
  label: string
  thumb: string | null
  path: string
  onSelect: () => void
}

function DropSlot({ label, thumb, path, onSelect }: DropSlotProps): JSX.Element {
  return (
    <div
      className="dropzone card-glass rounded-xl overflow-hidden cursor-pointer group p-2"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`Select ${label}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
    >
      {thumb ? (
        <div className="relative">
          <img
            src={thumb}
            alt={label}
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-xs text-white/80 truncate" title={path}>
              {path.split(/[/\\]/).pop()}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center aspect-square">
          <Upload className="w-8 h-8 text-text-muted mb-2 group-hover:text-accent-cyan transition-colors" />
          <p className="text-xs text-text-muted group-hover:text-text-secondary transition-colors">
            {label} — Click to select
          </p>
        </div>
      )}
    </div>
  )
}
