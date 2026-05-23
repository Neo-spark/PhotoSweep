import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Info } from 'lucide-react';

export const ThresholdSlider: React.FC = () => {
  const { similarityThreshold, setSimilarityThreshold } = useAppStore();

  return (
    <div className="w-full max-w-md mx-auto mt-6 card-glass p-4 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-text-primary flex items-center gap-2">
          Similarity Sensitivity
          <div className="group relative">
            <Info className="w-4 h-4 text-text-secondary hover:text-accent-cyan cursor-help transition-colors" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 card-glass text-xs text-text-secondary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl z-20">
              Higher value means looser matching (finds more "similar" images that might be different). Lower value requires images to be more identical.
            </div>
          </div>
        </label>
        <span className="text-xs font-mono text-accent-cyan px-2 py-0.5 rounded">{similarityThreshold}</span>
      </div>

      <div className="relative pt-1">
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={similarityThreshold}
          onChange={(e) => setSimilarityThreshold(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer slider-accent"
        />
        <div className="flex justify-between text-xs text-text-secondary mt-2 px-1">
          <span>Strict (Exact)</span>
          <span>Balanced</span>
          <span>Loose</span>
        </div>
      </div>
    </div>
  );
};
