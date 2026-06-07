import type { ReactNode } from 'react'
import { useAppStore } from '../store/useAppStore'
import { cn } from '../lib/utils'
import {
  FolderSearch,
  BarChart3,
  GitCompare,
  Settings2,
  Bell,
  HelpCircle,
  Zap,
  Layers,
  Sparkles,
  Search as SearchIcon
} from 'lucide-react'
import type { AppView } from '../lib/types'

interface NavItem {
  id: AppView
  icon: typeof FolderSearch
  label: string
}

const navItems: NavItem[] = [
  { id: 'scan',     icon: FolderSearch, label: 'Dashboard' },
  { id: 'results',  icon: BarChart3,    label: 'Results'   },
  { id: 'compare',  icon: GitCompare,   label: 'Compare'   },
  { id: 'settings', icon: Settings2,    label: 'Settings'  }
]

const viewTitles: Record<AppView, { label: string; icon: typeof FolderSearch }> = {
  scan:     { label: 'Intelligent Scan',  icon: FolderSearch },
  results:  { label: 'Duplicate Results', icon: BarChart3    },
  compare:  { label: 'Image Compare',     icon: GitCompare   },
  settings: { label: 'Settings',          icon: Settings2    }
}

interface LayoutProps { children: ReactNode }

export function Layout({ children }: LayoutProps): JSX.Element {
  const view      = useAppStore((s) => s.view)
  const setView   = useAppStore((s) => s.setView)
  const scanState = useAppStore((s) => s.scanState)

  const TitleIcon = viewTitles[view].icon

  return (
    // Outer shell: full-screen horizontal flex — sidebar + right panel sit side by side
    <div className="flex h-screen overflow-hidden bg-background text-on-surface font-body select-none">

      {/* ══ SIDEBAR — flex child, not fixed, never overlaps ══ */}
      <aside className="flex-shrink-0 flex flex-col w-64 h-screen py-6 px-4 border-r border-primary/10 bg-surface/60 backdrop-blur-xl shadow-[0_0_30px_rgba(125,211,252,0.05)]">

        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-10 drag-region">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center glacier-glow border border-primary/30">
            <Layers className="w-5 h-5 text-primary" strokeWidth={2.5} />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-xl font-headline font-semibold tracking-tight text-primary">PhotoSweep</h1>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">AI Image Engine</p>
          </div>
        </div>

        {/* Nav */}
        <nav role="navigation" className="flex-1 space-y-1 no-drag">
          {navItems.map((item) => {
            const isActive = view === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 active:scale-95 text-left',
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-primary/5'
                )}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto pt-6 border-t border-primary/10 no-drag">
          <button
            className="w-full py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
            onClick={() => setView('scan')}
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Clean Now</span>
          </button>

          <div className="mt-6 flex items-center gap-3 px-2">
            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-primary/20 bg-surface-container flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-tertiary/20 flex items-center justify-center text-xs font-bold text-primary">
                AR
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">Alex Rivers</p>
              <p className="text-xs text-on-surface-variant truncate">Pro Edition</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ══ RIGHT PANEL — header + scrollable content, takes remaining width ══ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar — flex-shrink-0 so it never scrolls away */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 h-16 border-b border-primary/10 bg-surface-dim/60 backdrop-blur-2xl z-10 drag-region">
          <div className="flex items-center gap-4 no-drag">
            <TitleIcon className="w-5 h-5 text-primary" strokeWidth={2.5} />
            <h2 className="text-lg font-bold text-primary font-headline">{viewTitles[view].label}</h2>
          </div>

          <div className="flex items-center gap-6 no-drag">
            {/* Search */}
            <div className="relative hidden lg:block">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search gallery..."
                className="bg-surface-container-low border border-primary/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/50 focus:border-primary/50 w-52 transition-all text-on-surface placeholder:text-on-surface-variant outline-none"
              />
            </div>

            {/* Icon buttons */}
            <div className="flex items-center gap-3">
              <button className="relative text-on-surface-variant hover:text-primary transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full border-2 border-surface-dim" />
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>

              {/* Start Scan CTA */}
              <button
                className="bg-primary text-on-primary px-5 py-1.5 rounded-full text-sm font-bold hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
                onClick={() => {
                  const s = useAppStore.getState()
                  if (s.scanState === 'idle') s.startScan()
                }}
              >
                {scanState === 'scanning' ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin-slow" />
                    Scanning...
                  </>
                ) : (
                  'Start Scan'
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Page content — scrolls independently */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
