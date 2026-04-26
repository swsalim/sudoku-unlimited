import type { Metadata } from 'next';
import Link from 'next/link';

import { getCalendarDateStringForDaily, getDailyDifficultyForDate } from '@/lib/daily-challenge';
import { absoluteUrl } from '@/lib/utils';

import { DailyFaqSection } from '@/components/daily-faq-section';
import { SudokuGame } from '@/components/sudoku-game';

export const dynamic = 'force-dynamic';

function formatDailyDateLabel(iso: string) {
  const d = new Date(`${iso}T12:00:00.000Z`);
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(d);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Today's Sudoku Daily Challenge – Free & Same for Everyone";
  const description =
    "Play the official daily Sudoku puzzle. One new grid per day, identical for every player—no app or signup. Difficulty for today's challenge is set on a fixed date-based rotation.";

  const canonicalUrl = absoluteUrl('/daily');

  return {
    title,
    description,
    keywords: [
      'daily sudoku',
      'sudoku daily challenge',
      "today's sudoku",
      'free sudoku online',
      'daily puzzle',
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl },
    twitter: { title, description },
  };
}

export default function DailyPage() {
  const iso = getCalendarDateStringForDaily();
  const todaysDifficulty = getDailyDifficultyForDate(iso);
  const globalDailyDateLabel = formatDailyDateLabel(iso);

  return (
    <>
      <div className="border-b border-[color:var(--app-surface-border)] bg-[color:var(--app-muted-bg)]/40">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
          <h1 className="font-heading text-3xl font-black tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            Free daily Sudoku challenge
          </h1>
          <p className="mt-3 max-w-2xl text-base text-stone-600 dark:text-stone-400 sm:text-lg">
            One puzzle per day, shared by every player. The game below is seeded from
            <span className="whitespace-nowrap"> {globalDailyDateLabel} (UTC)</span> and today’s
            level is <strong className="text-stone-800 dark:text-stone-200">{todaysDifficulty}</strong>
            . Come back after midnight UTC for a new challenge (difficulty follows a set rotation from
            the date).
          </p>
        </div>
      </div>
      <SudokuGame
        initialDifficulty={todaysDifficulty}
        globalDailyMode
        globalDailyDateLabel={globalDailyDateLabel}
      />
      <article
        className="prose mt-12 max-w-none dark:prose-invert dark:bg-stone-900/50"
        aria-labelledby="daily-article">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 id="daily-article" className="font-heading text-2xl font-bold dark:text-stone-50">
            How the daily works
          </h2>
          <p>
            The daily is the same classic Sudoku rules you know, with a fixed grid for the whole
            world each UTC day. Share your time with friends knowing they’re solving the same
            pattern. Want a different level? Use{' '}
            <Link href="/medium" className="text-[color:var(--app-accent-strong)] no-underline hover:underline">
              practice by difficulty
            </Link>
            .
          </p>
        </div>
      </article>
      <DailyFaqSection />
    </>
  );
}
