import React from 'react'
import { useAppStore } from '../store/useAppStore'
import { formatBytes } from '../lib/utils'
import { Images, Copy, HardDrive, Zap, TrendingUp } from 'lucide-react'

interface StatCard {
  title: string
  value: string
  sub?: string
  icon: React.ReactNode
  iconBg: string
  borderClass: string
  glowColor: string
  delay: string
}

export const ScanStats: React.FC = () => {
  const { stats } = useAppStore()

  const cards: StatCard[] = [
    {
      title: 'Total Scanned',
      value: stats.totalImages.toLocaleString(),
      sub: `${stats.totalFilesScanned.toLocaleString()} files`,
      icon: <Images className="w-5 h-5 text-blue-400" />,
      iconBg: 'bg-blue-500/10',
      borderClass: 'stat-card-blue',
      glowColor: 'rgba(59,130,246,0.08)',
      delay: '0ms'
    },
    {
      title: 'Duplicate Groups',
      value: stats.duplicateGroups.toLocaleString(),
      sub: `${stats.similarImages} similar · ${stats.exactDuplicates} exact`,
      icon: <Copy className="w-5 h-5 text-violet-400" />,
      iconBg: 'bg-violet-500/10',
      borderClass: 'stat-card-violet',
      glowColor: 'rgba(124,58,237,0.08)',
      delay: '60ms'
    },
    {
      title: 'Wasted Space',
      value: formatBytes(stats.duplicateSize),
      sub: 'recoverable',
      icon: <HardDrive className="w-5 h-5 text-rose-400" />,
      iconBg: 'bg-rose-500/10',
      borderClass: 'stat-card-pink',
      glowColor: 'rgba(244,63,94,0.08)',
      delay: '120ms'
    },
    {
      title: 'Exact Matches',
      value: stats.exactDuplicates.toLocaleString(),
      sub: 'pixel-perfect copies',
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      iconBg: 'bg-cyan-500/10',
      borderClass: 'stat-card-cyan',
      glowColor: 'rgba(0,212,255,0.08)',
      delay: '180ms'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`card-glass card-lift ${card.borderClass} relative overflow-hidden animate-scale-in`}
          style={{
            animationDelay: card.delay,
            boxShadow: `0 2px 20px ${card.glowColor}, 0 1px 0 rgba(255,255,255,0.04) inset`
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: `radial-gradient(circle at 10% 50%, ${card.glowColor.replace('0.08', '0.15')} 0%, transparent 70%)` }}
          />

          <div className="relative z-10 p-4 flex items-center gap-3">
            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center flex-shrink-0 border border-white/[0.06]`}>
              {card.icon}
            </div>

            {/* Text */}
            <div className="min-w-0">
              <div className="text-[11px] text-white/40 font-medium uppercase tracking-wide mb-0.5">
                {card.title}
              </div>
              <div className="text-xl font-bold text-white tabular-nums leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {card.value}
              </div>
              {card.sub && (
                <div className="text-[10px] text-white/30 mt-0.5 truncate">
                  {card.sub}
                </div>
              )}
            </div>
          </div>

          {/* Trend bar (decorative) */}
          <div className="absolute bottom-0 right-0 p-2 opacity-20">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
        </div>
      ))}
    </div>
  )
}
