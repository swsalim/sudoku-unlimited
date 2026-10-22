import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { formatDailyPageTitle, formatMonthYearLabel } from '@/lib/daily/format';
import {
  getDailyPuzzle,
  getDatesInMonth,
  getNextDailyDate,
  getPreviousDailyDate,
  getStaticDailyDates,
  getTodayDailyIso,
  hasDailyPuzzle,
  isBeforeArchiveStart,
  isFutureDailyDate,
} from '@/lib/daily/puzzle-store';
import { DAILY_ARCHIVE_START_DATE } from '@/lib/daily/constants';
import { openGraphImages, twitterImages } from '@/lib/open-graph';
import { absoluteUrl } from '@/lib/utils';

import { DailyFaqSection } from '@/components/daily-faq-section';
import { DailyMonthView, parseYearMonth } from '@/components/daily/daily-month-view';
import { DailyPuzzleShell } from '@/components/daily/daily-puzzle-shell';

import type { Difficulty } from '@/types';

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

type PageProps = { params: Promise<{ slug?: string[] }> };

function resolveSlug(slug?: string[]): 'dated' | 'month' | null {
  if (!slug || slug.length === 0) return null;
  if (slug.length === 1 && ISO_DATE_RE.test(slug[0])) return 'dated';
  if (slug.length === 2 && parseYearMonth(slug[0], slug[1])) return 'month';
  return null;
}

export async function generateStaticParams() {
  const dates = getStaticDailyDates();
  const dateParams = dates.map((date) => ({ slug: [date] }));
  const monthKeys = new Set(dates.map((d) => d.slice(0, 7)));
  const monthParams = [...monthKeys].map((ym) => {
    const [y, m] = ym.split('-');
    return { slug: [y, m] };
  });
  return [...dateParams, ...monthParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const kind = resolveSlug(slug);
  if (kind === 'dated' && slug?.[0]) {
    const date = slug[0];
    if (isBeforeArchiveStart(date) || isFutureDailyDate(date) || !hasDailyPuzzle(date)) {
      return { title: 'Daily Sudoku' };
    }
    const record = getDailyPuzzle(date)!;
    const title = formatDailyPageTitle(date, record.difficulty as Difficulty);
    const description = `Free ${record.difficulty} daily Sudoku for ${date}: ${record.clueCount} givens, same puzzle for every player. Replay this archived grid anytime.`;
    const canonicalUrl = absoluteUrl(`/daily/${date}`);
    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: { title, description, url: canonicalUrl, images: openGraphImages },
      twitter: { title, description, ...twitterImages },
    };
  }
  if (kind === 'month' && slug?.[0] && slug?.[1]) {
    const parsed = parseYearMonth(slug[0], slug[1]);
    if (!parsed) return { title: 'Daily calendar' };
    const label = formatMonthYearLabel(parsed.year, parsed.month);
    const title = `Daily Sudoku calendar – ${label}`;
    const description = `Browse archived daily Sudoku puzzles for ${label}. Completed days are highlighted when you play on this device.`;
    const canonicalUrl = absoluteUrl(`/daily/${slug[0]}/${slug[1]}`);
    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: { title, description, url: canonicalUrl, images: openGraphImages },
      twitter: { title, description, ...twitterImages },
    };
  }
  return { title: 'Daily Sudoku' };
}

export default async function DailySlugPage({ params }: PageProps) {
  const { slug } = await params;
  const kind = resolveSlug(slug);

  if (kind === 'dated' && slug?.[0]) {
    const date = slug[0];
    if (isBeforeArchiveStart(date) || isFutureDailyDate(date) || !hasDailyPuzzle(date)) {
      notFound();
    }
    const record = getDailyPuzzle(date);
    if (!record) notFound();
    const today = getTodayDailyIso();

    return (
      <>
        <DailyPuzzleShell
          isoDate={date}
          record={record}
          isToday={date === today}
          previousDate={getPreviousDailyDate(date)}
          nextDate={getNextDailyDate(date)}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Daily', href: '/daily' },
            { label: 'Archive', href: '/daily/archive' },
            { label: formatDailyPageTitle(date, record.difficulty as Difficulty) },
          ]}
        />
        <DailyFaqSection />
      </>
    );
  }

  if (kind === 'month' && slug?.[0] && slug?.[1]) {
    const parsed = parseYearMonth(slug[0], slug[1]);
    if (!parsed) notFound();
    const monthPrefix = `${parsed.year}-${String(parsed.month).padStart(2, '0')}`;
    if (monthPrefix < DAILY_ARCHIVE_START_DATE.slice(0, 7)) notFound();
    if (getDatesInMonth(parsed.year, parsed.month).length === 0) notFound();
    return <DailyMonthView year={parsed.year} month={parsed.month} />;
  }

  notFound();
}

export const revalidate = 86_400;
export const dynamicParams = true;
