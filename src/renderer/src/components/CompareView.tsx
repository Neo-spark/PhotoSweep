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
  RotateCcw,
  GitCompare
} from 'lucide-react'

export function CompareView(): JSX.Element {
  const comparePaths    = useAppStore((s) => s.comparePaths)
  const setComparePaths = useAppStore((s) => s.setComparePaths)

  const [path1, setPath1]   = useState<string>(comparePaths?.[0] ?? '')
  const [path2, setPath2]   = useState<string>(comparePaths?.[1] ?? '')
  const [thumb1, setThumb1] = useState<string | null>(null)
  const [thumb2, setThumb2] = useState<string | null>(null)
  const [result, setResult] = useState<CompareResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSelectImage = useCallback(async (slot: 1 | 2) => {
    try {
      const files = await window.api.selectFiles()
      if (files.length > 0) {
        const filePath = files[0]
        const thumb    = await window.api.getThumbnail(filePath)
        if (slot === 1) { setPath1(filePath); setThumb1(thumb) }
        else            { setPath2(filePath); setThumb2(thumb) }
        setResult(null)
      }
    } catch (err) { console.error('Failed to select image:', err) }
  }, [])

  const handleCompare = useCallback(async () => {
    if (!path1 || !path2) return
    setLoading(true)
    try {
      setComparePaths([path1, path2])
      const res = await window.api.compareImages(path1, path2)
      setResult(res)
    } catch (err) { console.error('Comparison failed:', err) }
    finally { setLoading(false) }
  }, [path1, path2, setComparePaths])

  const handleReset = useCallback(() => {
    setPath1(''); setPath2(''); setThumb1(null); setThumb2(null)
    setResult(null); setComparePaths(null)
  }, [setComparePaths])

  const resultConfig = result
    ? {
      exact:     { icon: CheckCircle,   color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: 'Exact Match',              desc: 'These images are pixel-for-pixel identical.' },
      visual:    { icon: AlertTriangle, color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20',    label: `${Math.round(result.similarity)}% Similar`, desc: 'These images look very similar but have minor differences.' },
      different: { icon: XCircle,       color: 'text-rose-400',    bg: 'bg-rose-500/10 border-rose-500/20',      label: 'Different Images',           desc: 'These images are not duplicates.' }
    }[result.type]
    : null

  return (
    <div className="flex flex-col h-full px-6 py-5 animate-fade-in overflow-y-auto">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(0,212,255,0.1))', border: '1px solid rgba(124,58,237,0.25)' }}>
          <GitCompare className="w-4.5 h-4.5 text-violet-400" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white/80" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Image Comparison
          </h2>
          <p className="text-xs text-white/35 mt-0.5">Select two images to compare pixel-by-pixel</p>
        </div>

        {(path1 || path2) && (
          <button onClick={handleReset} className="ml-auto btn btn-sm btn-ghost text-white/40">
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* ── Side by side ── */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <DropSlot label="Image A" thumb={thumb1} path={path1} onSelect={() => handleSelectImage(1)} />

        {/* VS divider */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden" />

        <DropSlot label="Image B" thumb={thumb2} path={path2} onSelect={() => handleSelectImage(2)} />
      </div>

      {/* ── VS Badge ── */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-white/[0.06]" />
        <div className="px-3 py-1 rounded-full text-xs font-bold text-white/30 border border-white/[0.07] bg-white/[0.03]">VS</div>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>

      {/* ── Compare Button ── */}
      <div className="flex justify-center mb-5">
        <button
          onClick={handleCompare}
          disabled={!path1 || !path2 || loading}
          aria-label="Compare selected images"
          className={cn('btn min-w-[160px] justify-center', path1 && path2 && !loading ? 'btn-primary' : 'btn-ghost')}
        >
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Comparing…</>
            : <><Eye className="w-4 h-4" /> Compare Images</>}
        </button>
      </div>

      {/* ── Result ── */}
      {result && resultConfig && (
        <div className="animate-slide-up space-y-4" role="status" aria-live="polite">
          {/* Result banner */}
          <div className={cn('flex items-center gap-3 p-4 rounded-2xl border', resultConfig.bg)}>
            <resultConfig.icon className={cn('w-6 h-6 flex-shrink-0', resultConfig.color)} />
            <div>
              <p className={cn('text-sm font-bold', resultConfig.color)}>{resultConfig.label}</p>
              <p className="text-xs text-white/40 mt-0.5">{resultConfig.desc}</p>
            </div>
          </div>

          {/* Diff overlay */}
          {result.diffImageBase64 && (
            <div className="card-glass rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-white/60 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Difference Overlay
              </h3>
              <div className="rounded-xl overflow-hidden bg-black/20">
                <img
                  src={result.diffImageBase64}
                  alt="Pixel difference overlay"
                  className="w-full max-h-72 object-contain"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Drop Slot ─────────────────────────────────────── */
interface DropSlotProps {
  label: string
  thumb: string | null
  path: string
  onSelect: () => void
}

function DropSlot({ label, thumb, path, onSelect }: DropSlotProps): JSX.Element {
  return (
    <div
      className="card-glass rounded-2xl overflow-hidden cursor-pointer group card-lift"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`Select ${label}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect() } }}
    >
      {thumb ? (
        <div className="relative">
          <img
            src={thumb}
            alt={label}
            className="w-full aspect-video object-cover transition-transform duration-400 group-hover:scale-103"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-xs font-semibold text-white/80 bg-black/60 px-3 py-1 rounded-full">
              Change image
            </span>
          </div>
          {/* Filename */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-xs text-white/70 truncate" title={path}>{path.split(/[/\\]/).pop()}</p>
          </div>
          {/* Label */}
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold text-white/80 bg-black/50">
            {label}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center aspect-video gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center group-hover:bg-violet-500/10 group-hover:border-violet-500/20 transition-all duration-300">
            <Upload className="w-6 h-6 text-white/20 group-hover:text-violet-400 transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-white/40 group-hover:text-white/60 transition-colors">{label}</p>
            <p className="text-xs text-white/20">Click to select</p>
          </div>
        </div>
      )}
    </div>
  )
}
