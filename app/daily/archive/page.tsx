import type { Metadata } from 'next';
import Link from 'next/link';

import { DAILY_ARCHIVE_START_DATE } from '@/lib/daily/constants';
import { formatDailyDateLabel, formatMonthYearLabel } from '@/lib/daily/format';
import { getAllDailyPuzzleDates, getTodayDailyIso } from '@/lib/daily/puzzle-store';
import { openGraphImages, twitterImages } from '@/lib/open-graph';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { DailyArchiveSchemaScript } from '@/components/daily/daily-archive-schema-script';
import { DailyBreadcrumbs } from '@/components/daily/daily-breadcrumbs';
import type { DailyArchiveMonthGroup } from '@/lib/schema/daily-archive-schema';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Daily Sudoku archive – every past puzzle';
  const description =
    'Browse the full archive of daily Sudoku puzzles on Sudoku Unlimited. One shared grid per UTC day since April 2026.';
  const canonicalUrl = absoluteUrl('/daily/archive');
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, images: openGraphImages },
    twitter: { title, description, ...twitterImages },
  };
}

function groupDatesByMonth(dates: string[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const d of dates) {
    const key = d.slice(0, 7);
    const list = map.get(key) ?? [];
    list.push(d);
    map.set(key, list);
  }
  return map;
}

function buildMonthGroups(dates: string[]): DailyArchiveMonthGroup[] {
  const byMonth = groupDatesByMonth(dates);
  return [...byMonth.keys()]
    .sort()
    .reverse()
    .map((ym) => {
      const [y, m] = ym.split('-').map(Number);
      return { year: y, month: m, dates: byMonth.get(ym) ?? [] };
    });
}

export default function DailyArchivePage() {
  const dates = getAllDailyPuzzleDates().filter((d) => d <= getTodayDailyIso());
  const byMonth = groupDatesByMonth(dates);
  const monthKeys = [...byMonth.keys()].sort().reverse();
  const monthGroups = buildMonthGroups(dates);

  return (
    <>
      <DailyArchiveSchemaScript monthGroups={monthGroups} />
      <Container className="py-10">
      <DailyBreadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Daily', href: '/daily' },
          { label: 'Archive' },
        ]}
        className="mb-6"
      />
      <h1 className="font-heading text-3xl font-black dark:text-stone-50">Daily Sudoku archive</h1>
      <p className="mt-2 max-w-2xl text-stone-600 dark:text-stone-400">
        Every official daily puzzle since {formatDailyDateLabel(DAILY_ARCHIVE_START_DATE)} is saved here permanently.
        Puzzles use UTC calendar days and never change after publication.
      </p>
      <p className="mt-4">
        <Link href="/daily" className="font-semibold text-[color:var(--app-accent-strong)] hover:underline">
          Play today&apos;s daily →
        </Link>
      </p>
      <div className="mt-10 space-y-10">
        {monthKeys.map((ym) => {
          const [y, m] = ym.split('-').map(Number);
          const monthDates = byMonth.get(ym) ?? [];
          return (
            <section key={ym} aria-labelledby={`archive-${ym}`}>
              <h2 id={`archive-${ym}`} className="font-heading text-xl font-bold dark:text-stone-50">
                <Link
                  href={`/daily/${y}/${String(m).padStart(2, '0')}`}
                  className="text-[color:var(--app-accent-strong)] hover:underline">
                  {formatMonthYearLabel(y, m)}
                </Link>
              </h2>
              <ul className="mt-3 columns-2 gap-x-6 text-sm sm:columns-3 md:columns-4">
                {[...monthDates].reverse().map((d) => (
                  <li key={d} className="mb-1.5 break-inside-avoid">
                    <Link href={`/daily/${d}`} className="text-stone-700 hover:underline dark:text-stone-300">
                      {formatDailyDateLabel(d)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Container>
    </>
  );
}

export const revalidate = 86_400;
