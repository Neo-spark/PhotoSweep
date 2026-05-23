import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Settings, Image, Trash2, Info, HardDrive } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  const { similarityThreshold, setSimilarityThreshold } = useAppStore();

  return (
    <div className="max-w-3xl mx-auto p-6 animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
        <p className="text-text-secondary">Configure how the AI detects and handles duplicates</p>
      </div>

      <div className="space-y-6">
        {/* Detection Settings */}
        <div className="card-glass p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-accent-cyan" />
            Detection Logic
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-text-primary">Similarity Sensitivity</label>
                <span className="text-xs font-mono text-accent-cyan px-2 py-0.5 rounded">{similarityThreshold}</span>
              </div>
              <p className="text-xs text-text-secondary mb-4">0 = Exact Matches Only. 20 = Very Loose Matches. Default is 5.</p>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-text-primary">Auto-Select Lower Quality</div>
                <div className="text-xs text-text-secondary mt-1">Automatically check the lower resolution / smaller file size duplicates for deletion.</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-cyan"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Cache Settings */}
        <div className="card-glass p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-accent-purple" />
            Storage & Cache
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 card-glass rounded-xl">
              <div className="flex items-center gap-3">
                <Image className="w-5 h-5 text-text-secondary" />
                <div>
                  <div className="text-sm font-medium text-text-primary">Thumbnail Cache</div>
                  <div className="text-xs text-text-secondary mt-0.5">Used to speed up image previews</div>
                </div>
              </div>
              <button className="btn btn-sm btn-ghost">Clear Cache</button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="card-glass p-6 flex items-start gap-4">
          <Info className="w-6 h-6 text-accent-blue flex-shrink-0" />
          <div>
            <h2 className="text-base font-semibold text-text-primary mb-1">About Duplicate Photo Cleaner AI</h2>
            <p className="text-sm text-text-secondary mb-2">Version 1.0.0</p>
            <p className="text-sm text-text-secondary">Powered by Electron, React, and perceptual hashing algorithms to safely and accurately organize your photo library.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
