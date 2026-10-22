'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import { isDailyCompleted } from '@/lib/storage/daily-progress-storage';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function DailyCalendar({
  year,
  month,
  puzzleDates,
}: {
  year: number;
  month: number;
  /** ISO dates in this month that have puzzles */
  puzzleDates: string[];
}) {
  const puzzleSet = new Set(puzzleDates);
  const firstDay = new Date(Date.UTC(year, month - 1, 1));
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const startWeekday = (firstDay.getUTCDay() + 6) % 7; // Monday = 0

  const cells: Array<{ day: number | null; iso?: string }> = [];
  for (let i = 0; i < startWeekday; i++) cells.push({ day: null });
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, iso: puzzleSet.has(iso) ? iso : undefined });
  }

  return (
    <div className="w-full max-w-lg">
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-stone-500">
        {WEEKDAYS.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, idx) => {
          if (cell.day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }
          const completed = cell.iso ? isDailyCompleted(cell.iso) : false;
          const content = (
            <span
              className={cn(
                'flex aspect-square items-center justify-center rounded-lg text-sm font-medium',
                cell.iso
                  ? 'bg-[color:var(--app-surface-bg)] ring-1 ring-[color:var(--app-surface-border)] hover:bg-green-50 dark:hover:bg-green-950/40'
                  : 'text-stone-300 dark:text-stone-600',
                completed && cell.iso && 'bg-green-100 ring-green-400 dark:bg-green-900/50 dark:ring-green-600',
              )}>
              {cell.day}
            </span>
          );
          if (cell.iso) {
            return (
              <Link key={cell.iso} href={`/daily/${cell.iso}`} className="block" title={cell.iso}>
                {content}
              </Link>
            );
          }
          return <div key={`day-${cell.day}`}>{content}</div>;
        })}
      </div>
    </div>
  );
}
