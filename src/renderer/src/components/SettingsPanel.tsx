import React, { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import {
  Cpu,
  Database,
  Image as ImageIcon,
  Trash2,
  CheckCircle,
  Layers,
  Book,
  Bug,
  History,
  ChevronRight
} from 'lucide-react'
import { cn } from '../lib/utils'

function PremiumToggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`toggle-track ${checked ? 'active' : ''}`}
    >
      <div className="toggle-thumb" />
    </button>
  )
}

export const SettingsPanel: React.FC = () => {
  const { similarityThreshold, setSimilarityThreshold, autoSelectLowerQuality, setAutoSelectLowerQuality } = useAppStore()
  const [cacheCleared, setCacheCleared] = useState(false)

  const handleClearCache = () => {
    setCacheCleared(true)
    setTimeout(() => setCacheCleared(false), 2000)
  }

  const thresholdLabel =
    similarityThreshold === 0   ? 'Exact matches only' :
    similarityThreshold <= 5    ? 'High precision (recommended)' :
    similarityThreshold <= 12   ? 'Moderate — catches more' :
    'Loose — may have false positives'

  return (
    <div className="h-full overflow-y-auto px-6 py-6 scrollbar-thin animate-fade-in relative overflow-hidden">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">

        {/* ── Header Section ── */}
        <div className="lg:col-span-12 mb-2 animate-slide-up">
          <h3 className="text-2xl font-bold tracking-tight mb-1 font-headline">Application Preferences</h3>
          <p className="text-on-surface-variant text-sm">Fine-tune the engine and manage your local data storage.</p>
        </div>

        {/* ── Detection Engine Card (Bento Area Large) ── */}
        <section className="lg:col-span-8 glass-panel rounded-xl p-6 flex flex-col gap-6 relative overflow-hidden group animate-slide-up" style={{ animationDelay: '0.05s' }}>
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
            <Cpu className="w-32 h-32 text-primary" strokeWidth={1} />
          </div>
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-on-surface">Detection Engine</h4>
              <p className="text-sm text-on-surface-variant">Control similarity threshold and auto-selection algorithms</p>
            </div>
          </div>
          
          <div className="space-y-8 mt-4 relative z-10">
            {/* Similarity Threshold */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-on-surface">Similarity Threshold</label>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                  {thresholdLabel}
                </span>
              </div>
              <input 
                className="custom-slider w-full" 
                max="20" 
                min="0" 
                type="range" 
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(parseInt(e.target.value, 10))}
              />
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                <span>0 — Exact only</span>
                <span>10 — Balanced</span>
                <span>20 — Very loose</span>
              </div>
            </div>
            
            {/* Auto-Select Toggle */}
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div className="space-y-1 pr-4">
                <p className="font-semibold text-sm text-on-surface">Auto-Select Lower Quality</p>
                <p className="text-xs text-on-surface-variant max-w-sm">Automatically mark lower resolution or smaller file size duplicates for deletion.</p>
              </div>
              <PremiumToggle
                checked={autoSelectLowerQuality}
                onChange={setAutoSelectLowerQuality}
              />
            </div>
          </div>
        </section>

        {/* ── Storage & Cache (Bento Area Small) ── */}
        <section className="lg:col-span-4 glass-panel rounded-xl p-6 flex flex-col justify-between group animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center border border-tertiary/20">
              <Database className="w-6 h-6 text-tertiary" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-on-surface">Storage &amp; Cache</h4>
              <p className="text-sm text-on-surface-variant">Manage local cached assets and temporary engine data.</p>
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-surface-container rounded-lg border border-outline-variant/30">
              <ImageIcon className="w-5 h-5 text-on-surface-variant flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-on-surface truncate">Thumbnail Cache</p>
                <p className="text-[10px] text-on-surface-variant">Speeds up preview loading</p>
              </div>
              <button 
                onClick={handleClearCache}
                className={cn(
                  "px-3 py-1.5 text-[10px] font-bold rounded-md transition-colors flex items-center gap-1 border border-white/10 shrink-0",
                  cacheCleared ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" : "bg-white/5 hover:bg-white/10 text-on-surface"
                )}
              >
                {cacheCleared ? (
                  <><CheckCircle className="w-3.5 h-3.5" /> Cleared</>
                ) : (
                  <><Trash2 className="w-3.5 h-3.5" /> Clear</>
                )}
              </button>
            </div>
            <p className="text-[10px] text-on-surface-variant italic px-1">Clearing cache will slightly slow down preview generation on next run.</p>
          </div>
        </section>

        {/* ── About PhotoSweep (Asymmetric/Premium) ── */}
        <section className="lg:col-span-7 glass-panel-elevated rounded-xl p-8 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary to-tertiary p-0.5 shadow-2xl shrink-0">
              <div className="w-full h-full bg-surface-container-highest rounded-[14px] flex items-center justify-center">
                <Layers className="text-primary w-12 h-12" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-2xl font-bold tracking-tight text-on-surface">PhotoSweep</h4>
                <span className="px-2 py-0.5 bg-primary text-on-primary text-[10px] font-black rounded uppercase">Pro Edition</span>
              </div>
              <p className="text-on-surface-variant text-sm mb-6">Version 1.0.0 — Build 2402.12</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-surface-container-highest text-[11px] font-medium rounded-full border border-primary/10 text-on-surface-variant">Electron</span>
                <span className="px-3 py-1 bg-surface-container-highest text-[11px] font-medium rounded-full border border-primary/10 text-on-surface-variant">React 18</span>
                <span className="px-3 py-1 bg-surface-container-highest text-[11px] font-medium rounded-full border border-primary/10 text-on-surface-variant">TypeScript</span>
                <span className="px-3 py-1 bg-surface-container-highest text-[11px] font-medium rounded-full border border-primary/10 text-on-surface-variant">Perceptual Hash</span>
                <span className="px-3 py-1 bg-surface-container-highest text-[11px] font-medium rounded-full border border-primary/10 text-on-surface-variant">SQLite</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Secondary Links (List Section) ── */}
        <section className="lg:col-span-5 flex flex-col gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button className="glass-panel hover:glass-panel-elevated transition-all duration-300 rounded-xl p-4 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                <Book className="w-5 h-5" />
              </div>
              <span className="font-medium text-on-surface">Documentation</span>
            </div>
            <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="glass-panel hover:glass-panel-elevated transition-all duration-300 rounded-xl p-4 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:text-error transition-colors">
                <Bug className="w-5 h-5" />
              </div>
              <span className="font-medium text-on-surface">Report an Issue</span>
            </div>
            <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="glass-panel hover:glass-panel-elevated transition-all duration-300 rounded-xl p-4 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:text-tertiary transition-colors">
                <History className="w-5 h-5" />
              </div>
              <span className="font-medium text-on-surface">Release Notes</span>
            </div>
            <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
          </button>
        </section>

      </div>
      
      {/* Atmospheric Background Decoration */}
      <div className="absolute bottom-0 right-0 -mr-32 -mb-32 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 -mt-32 w-64 h-64 bg-tertiary/5 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
    </div>
  )
}
