import Image from 'next/image';
import Link from 'next/link';

import type { DailyPuzzleRecord } from '@/lib/daily/types';
import { formatDailyDateLong, formatDailyPageTitle } from '@/lib/daily/format';
import { DAILY_CHALLENGE_TIMEZONE_POLICY } from '@/lib/daily-challenge';

import { Container } from '@/components/container';
import { DailyBreadcrumbs } from '@/components/daily/daily-breadcrumbs';
import { DailyDayNav } from '@/components/daily/daily-day-nav';
import { DailyPuzzleSchemaScript } from '@/components/daily/daily-puzzle-schema-script';
import { DailySolutionPanel } from '@/components/daily/daily-solution-panel';
import { DailyStreakBadge } from '@/components/daily/daily-streak-badge';
import { SudokuGame } from '@/components/sudoku-game';

import type { Difficulty } from '@/types';

export function DailyPuzzleShell({
  isoDate,
  record,
  isToday,
  previousDate,
  nextDate,
  breadcrumbs,
}: {
  isoDate: string;
  record: DailyPuzzleRecord;
  isToday: boolean;
  previousDate: string | null;
  nextDate: string | null;
  breadcrumbs: { label: string; href?: string }[];
}) {
  const dateLabel = formatDailyDateLong(isoDate);
  const title = formatDailyPageTitle(isoDate, record.difficulty as Difficulty);

  return (
    <>
      <DailyPuzzleSchemaScript isoDate={isoDate} record={record} includeArchiveBreadcrumb />
      <section className="relative">
        <Image
          src="/images/hero-home.webp"
          alt=""
          width={1000}
          height={1000}
          unoptimized
          className="absolute inset-0 h-full w-full object-cover dark:hidden"
        />
        <Container className="relative z-10">
          <DailyBreadcrumbs items={breadcrumbs} className="mb-4 justify-center" />
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <h1 className="font-heading text-3xl font-black dark:text-stone-50 md:text-4xl">{title}</h1>
            <p className="text-lg text-stone-600 dark:text-stone-400">
              {record.difficulty} · {record.clueCount} givens · {dateLabel} ({DAILY_CHALLENGE_TIMEZONE_POLICY})
            </p>
            <DailyStreakBadge />
            {isToday && (
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Permanent link:{' '}
                <Link href={`/daily/${isoDate}`} className="font-semibold text-[color:var(--app-accent-strong)] hover:underline">
                  /daily/{isoDate}
                </Link>
              </p>
            )}
            {!isToday && (
              <Link href="/daily" className="text-sm font-semibold text-[color:var(--app-accent-strong)] hover:underline">
                Play today&apos;s daily →
              </Link>
            )}
          </div>
          <SudokuGame
            initialDifficulty={record.difficulty as Difficulty}
            globalDailyMode
            globalDailyDateLabel={dateLabel}
            dailyIsoDate={isoDate}
            dailyPuzzle={{ puzzle: record.puzzle, solution: record.solution }}
          />
          <div className="mx-auto flex max-w-2xl flex-col items-center">
            <DailyDayNav isoDate={isoDate} previousDate={previousDate} nextDate={nextDate} />
            <DailySolutionPanel solution={record.solution} />
            <p className="mt-6 text-center text-sm text-stone-600 dark:text-stone-400">
              <Link href="/daily/archive" className="font-semibold text-[color:var(--app-accent-strong)] hover:underline">
                Browse the full daily archive
              </Link>
              {' · '}
              <Link
                href={`/daily/${isoDate.slice(0, 4)}/${isoDate.slice(5, 7)}`}
                className="font-semibold text-[color:var(--app-accent-strong)] hover:underline">
                {isoDate.slice(0, 7)} calendar
              </Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
