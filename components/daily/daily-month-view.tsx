import Link from 'next/link';

import { formatMonthYearLabel } from '@/lib/daily/format';
import { getDatesInMonth, getTodayDailyIso } from '@/lib/daily/puzzle-store';

import { Container } from '@/components/container';
import { DailyBreadcrumbs } from '@/components/daily/daily-breadcrumbs';
import { DailyCalendar } from '@/components/daily/daily-calendar';
import { DailyMonthSchemaScript } from '@/components/daily/daily-month-schema-script';

export function parseYearMonth(year: string, month: string): { year: number; month: number } | null {
  const y = Number(year);
  const m = Number(month);
  if (!Number.isInteger(y) || !Number.isInteger(m) || m < 1 || m > 12) return null;
  return { year: y, month: m };
}

export function DailyMonthView({ year, month }: { year: number; month: number }) {
  const puzzleDates = getDatesInMonth(year, month);
  const label = formatMonthYearLabel(year, month);
  const today = getTodayDailyIso();
  return (
    <>
      <DailyMonthSchemaScript year={year} month={month} puzzleDates={puzzleDates} />
      <Container className="py-10">
      <DailyBreadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Daily', href: '/daily' },
          { label: 'Archive', href: '/daily/archive' },
          { label: label },
        ]}
        className="mb-6"
      />
      <h1 className="font-heading text-3xl font-black dark:text-stone-50">Daily Sudoku – {label}</h1>
      <p className="mt-2 max-w-xl text-stone-600 dark:text-stone-400">
        Tap a highlighted day to play that archived puzzle. Green cells mark days you&apos;ve completed on this
        device.
      </p>
      <div className="mt-8">
        <DailyCalendar year={year} month={month} puzzleDates={puzzleDates} />
      </div>
      <p className="mt-8 text-sm text-stone-600 dark:text-stone-400">
        <Link href="/daily" className="font-semibold text-[color:var(--app-accent-strong)] hover:underline">
          Today&apos;s puzzle ({today})
        </Link>
        {' · '}
        <Link href="/daily/archive" className="font-semibold text-[color:var(--app-accent-strong)] hover:underline">
          Full archive
        </Link>
      </p>
    </Container>
    </>
  );
}
