import { useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useScanner } from '../hooks/useScanner'
import { ThresholdSlider } from './ThresholdSlider'
import { cn, truncatePath } from '../lib/utils'
import {
  FolderOpen,
  X,
  Play,
  Sparkles,
  ImagePlus,
  Shield,
  Zap
} from 'lucide-react'

export function FolderSelector(): JSX.Element {
  const folders            = useAppStore((s) => s.folders)
  const addFolders         = useAppStore((s) => s.addFolders)
  const removeFolder       = useAppStore((s) => s.removeFolder)
  const clearFolders       = useAppStore((s) => s.clearFolders)
  const similarityThreshold = useAppStore((s) => s.similarityThreshold)
  const setView            = useAppStore((s) => s.setView)

  const { startScan } = useScanner()
  const [isDragging, setIsDragging] = useState(false)

  const handleBrowse = useCallback(async () => {
    try {
      const selected = await window.api.selectFolders()
      if (selected.length > 0) addFolders(selected)
    } catch (err) {
      console.error('Failed to select folders:', err)
    }
  }, [addFolders])

  const handleStartScan = useCallback(async () => {
    if (folders.length === 0) return
    setView('scan')
    await startScan(folders, similarityThreshold)
  }, [folders, similarityThreshold, startScan, setView])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false)
    const items = Array.from(e.dataTransfer.files)
    const folderPaths = items
      .filter((f) => f.type === '' || f.size === 0)
      .map((f) => (f as any).path)
      .filter(Boolean)
    if (folderPaths.length > 0) addFolders(folderPaths)
  }, [addFolders])

  const canScan = folders.length > 0

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-8 animate-fade-in overflow-y-auto">
      {/* ── Hero ── */}
      <div className="text-center mb-8 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-400 mb-5">
          <Sparkles className="w-3 h-3" />
          AI-Powered Detection
        </div>
        <h2 className="text-4xl font-bold gradient-text mb-3 leading-tight">
          Find &amp; Destroy<br />Duplicate Photos
        </h2>
        <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
          Select folders to scan for exact copies and visually similar images.
          Reclaim your disk space with perceptual hashing technology.
        </p>
      </div>

      {/* ── Feature pills ── */}
      <div className="flex items-center gap-3 mb-8 animate-slide-up" style={{ animationDelay: '0.05s' }}>
        {[
          { icon: Shield,    label: 'Safe deletion' },
          { icon: Zap,       label: 'Blazing fast'  },
          { icon: ImagePlus, label: 'All formats'   }
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-xs text-white/50">
            <Icon className="w-3 h-3 text-cyan-400" />
            {label}
          </div>
        ))}
      </div>

      {/* ── Drop Zone ── */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Add folders to scan"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBrowse() }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowse}
        className={cn(
          'dropzone-animated w-full max-w-xl relative cursor-pointer overflow-hidden',
          'transition-all duration-400 ease-out rounded-3xl group',
          isDragging
            ? 'bg-cyan-500/[0.07] scale-[1.015] drag-active'
            : 'bg-white/[0.025] hover:bg-white/[0.04]'
        )}
        style={{ animationDelay: '0.1s' }}
      >
        {/* Inner glow on hover */}
        <div className={cn(
          'absolute inset-0 rounded-3xl transition-opacity duration-500',
          'bg-gradient-to-br from-cyan-500/5 via-violet-500/3 to-transparent',
          isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )} />

        <div className="relative z-10 flex flex-col items-center justify-center py-14 px-8 text-center">
          {/* Icon container */}
          <div className={cn(
            'w-20 h-20 rounded-2xl flex items-center justify-center mb-5',
            'transition-all duration-500',
            isDragging
              ? 'bg-cyan-500/20 shadow-glow-cyan scale-110'
              : 'bg-white/[0.04] border border-white/[0.07] group-hover:bg-cyan-500/10 group-hover:scale-105'
          )}>
            {isDragging
              ? <ImagePlus className="w-10 h-10 text-cyan-400 animate-bounce" />
              : <FolderOpen className="w-10 h-10 text-white/30 group-hover:text-cyan-400 transition-colors duration-300" />}
          </div>

          <p className="text-xl font-semibold text-white/80 mb-1.5">
            {isDragging ? 'Drop folders here' : 'Drag & drop folders'}
          </p>
          <p className="text-sm text-white/35">
            or{' '}
            <button
              onClick={(e) => { e.stopPropagation(); handleBrowse() }}
              className="text-cyan-400 hover:text-cyan-300 font-medium underline-offset-2 hover:underline transition-colors no-drag"
              aria-label="Browse folders"
            >
              browse your computer
            </button>
          </p>
          <p className="text-[10px] uppercase tracking-widest text-white/20 mt-4 font-medium">
            JPG · PNG · WEBP · HEIC · TIFF · BMP · GIF
          </p>
        </div>
      </div>

      {/* ── Selected Folders ── */}
      {folders.length > 0 && (
        <div className="w-full max-w-xl mt-5 animate-slide-up" style={{ animationDelay: '0.12s' }}>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
              {folders.length} folder{folders.length !== 1 ? 's' : ''} selected
            </span>
            <button
              onClick={clearFolders}
              className="btn btn-sm btn-ghost text-[11px]"
              aria-label="Clear all folders"
            >
              Clear all
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {folders.map((folder) => (
              <div key={folder} className="group flex items-center gap-1.5">
                <div className="folder-pill">
                  <FolderOpen className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span className="truncate max-w-[220px] text-[11px]" title={folder}>
                    {truncatePath(folder, 38)}
                  </span>
                </div>
                <button
                  onClick={() => removeFolder(folder)}
                  className="w-5 h-5 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 hover:border-red-500/30"
                  aria-label={`Remove ${folder}`}
                >
                  <X className="w-2.5 h-2.5 text-white/60" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Similarity Slider ── */}
      <div className="w-full max-w-xl mt-5 animate-slide-up" style={{ animationDelay: '0.16s' }}>
        <ThresholdSlider />
      </div>

      {/* ── Scan Button ── */}
      <div className="w-full max-w-xl mt-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <button
          onClick={handleStartScan}
          disabled={!canScan}
          aria-label="Start scan"
          title={!canScan ? 'Select at least one folder first' : 'Start AI scan'}
          className={cn(
            'relative w-full overflow-hidden rounded-2xl py-4 font-bold text-white text-lg',
            'transition-all duration-300',
            canScan
              ? 'cursor-pointer shadow-glow-violet hover:shadow-[0_0_40px_rgba(124,58,237,0.5),0_0_80px_rgba(0,212,255,0.15)] hover:-translate-y-0.5'
              : 'cursor-not-allowed opacity-40'
          )}
          style={{
            background: canScan
              ? 'linear-gradient(135deg, #7c3aed 0%, #00d4ff 100%)'
              : 'linear-gradient(135deg, #4b5563 0%, #374151 100%)'
          }}
        >
          {/* Shimmer overlay */}
          {canScan && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2.5s ease-in-out infinite'
              }}
            />
          )}

          <div className="relative z-10 flex items-center justify-center gap-3">
            <Play className="w-5 h-5" />
            <span>Start AI Scan</span>
          </div>
          <div className="relative z-10 text-[11px] text-white/50 font-normal mt-0.5">
            Perceptual hashing · Exact &amp; visual duplicates
          </div>
        </button>
      </div>
    </div>
  )
}
