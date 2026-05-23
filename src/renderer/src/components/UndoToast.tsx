import React, { useEffect, useState } from 'react';
import { Undo, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const UndoToast: React.FC = () => {
  const { undoStack, popDeleteOp } = useAppStore();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  const latestEntry = undoStack[undoStack.length - 1];

  useEffect(() => {
    if (latestEntry) {
      setVisible(true);
      setProgress(100);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setVisible(false);
            return 0;
          }
          return prev - (100 / 100); // 10 seconds (100 steps of 100ms)
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setVisible(false);
    }
  }, [latestEntry]);

  if (!visible || !latestEntry) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="toast">
        <div className="flex items-center justify-between p-3">
          <div className="text-sm text-text-secondary">
            Moved <span className="text-text-primary font-medium">{latestEntry.deletedCount}</span> files to recycle bin.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                setVisible(false);
                const op = popDeleteOp();
                if (op) {
                  await window.api?.undoDelete(op.undoId);
                  // Note: backend restored files; UI may need a rescan to refresh results.
                }
              }}
              className="btn btn-sm btn-ghost flex items-center gap-1.5"
            >
              <Undo className="w-3.5 h-3.5" />
              Undo
            </button>
            <button
              onClick={() => setVisible(false)}
              className="icon-btn"
              aria-label="Dismiss undo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="h-1 bg-black/20 w-full">
          <div
            className="h-full bg-accent-cyan transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
};
