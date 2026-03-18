'use client';

import { useEffect, useState } from 'react';

import { getAchievementById } from '@/lib/achievements/utils';

interface AchievementToastProps {
  achievementIds: string[];
  onDismiss: () => void;
  duration?: number;
}

export function AchievementToast({
  achievementIds,
  onDismiss,
  duration = 3000,
}: AchievementToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  if (achievementIds.length === 0) return null;

  const first = getAchievementById(achievementIds[0]);
  if (!first) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      role="alert"
      aria-live="polite">
      <div className="flex items-center gap-3 rounded-lg border border-green-700/30 bg-green-50 px-4 py-3 shadow-lg dark:border-green-600/30 dark:bg-green-950/80">
        <span className="text-2xl">{first.icon}</span>
        <div>
          <p className="font-semibold text-green-900 dark:text-green-100">
            Achievement Unlocked!
          </p>
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            {first.name}
          </p>
          <p className="text-xs text-green-700 dark:text-green-300">
            {first.description}
          </p>
        </div>
        {achievementIds.length > 1 && (
          <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-200">
            +{achievementIds.length - 1} more
          </span>
        )}
      </div>
    </div>
  );
}
