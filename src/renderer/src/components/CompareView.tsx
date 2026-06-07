import { useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import type { CompareResult } from '../lib/types'
import { formatBytes, cn } from '../lib/utils'
import {
  Upload,
  Zap,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  GitCompare,
  FileImage,
  Info
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
      different: { icon: XCircle,       color: 'text-error',       bg: 'bg-error/10 border-error/20',      label: 'Different Images',           desc: 'These images are not duplicates.' }
    }[result.type]
    : null

  return (
    <div className="flex flex-col h-full px-6 py-5 animate-fade-in overflow-y-auto relative overflow-hidden">
      
      {/* Atmospheric Background Elements */}
      <div className="absolute top-[15%] right-[10%] w-[400px] h-[400px] bg-primary/10 blur-[100px] -z-10 rounded-full animate-pulse pointer-events-none" style={{animationDuration: '8s'}}></div>
      <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] bg-tertiary/10 blur-[80px] -z-10 rounded-full animate-pulse pointer-events-none" style={{animationDuration: '12s'}}></div>

      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-primary font-headline">Image Compare</h2>
          <div className="h-4 w-[1px] bg-outline-variant"></div>
          <span className="text-sm text-on-surface-variant">Analyze pixel differences</span>
        </div>

        {(path1 || path2) && (
          <button onClick={handleReset} className="ml-auto flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-bright rounded-lg transition-colors border border-transparent hover:border-outline-variant">
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto w-full flex flex-col items-center mt-2 mb-8 relative z-10">
        {/* ── Compare Grid ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
          
          <DropSlot label="Image A" subtitle="Source Alpha" thumb={thumb1} path={path1} onSelect={() => handleSelectImage(1)} bgClass="bg-gradient-to-br from-primary/5 to-transparent" position="left" />

          {/* VS Divider */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none">
            <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block"></div>
            <div className="w-12 h-12 rounded-full glass-panel-elevated border border-primary/30 flex items-center justify-center shadow-lg backdrop-blur-3xl mx-4">
              <span className="text-xs font-bold text-primary tracking-widest italic">VS</span>
            </div>
            <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block"></div>
          </div>

          <DropSlot label="Image B" subtitle="Source Beta" thumb={thumb2} path={path2} onSelect={() => handleSelectImage(2)} bgClass="bg-gradient-to-br from-tertiary/5 to-transparent" position="right" />
        </div>

        {/* ── Footer CTA ── */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            onClick={handleCompare}
            disabled={!path1 || !path2 || loading}
            className="group relative px-12 py-4 rounded-full overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Glassmorphic Button Base */}
            <div className={cn(
              "absolute inset-0 transition-all duration-300 border",
              path1 && path2 && !loading ? "bg-primary/20 border-primary border-opacity-50 hover:bg-primary/30" : "bg-surface-container-highest/40 backdrop-blur-xl border-primary/20"
            )}></div>
            <div className="relative flex items-center gap-3">
              {loading ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              ) : (
                <Zap className={cn("w-5 h-5", path1 && path2 && !loading ? "text-primary animate-pulse" : "text-on-surface-variant")} />
              )}
              <span className={cn("font-semibold tracking-wide", path1 && path2 && !loading ? "text-on-surface" : "text-on-surface-variant")}>
                {loading ? "Comparing..." : "Compare Images"}
              </span>
            </div>
          </button>
          <p className="text-xs text-on-surface-variant/60 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Select two images from your library to begin analysis
          </p>
        </div>

        {/* ── Result ── */}
        {result && resultConfig && (
          <div className="animate-slide-up space-y-4 mt-8 w-full max-w-4xl" role="status" aria-live="polite">
            {/* Result banner */}
            <div className={cn('flex items-center gap-4 p-5 rounded-2xl border', resultConfig.bg)}>
              <resultConfig.icon className={cn('w-8 h-8 flex-shrink-0', resultConfig.color)} />
              <div>
                <p className={cn('text-lg font-bold', resultConfig.color)}>{resultConfig.label}</p>
                <p className="text-sm text-on-surface-variant mt-0.5">{resultConfig.desc}</p>
              </div>
            </div>

            {/* Diff overlay */}
            {result.diffImageBase64 && (
              <div className="glass-panel rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-on-surface-variant mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Difference Overlay
                </h3>
                <div className="rounded-xl overflow-hidden bg-black/40 flex justify-center border border-outline-variant/30">
                  <img
                    src={result.diffImageBase64}
                    alt="Pixel difference overlay"
                    className="w-full max-w-2xl object-contain rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Drop Slot ─────────────────────────────────────── */
interface DropSlotProps {
  label: string
  subtitle: string
  thumb: string | null
  path: string
  onSelect: () => void
  bgClass: string
  position: 'left' | 'right'
}

function DropSlot({ label, subtitle, thumb, path, onSelect, bgClass, position }: DropSlotProps): JSX.Element {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center glass-panel-elevated rounded-2xl h-[400px] cursor-pointer transition-all duration-500 overflow-hidden glacier-glow border",
        thumb ? "border-primary/40" : "border-primary/10 hover:border-primary/40"
      )}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`Select ${label}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect() } }}
    >
      <div className={cn("absolute inset-0 pointer-events-none", bgClass)}></div>
      
      {thumb ? (
        <div className="relative w-full h-full p-4 flex flex-col gap-4">
           <div className="flex-1 rounded-xl overflow-hidden relative">
              <img
                src={thumb}
                alt={label}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl backdrop-blur-sm">
                <span className="text-sm font-semibold text-white bg-black/60 px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
                  <Upload className="w-4 h-4" /> Change image
                </span>
              </div>
           </div>
           
           <div className="flex flex-col bg-surface-container-low p-3 rounded-xl border border-outline-variant/50 relative z-10">
             <div className="flex items-center gap-2 mb-1">
               <FileImage className="w-4 h-4 text-primary" />
               <span className="text-sm font-semibold text-on-surface">{label}</span>
             </div>
             <p className="text-xs text-on-surface-variant truncate w-full" title={path}>{path.split(/[/\\]/).pop()}</p>
           </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 transition-transform group-hover:scale-105 duration-300 relative z-10">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
            <Upload className="w-7 h-7" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-on-surface">{label}</h3>
            <p className="text-sm text-on-surface-variant mt-1">Click to select or drag and drop</p>
          </div>
        </div>
      )}

      {!thumb && (
         <div className={cn("absolute bottom-4 flex gap-2", position === 'left' ? 'left-4' : 'right-4')}>
           <span className="px-2 py-1 bg-surface-container-highest/80 backdrop-blur-md rounded border border-white/10 text-[10px] text-on-surface-variant uppercase tracking-wider">
             {subtitle}
           </span>
         </div>
      )}
    </div>
  )
}
