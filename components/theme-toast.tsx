'use client';

import { useEffect, useState } from 'react';

import { getThemeById, type ThemeId } from '@/lib/themes/themes';

interface ThemeToastProps {
  themeIds: string[];
  onDismiss: () => void;
  duration?: number;
}

export function ThemeToast({ themeIds, onDismiss, duration = 3000 }: ThemeToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  if (themeIds.length === 0) return null;

  const first = getThemeById(themeIds[0] as ThemeId);

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      role="alert"
      aria-live="polite">
      <div className="flex items-center gap-3 rounded-lg border border-violet-700/30 bg-violet-50 px-4 py-3 shadow-lg dark:border-violet-600/30 dark:bg-violet-950/80">
        <span className="text-2xl">🎨</span>
        <div>
          <p className="font-semibold text-violet-900 dark:text-violet-100">Theme Unlocked!</p>
          <p className="text-sm font-medium text-violet-800 dark:text-violet-200">{first.name}</p>
          <p className="text-xs text-violet-700 dark:text-violet-300">{first.description}</p>
        </div>
        {themeIds.length > 1 && (
          <span className="rounded-full bg-violet-200 px-2 py-0.5 text-xs font-medium text-violet-800 dark:bg-violet-800 dark:text-violet-200">
            +{themeIds.length - 1} more
          </span>
        )}
      </div>
    </div>
  );
}

