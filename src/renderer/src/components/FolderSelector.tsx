import { useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useScanner } from '../hooks/useScanner'
import { ThresholdSlider } from './ThresholdSlider'
import { cn, truncatePath } from '../lib/utils'
import {
  FolderOpen,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
  Images,
  Rocket
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
    <div className="overflow-y-auto h-full">
      <div className="flex flex-col items-center justify-center p-8 relative min-h-full">
      {/* Background Atmospheric Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl w-full flex flex-col items-center text-center relative z-10 py-8">
        {/* Header Section */}
        <div className="mb-10 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Intelligent Detection Engine
          </div>
          <h2 className="text-5xl font-headline font-extrabold tracking-tight text-on-surface">
            Find and clean up <span className="text-primary">duplicate photos</span>
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
            Select folders to scan for exact copies and visually similar images. Reclaim your disk space quickly and safely.
          </p>
          <div className="flex justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Safe deletion</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span>Fast scanning</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
              <Images className="w-4 h-4 text-primary" />
              <span>All formats</span>
            </div>
          </div>
        </div>

        {/* Drag & Drop Zone */}
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleBrowse() }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowse}
          className={cn(
            "w-full max-w-2xl glass-panel-elevated rounded-[2rem] p-12 glacier-glow border-dashed border-2 transition-all duration-300 cursor-pointer group mb-8 relative overflow-hidden",
            isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-primary/20 hover:border-primary/50"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center pointer-events-none">
            <div className="w-24 h-24 rounded-3xl bg-surface-bright flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
              <FolderOpen className={cn("w-12 h-12 transition-colors", isDragging ? "text-primary" : "text-primary/80 group-hover:text-primary")} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-on-surface">
              {isDragging ? 'Drop folders here' : 'Drag & drop folders'}
            </h3>
            <p className="text-on-surface-variant">
              or <span className="text-primary hover:underline font-medium pointer-events-auto">browse your computer</span>
            </p>
            <div className="mt-8 flex gap-2 flex-wrap justify-center">
              {['JPG', 'PNG', 'WEBP', 'HEIC', 'TIFF', 'BMP', 'GIF'].map(ext => (
                <span key={ext} className="px-2 py-1 bg-surface-container rounded text-[10px] text-on-surface-variant border border-outline-variant">{ext}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Folders */}
        {folders.length > 0 && (
          <div className="w-full max-w-2xl mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                {folders.length} folder{folders.length !== 1 ? 's' : ''} selected
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); clearFolders(); }}
                className="text-[11px] text-error hover:text-error/80 font-medium"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {folders.map((folder) => (
                <div key={folder} className="group flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-lg border border-outline-variant">
                  <FolderOpen className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="truncate max-w-[220px] text-xs text-on-surface" title={folder}>
                    {truncatePath(folder, 38)}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFolder(folder); }}
                    className="ml-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-error/20 text-on-surface-variant hover:text-error transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controls Section */}
        <div className="w-full max-w-2xl glass-panel rounded-2xl p-6 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <ThresholdSlider />

          <button
            onClick={handleStartScan}
            disabled={!canScan}
            className={cn(
              "w-full h-14 font-bold text-lg rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 group overflow-hidden relative",
              canScan 
                ? "bg-primary text-on-primary hover:shadow-[0_0_40px_rgba(125,211,252,0.3)] hover:scale-[1.01] cursor-pointer" 
                : "bg-surface-variant text-on-surface-variant cursor-not-allowed opacity-50"
            )}
          >
            {canScan && <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></span>}
            <Rocket className={cn("w-5 h-5", canScan && "group-hover:rotate-12 transition-transform")} />
            Start Scan
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}
