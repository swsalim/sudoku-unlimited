import Link from 'next/link';

import { formatDailyDateLabel } from '@/lib/daily/format';

export function DailyDayNav({
  isoDate,
  previousDate,
  nextDate,
}: {
  isoDate: string;
  previousDate: string | null;
  nextDate: string | null;
}) {
  const label = formatDailyDateLabel(isoDate);
  return (
    <nav
      className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Adjacent daily puzzles">
      {previousDate ? (
        <Link
          href={`/daily/${previousDate}`}
          className="text-sm font-semibold text-[color:var(--app-accent-strong)] hover:underline">
          ← {formatDailyDateLabel(previousDate)}
        </Link>
      ) : (
        <span className="text-sm text-stone-400">Start of archive</span>
      )}
      <span className="text-center text-sm font-medium text-stone-600 dark:text-stone-400">{label}</span>
      {nextDate ? (
        <Link
          href={`/daily/${nextDate}`}
          className="text-right text-sm font-semibold text-[color:var(--app-accent-strong)] hover:underline sm:text-left">
          {formatDailyDateLabel(nextDate)} →
        </Link>
      ) : (
        <span className="text-right text-sm text-stone-400 sm:text-left">Latest puzzle</span>
      )}
    </nav>
  );
}
