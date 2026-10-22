import archive from '@/data/daily/puzzles.json';

import {
  getCalendarDateStringForDaily,
  getDailyDifficultyForDate,
} from '@/lib/daily-challenge';
import { DAILY_ARCHIVE_START_DATE } from '@/lib/daily/constants';
import type { DailyPuzzleArchive, DailyPuzzleRecord } from '@/lib/daily/types';

const data = archive as DailyPuzzleArchive;

export function getDailyArchiveTimezonePolicy(): 'UTC' {
  return data.timezonePolicy;
}

export function getAllDailyPuzzleDates(): string[] {
  return Object.keys(data.puzzles).sort();
}

export function getDailyPuzzle(isoDate: string): DailyPuzzleRecord | null {
  return data.puzzles[isoDate] ?? null;
}

export function hasDailyPuzzle(isoDate: string): boolean {
  return isoDate in data.puzzles;
}

export function getTodayDailyIso(): string {
  return getCalendarDateStringForDaily();
}

export function isFutureDailyDate(isoDate: string, now = new Date()): boolean {
  return isoDate > getCalendarDateStringForDaily(now);
}

export function isBeforeArchiveStart(isoDate: string): boolean {
  return isoDate < DAILY_ARCHIVE_START_DATE;
}

export function getPreviousDailyDate(isoDate: string): string | null {
  const dates = getAllDailyPuzzleDates();
  const idx = dates.indexOf(isoDate);
  if (idx <= 0) return null;
  return dates[idx - 1] ?? null;
}

export function getNextDailyDate(isoDate: string): string | null {
  const dates = getAllDailyPuzzleDates();
  const idx = dates.indexOf(isoDate);
  if (idx < 0 || idx >= dates.length - 1) return null;
  const next = dates[idx + 1];
  if (!next || isFutureDailyDate(next)) return null;
  return next;
}

export function getDatesInMonth(year: number, month: number): string[] {
  const prefix = `${year}-${String(month).padStart(2, '0')}-`;
  return getAllDailyPuzzleDates().filter((d) => d.startsWith(prefix) && !isFutureDailyDate(d));
}

/** Dates that should be statically generated (published archive, not future). */
export function getStaticDailyDates(now = new Date()): string[] {
  const today = getCalendarDateStringForDaily(now);
  return getAllDailyPuzzleDates().filter((d) => d <= today);
}

export function assertPuzzleMatchesSchedule(isoDate: string, record: DailyPuzzleRecord): void {
  const expected = getDailyDifficultyForDate(isoDate);
  if (record.difficulty !== expected) {
    throw new Error(`Daily puzzle ${isoDate}: expected ${expected}, got ${record.difficulty}`);
  }
}
