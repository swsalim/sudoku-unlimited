import type { Metadata } from 'next';
import Link from 'next/link';

import { formatDailyDateLong, formatDailyPageTitle } from '@/lib/daily/format';
import { getDailyPuzzle, getNextDailyDate, getPreviousDailyDate, getTodayDailyIso } from '@/lib/daily/puzzle-store';
import { openGraphImages, twitterImages } from '@/lib/open-graph';
import { absoluteUrl } from '@/lib/utils';

import { DailyFaqSection } from '@/components/daily-faq-section';
import { DailyPuzzleShell } from '@/components/daily/daily-puzzle-shell';
import { DailySchemaScript } from '@/components/schemas';

import type { Difficulty } from '@/types';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const iso = getTodayDailyIso();
  const record = getDailyPuzzle(iso);
  const title = record
    ? formatDailyPageTitle(iso, record.difficulty as Difficulty)
    : "Today's Sudoku Daily Challenge – Free & Same for Everyone";
  const description = record
    ? `Play today's official ${record.difficulty} daily Sudoku (${record.clueCount} givens). Same grid for every player—no signup.`
    : "Play the official daily Sudoku puzzle. One new grid per UTC day, identical for every player—no app or signup.";

  const canonicalUrl = absoluteUrl('/daily');

  return {
    title: record ? `Today's ${title}` : title,
    description,
    keywords: [
      'daily sudoku',
      'sudoku daily challenge',
      "today's sudoku",
      'free sudoku online',
      'daily puzzle',
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, images: openGraphImages },
    twitter: { title, description, ...twitterImages },
  };
}

export default function DailyPage() {
  const iso = getTodayDailyIso();
  const record = getDailyPuzzle(iso);
  if (!record) {
    return (
      <p className="p-8 text-center">
        Today&apos;s puzzle is not available yet.{' '}
        <Link href="/daily/archive" className="underline">Browse the archive</Link>.
      </p>
    );
  }

  return (
    <>
      <DailySchemaScript />
      <DailyPuzzleShell
        isoDate={iso}
        record={record}
        isToday
        previousDate={getPreviousDailyDate(iso)}
        nextDate={getNextDailyDate(iso)}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Daily Challenge' },
        ]}
      />
      <article
        className="prose mt-12 max-w-none dark:prose-invert dark:bg-stone-900/50"
        aria-labelledby="daily-article">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 id="daily-article" className="font-heading text-2xl font-bold dark:text-stone-50">
            How the daily works
          </h2>
          <p>
            The daily is the same classic Sudoku rules you know, with a fixed grid for the whole world each UTC
            day. Your progress is saved per date on this device. Browse the{' '}
            <Link href="/daily/archive" className="text-[color:var(--app-accent-strong)] no-underline hover:underline">
              full archive
            </Link>{' '}
            or open the permanent page for today:{' '}
            <Link href={`/daily/${iso}`} className="text-[color:var(--app-accent-strong)] no-underline hover:underline">
              {formatDailyDateLong(iso)}
            </Link>
            .
          </p>
        </div>
      </article>
      <DailyFaqSection />
    </>
  );
}
