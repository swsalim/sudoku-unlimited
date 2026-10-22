'use client';

import { useEffect, useState } from 'react';

import { Flame } from 'lucide-react';

import { getCalendarDateStringForDaily } from '@/lib/daily-challenge';
import {
  computeStreakThroughDate,
  getCompletedDailyDates,
  getDailyStreak,
} from '@/lib/storage/daily-progress-storage';

export function DailyStreakBadge() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const refresh = () => {
      const completed = getCompletedDailyDates();
      const today = getCalendarDateStringForDaily();
      const computed = computeStreakThroughDate(completed, today);
      const stored = getDailyStreak().current;
      setStreak(Math.max(computed, stored));
    };
    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('sudoku-daily-completed', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('sudoku-daily-completed', refresh);
    };
  }, []);

  if (streak < 1) return null;

  return (
    <p className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900 dark:bg-amber-950/60 dark:text-amber-100">
      <Flame className="h-4 w-4" aria-hidden />
      {streak}-day streak
    </p>
  );
}
