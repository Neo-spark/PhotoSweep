import React, { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import {
  Sliders,
  HardDrive,
  Info,
  Image,
  Trash2,
  Shield,
  Cpu,
  Sparkles,
  ChevronRight
} from 'lucide-react'

interface SettingsSectionProps {
  icon: React.ElementType
  iconColor: string
  iconBg: string
  title: string
  description?: string
  children: React.ReactNode
}

function SettingsSection({ icon: Icon, iconColor, iconBg, title, description, children }: SettingsSectionProps) {
  return (
    <div className="card-glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
        <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0 border border-white/[0.06]`}>
          <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white/80" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{title}</h2>
          {description && <p className="text-xs text-white/35 mt-0.5">{description}</p>}
        </div>
      </div>
      {/* Body */}
      <div className="p-5 space-y-5">
        {children}
      </div>
    </div>
  )
}

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
    <div className="h-full overflow-y-auto px-6 py-6 scrollbar-thin animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* ── Page header ── */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold gradient-text mb-1.5" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Settings
          </h1>
          <p className="text-sm text-white/35">Configure how PhotoSweep AI detects and handles duplicates</p>
        </div>

        {/* ── Detection ── */}
        <div className="animate-slide-up" style={{ animationDelay: '0.05s' }}>
          <SettingsSection
            icon={Cpu}
            iconColor="text-cyan-400"
            iconBg="bg-cyan-500/10"
            title="Detection Engine"
            description="Control similarity threshold and auto-selection"
          >
            {/* Threshold slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-white/70">Similarity Threshold</label>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 tabular-nums">
                    {similarityThreshold}
                  </span>
                </div>
              </div>
              <p className="text-xs text-white/35 mb-3">{thresholdLabel}</p>
              <input
                type="range"
                min="0" max="20" step="1"
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(parseInt(e.target.value, 10))}
                className="w-full"
                aria-label="Similarity threshold"
              />
              <div className="flex justify-between text-[10px] text-white/20 mt-1 font-medium">
                <span>0 — Exact only</span>
                <span>10 — Balanced</span>
                <span>20 — Very loose</span>
              </div>
            </div>

            {/* Auto select toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <div>
                <div className="text-sm font-medium text-white/70">Auto-Select Lower Quality</div>
                <div className="text-xs text-white/35 mt-0.5">
                  Automatically mark lower resolution / smaller duplicates for deletion
                </div>
              </div>
              <PremiumToggle
                checked={autoSelectLowerQuality}
                onChange={setAutoSelectLowerQuality}
              />
            </div>
          </SettingsSection>
        </div>

        {/* ── Storage & Cache ── */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <SettingsSection
            icon={HardDrive}
            iconColor="text-violet-400"
            iconBg="bg-violet-500/10"
            title="Storage & Cache"
            description="Manage cached data and temporary files"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                  <Image className="w-4 h-4 text-white/30" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white/70">Thumbnail Cache</div>
                  <div className="text-xs text-white/30 mt-0.5">Speeds up image preview loading</div>
                </div>
              </div>
              <button
                onClick={handleClearCache}
                className={`btn btn-sm ${cacheCleared ? 'btn-ghost text-emerald-400 border-emerald-500/20' : 'btn-ghost'}`}
                aria-label="Clear thumbnail cache"
              >
                {cacheCleared ? (
                  <><Shield className="w-3.5 h-3.5" /> Cleared!</>
                ) : (
                  <><Trash2 className="w-3.5 h-3.5" /> Clear Cache</>
                )}
              </button>
            </div>
          </SettingsSection>
        </div>

        {/* ── About ── */}
        <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <SettingsSection
            icon={Info}
            iconColor="text-blue-400"
            iconBg="bg-blue-500/10"
            title="About PhotoSweep"
            description="Version and technology information"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#00d4ff)' }}>
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white/80 mb-0.5">PhotoSweep AI</div>
                <div className="text-xs text-white/35 mb-3">Version 1.0.0 · Pro Edition</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Electron', 'React 18', 'TypeScript', 'Perceptual Hash', 'SQLite'].map(tech => (
                    <span key={tech} className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-white/40 bg-white/[0.04] border border-white/[0.06]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="pt-2 border-t border-white/[0.06] space-y-1">
              {['Documentation', 'Report an Issue', 'Release Notes'].map(link => (
                <button key={link} className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/[0.03] text-sm text-white/40 hover:text-white/60 transition-colors group">
                  <span>{link}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </SettingsSection>
        </div>

      </div>
    </div>
  )
}
