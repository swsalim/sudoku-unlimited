'use client';

import { useEffect, useState } from 'react';

import { Leaf } from 'lucide-react';

interface ZenModeToastProps {
  onDismiss: () => void;
  duration?: number;
}

export function ZenModeToast({ onDismiss, duration = 4000 }: ZenModeToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, duration);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only run on mount; parent re-renders were resetting the timer
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      role="status"
      aria-live="polite">
      <div className="flex max-w-sm items-center gap-3 rounded-lg border border-green-700/30 bg-green-50 px-4 py-3 shadow-lg dark:border-green-600/30 dark:bg-green-950/80">
        <Leaf className="h-6 w-6 shrink-0 text-green-600 dark:text-green-400" />
        <div>
          <p className="font-semibold text-green-900 dark:text-green-100">Zen mode enabled</p>
          <p className="text-sm text-green-800 dark:text-green-200">
            No game over from mistakes. Take your time and solve at your own pace.
          </p>
        </div>
      </div>
    </div>
  );
}
