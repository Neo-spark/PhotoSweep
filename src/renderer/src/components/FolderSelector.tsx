import { useState, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { ThresholdSlider } from './ThresholdSlider'
import { cn, truncatePath } from '../lib/utils'
import {
  FolderOpen,
  X,
  Play,
  Upload
} from 'lucide-react'

export function FolderSelector(): JSX.Element {
  const folders = useAppStore((s) => s.folders)
  const addFolders = useAppStore((s) => s.addFolders)
  const removeFolder = useAppStore((s) => s.removeFolder)
  const clearFolders = useAppStore((s) => s.clearFolders)
  const similarityThreshold = useAppStore((s) => s.similarityThreshold)
  const setScanState = useAppStore((s) => s.setScanState)
  const setView = useAppStore((s) => s.setView)

  const [isDragging, setIsDragging] = useState(false)

  const handleBrowse = useCallback(async () => {
    try {
      const selected = await window.api.selectFolders()
      if (selected.length > 0) {
        addFolders(selected)
      }
    } catch (err) {
      console.error('Failed to select folders:', err)
    }
  }, [addFolders])

  const handleStartScan = useCallback(async () => {
    if (folders.length === 0) return
    try {
      setScanState('scanning')
      setView('scan')
      await window.api.startScan(folders, similarityThreshold)
    } catch (err) {
      console.error('Failed to start scan:', err)
      setScanState('idle')
    }
  }, [folders, similarityThreshold, setScanState, setView])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const items = Array.from(e.dataTransfer.files)
      const folderPaths = items
        .filter((f) => f.type === '' || f.size === 0) // heuristic for directories
        .map((f) => (f as any).path)
        .filter(Boolean)

      if (folderPaths.length > 0) {
        addFolders(folderPaths)
      }
    },
    [addFolders]
  )

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 py-10 animate-fade-in">
      {/* Hero section */}
      <div className="text-center mb-8 animate-slide-up">
        <h2 className="text-3xl font-bold gradient-text mb-3">
          Find Duplicate Photos
        </h2>
        <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
          Select folders to scan for exact and visually similar duplicates.
          Free up disk space with AI-powered detection.
        </p>
      </div>

      {/* Drop Zone (Stitch AI Generated) */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Add folders to scan"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleBrowse()
          }
        }}
        className={cn(
          'dropzone group relative w-full max-w-xl aspect-[21/9] rounded-[32px] transition-all duration-500 cursor-pointer overflow-hidden animate-slide-up',
          isDragging ? 'border-primary scale-[1.02] bg-white/10' : 'hover:border-primary/50 hover:bg-white/10'
        )}
        style={{ animationDelay: '0.1s' }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowse}
      >
        {/* Decorative Glow Inner */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-2 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
            {isDragging ? (
              <Upload className="w-10 h-10 text-primary animate-bounce" />
            ) : (
              <FolderOpen className="w-10 h-10 text-primary transition-colors duration-300" />
            )}
          </div>
          <p className="text-2xl font-semibold">Drag and drop folders here</p>
          <p className="text-sm text-on-surface-variant">
            or{' '}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleBrowse()
              }}
              className="btn btn-ghost"
              aria-label="Browse folders"
            >
              browse your computer
            </button>
          </p>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 mt-2">
            Supports JPG, PNG, WEBP, HEIC, TIFF, BMP, GIF
          </p>
        </div>
      </div>

      {/* Selected Folders */}
      {folders.length > 0 && (
        <div
          className="w-full max-w-xl mt-6 animate-slide-up"
          style={{ animationDelay: '0.15s' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-text-secondary">
              {folders.length} folder{folders.length !== 1 ? 's' : ''} selected
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                clearFolders()
              }}
              className="btn btn-sm btn-ghost"
            >
              Clear all
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {folders.map((folder) => (
              <div
                key={folder}
                className="group flex items-center gap-2 text-sm"
              >
                <div className="folder-pill">
                  <FolderOpen className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                  <span
                    className="text-text-secondary text-xs truncate max-w-[240px]"
                    title={folder}
                  >
                    {truncatePath(folder, 40)}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFolder(folder)
                  }}
                  className="btn btn-sm btn-ghost opacity-0 group-hover:opacity-100"
                  aria-label={`Remove ${folder}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Threshold Slider */}
      <div
        className="w-full max-w-xl mt-6 animate-slide-up"
        style={{ animationDelay: '0.2s' }}
      >
        <ThresholdSlider />
      </div>

      {/* Start Scan Button (Stitch AI Generated) */}
      <button
        onClick={handleStartScan}
        disabled={folders.length === 0}
        aria-label="Start scan"
        title={folders.length === 0 ? 'Select folders first' : 'Start scan'}
        className={cn('mt-8 w-full max-w-xl animate-slide-up btn btn-primary', folders.length === 0 ? 'opacity-60 cursor-not-allowed' : '')}
        style={{ animationDelay: '0.25s' }}
      >
        <div className="relative z-10 flex items-center justify-center gap-3">
          <Play className={cn('w-6 h-6', folders.length === 0 && 'opacity-50')} />
          <span className="text-xl">Start Scan</span>
        </div>
      </button>
    </div>
  )
}
