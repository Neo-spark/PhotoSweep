import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { formatBytes } from '../lib/utils';
import { Image, Copy, HardDrive, Zap } from 'lucide-react';

export const ScanStats: React.FC = () => {
  const { stats } = useAppStore();

  const statCards = [
    {
      title: 'Total Scanned',
      value: stats.totalImages.toLocaleString(),
      icon: <Image className="w-5 h-5 text-blue-400" />,
      bg: 'from-blue-500/20 to-blue-600/5',
      border: 'border-blue-500/20'
    },
    {
      title: 'Duplicate Groups',
      value: stats.duplicateGroups.toLocaleString(),
      icon: <Copy className="w-5 h-5 text-purple-400" />,
      bg: 'from-purple-500/20 to-purple-600/5',
      border: 'border-purple-500/20'
    },
    {
      title: 'Wasted Space',
      value: formatBytes(stats.duplicateSize),
      icon: <HardDrive className="w-5 h-5 text-pink-400" />,
      bg: 'from-pink-500/20 to-pink-600/5',
      border: 'border-pink-500/20'
    },
    {
      title: 'Exact Matches',
      value: stats.exactDuplicates.toLocaleString(),
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      bg: 'from-cyan-500/20 to-cyan-600/5',
      border: 'border-cyan-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((card, i) => (
        <div
          key={i}
          className={`card-glass flex items-center gap-4 rounded-xl p-4 animate-fade-in ${card.border}`}
          style={{ animationDelay: `${i * 100}ms`, backgroundImage: `linear-gradient(135deg, ${card.bg})` }}
        >
          <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center backdrop-blur-md border border-white/5">
            {card.icon}
          </div>
          <div>
            <div className="text-sm text-text-secondary">{card.title}</div>
            <div className="text-2xl font-semibold text-text-primary">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  )
};
