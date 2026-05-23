import { type ReactNode, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { cn } from '../lib/utils'
import {
  FolderOpen,
  BarChart3,
  Eye,
  Settings,
  Zap
} from 'lucide-react'
import type { AppView } from '../lib/types'

interface NavItem {
  id: AppView
  icon: typeof FolderOpen
  label: string
}

const navItems: NavItem[] = [
  { id: 'scan', icon: FolderOpen, label: 'Scan' },
  { id: 'results', icon: BarChart3, label: 'Results' },
  { id: 'compare', icon: Eye, label: 'Compare' },
  { id: 'settings', icon: Settings, label: 'Settings' }
]

const viewTitles: Record<AppView, string> = {
  scan: 'Scan for Duplicates',
  results: 'Duplicate Results',
  compare: 'Image Compare',
  settings: 'Settings'
}

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const [collapsed, setCollapsed] = useState(false)
  const view = useAppStore((s) => s.view)
  const setView = useAppStore((s) => s.setView)
  const scanState = useAppStore((s) => s.scanState)

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen font-sans">
      {/* ── SideNavBar ── */}
      <aside
        className={`fixed left-0 top-0 h-full z-40 bg-surface/60 backdrop-blur-[20px] border-r border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col py-6 transition-all duration-300`}
        style={{ width: collapsed ? 80 : 240 }}
      >
        <div className="px-6 mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" style={{ display: collapsed ? 'none' : undefined }}>
            PhotoSweep
          </h1>
          <p className="text-xs font-mono text-on-surface-variant opacity-70 tracking-widest uppercase mt-1" style={{ display: collapsed ? 'none' : undefined }}>
            Pro Edition
          </p>
          {/* Small logo when collapsed */}
          {collapsed && <div className="w-8 h-8 rounded bg-primary-container/80" aria-hidden />}
        </div>

        <nav role="navigation" aria-label="Main navigation" className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = view === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`${item.label} view`}
                title={item.label}
                className={cn(
                  'flex items-center gap-3 px-6 py-3 transition-all duration-300 w-full text-left',
                  isActive
                    ? 'bg-white/5 text-primary-container border-l-2 border-primary-container'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/10 hover:backdrop-blur-md active:scale-[0.98] border-l-2 border-transparent'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wide" style={{ display: collapsed ? 'none' : undefined }}>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Scan state indicator below nav */}
        <div className="px-6 mt-auto">
          {scanState === 'scanning' ? (
            <div className="w-full py-4 rounded-xl card-glass border border-primary-container flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.15)] animate-pulse">
              <div className="w-3 h-3 rounded-full bg-primary-container animate-pulse-glow" />
              <span className="text-sm font-medium text-primary-container">Scanning...</span>
            </div>
          ) : null}
        </div>
      </aside>

      {/* ── TopAppBar ── */}
      <header className="fixed top-0 right-0 h-16 z-30 bg-surface/40 backdrop-blur-[20px] border-b border-white/10 flex justify-between items-center px-8" style={{ left: collapsed ? 80 : 240, width: `calc(100% - ${collapsed ? 80 : 240}px)` }}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCollapsed((s) => !s)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="icon-btn mr-2"
          >
            {/* simple hamburger / chevron could be used; keep text for now */}
            {collapsed ? '»' : '«'}
          </button>
          <span className="text-xl font-semibold text-on-surface tracking-wide" aria-live="polite">
            {viewTitles[view]}
          </span>
        </div>
      </header>

      {/* ── Main Content Canvas ── */}
      <main className="mt-16 p-8 h-[calc(100vh-64px)] flex flex-col relative overflow-hidden" style={{ marginLeft: collapsed ? 80 : 240 }}>
        {/* Background Atmospheric Accents */}
        <div className="fixed top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="fixed bottom-[-10%] left-[5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="flex-1 overflow-hidden animate-fade-in flex flex-col relative z-0">
          {children}
        </div>
      </main>
    </div>
  )
}
