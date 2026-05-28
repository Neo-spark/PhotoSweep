import type { ReactNode } from 'react'
import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { cn } from '../lib/utils'
import {
  FolderSearch,
  BarChart3,
  GitCompare,
  Settings2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HardDrive,
  Images,
  Zap
} from 'lucide-react'
import type { AppView } from '../lib/types'

interface NavItem {
  id: AppView
  icon: typeof FolderSearch
  label: string
  description: string
}

const navItems: NavItem[] = [
  { id: 'scan',     icon: FolderSearch, label: 'Scan',     description: 'Select & scan folders' },
  { id: 'results',  icon: BarChart3,    label: 'Results',  description: 'View duplicates'        },
  { id: 'compare',  icon: GitCompare,   label: 'Compare',  description: 'Side-by-side compare'   },
  { id: 'settings', icon: Settings2,    label: 'Settings', description: 'Configure detection'    }
]

const viewTitles: Record<AppView, { label: string; icon: typeof FolderSearch }> = {
  scan:     { label: 'Scan for Duplicates', icon: FolderSearch },
  results:  { label: 'Duplicate Results',   icon: BarChart3    },
  compare:  { label: 'Image Compare',       icon: GitCompare   },
  settings: { label: 'Settings',            icon: Settings2    }
}

interface LayoutProps { children: ReactNode }

export function Layout({ children }: LayoutProps): JSX.Element {
  const [collapsed, setCollapsed] = useState(false)
  const view      = useAppStore((s) => s.view)
  const setView   = useAppStore((s) => s.setView)
  const scanState = useAppStore((s) => s.scanState)
  const stats     = useAppStore((s) => s.stats)

  const W = collapsed ? 72 : 240

  const TitleIcon = viewTitles[view].icon

  return (
    <div className="bg-bg-base text-on-surface min-h-screen font-sans overflow-hidden select-none">

      {/* ══ SIDEBAR ══════════════════════════════════════ */}
      <aside
        style={{ width: W }}
        className={cn(
          'fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300 ease-out',
          'gradient-sidebar border-r border-white/[0.06] shadow-sidebar'
        )}
      >
        {/* Logo */}
        <div className="relative px-4 py-5 flex items-center gap-3 overflow-hidden">
          {/* Glow behind logo */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-600/10 via-cyan-500/5 to-transparent pointer-events-none" />

          <div className="relative z-10 flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#00d4ff)' }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>

          {!collapsed && (
            <div className="relative z-10 overflow-hidden">
              <h1 className="text-base font-bold gradient-text-violet leading-tight">
                PhotoSweep
              </h1>
              <span className="text-[9px] uppercase tracking-[0.18em] text-white/30 font-medium">
                AI Pro Edition
              </span>
            </div>
          )}
        </div>

        <div className="mx-3 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-3" />

        {/* Nav */}
        <nav role="navigation" aria-label="Main navigation" className="flex-1 flex flex-col gap-0.5 px-2">
          {navItems.map((item) => {
            const isActive = view === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.description}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left',
                  'transition-all duration-200 ease-out',
                  isActive
                    ? 'bg-white/[0.07] nav-active-glow text-white'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-gradient-to-b from-cyan-400 to-violet-500" />
                )}

                <Icon className={cn(
                  'w-[18px] h-[18px] flex-shrink-0 transition-colors',
                  isActive ? 'text-cyan-400' : 'text-inherit'
                )} />

                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <div className={cn(
                      'text-sm font-medium leading-none',
                      isActive ? 'text-white' : 'text-white/60'
                    )}>
                      {item.label}
                    </div>
                  </div>
                )}

                {/* Active dot when collapsed */}
                {isActive && collapsed && (
                  <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00d4ff]" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-4 mt-auto space-y-2">
          {/* Mini stats (when not collapsed) */}
          {!collapsed && stats.totalImages > 0 && (
            <div className="card-glass p-3 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-white/40">
                  <Images className="w-3 h-3" />
                  <span>Scanned</span>
                </div>
                <span className="text-white/70 font-semibold tabular-nums">
                  {stats.totalImages.toLocaleString()}
                </span>
              </div>
              {stats.duplicateSize > 0 && (
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-white/40">
                    <HardDrive className="w-3 h-3" />
                    <span>Recoverable</span>
                  </div>
                  <span className="text-cyan-400 font-semibold">
                    {stats.duplicateSize > 1073741824
                      ? `${(stats.duplicateSize / 1073741824).toFixed(1)} GB`
                      : `${(stats.duplicateSize / 1048576).toFixed(0)} MB`}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Scan state */}
          {scanState === 'scanning' && (
            <div className={cn(
              'flex items-center gap-2 px-3 py-2.5 rounded-xl',
              'bg-cyan-500/10 border border-cyan-500/20',
              !collapsed && 'animate-pulse'
            )}>
              <Zap className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 animate-spin-slow" />
              {!collapsed && (
                <span className="text-xs font-medium text-cyan-400">Scanning…</span>
              )}
            </div>
          )}

          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(s => !s)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="w-full flex items-center justify-center py-2 rounded-xl text-white/25 hover:text-white/60 hover:bg-white/[0.04] transition-all duration-200"
          >
            {collapsed
              ? <ChevronRight className="w-4 h-4" />
              : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* ══ TOP HEADER ════════════════════════════════════ */}
      <header
        style={{ left: W, width: `calc(100% - ${W}px)` }}
        className={cn(
          'fixed top-0 right-0 h-14 z-30 flex items-center justify-between px-6',
          'bg-bg-secondary/70 backdrop-blur-2xl border-b border-white/[0.06]',
          'transition-all duration-300 ease-out drag-region'
        )}
      >
        {/* Left: title */}
        <div className="flex items-center gap-2.5 no-drag">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08]">
            <TitleIcon className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <span className="text-sm font-semibold text-white/80 tracking-wide" aria-live="polite">
            {viewTitles[view].label}
          </span>
        </div>

        {/* Right: status chip */}
        <div className="flex items-center gap-3 no-drag">
          {scanState === 'complete' && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Scan Complete
            </div>
          )}
          {scanState === 'scanning' && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-semibold text-cyan-400 animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              Scanning
            </div>
          )}

          {/* Avatar */}
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#00d4ff)' }}>
            PS
          </div>
        </div>
      </header>

      {/* ══ MAIN CANVAS ═══════════════════════════════════ */}
      <main
        style={{ marginLeft: W }}
        className="mt-14 h-[calc(100vh-56px)] flex flex-col relative overflow-hidden transition-all duration-300 ease-out"
      >
        {/* Atmospheric background orbs */}
        <div className="fixed pointer-events-none -z-10">
          <div
            className="absolute rounded-full blur-[140px] opacity-40"
            style={{
              width: 500, height: 500,
              top: '-15%', right: '-8%',
              background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, rgba(124,58,237,0.06) 60%, transparent 100%)',
              animation: 'orb-drift 14s ease-in-out infinite'
            }}
          />
          <div
            className="absolute rounded-full blur-[120px] opacity-30"
            style={{
              width: 400, height: 400,
              bottom: '-10%', left: '3%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, rgba(0,212,255,0.05) 60%, transparent 100%)',
              animation: 'orb-drift 18s ease-in-out infinite reverse'
            }}
          />
        </div>

        <div className="flex-1 overflow-hidden animate-fade-in flex flex-col relative z-0">
          {children}
        </div>
      </main>
    </div>
  )
}
