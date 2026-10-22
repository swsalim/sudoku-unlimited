import type { Difficulty } from '@/types';

import { DAILY_CHALLENGE_TIMEZONE_POLICY } from '@/lib/daily-challenge';

const DISPLAY_TZ = 'UTC';

export function formatDailyDateLabel(iso: string): string {
  const d = new Date(`${iso}T12:00:00.000Z`);
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: DISPLAY_TZ }).format(
    d,
  );
}

export function formatDailyDateLong(iso: string): string {
  const d = new Date(`${iso}T12:00:00.000Z`);
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: DISPLAY_TZ }).format(d);
}

export function formatDailyPageTitle(iso: string, difficulty: Difficulty): string {
  return `Daily Sudoku – ${formatDailyDateLabel(iso)} (${difficulty})`;
}

export function formatMonthYearLabel(year: number, month: number): string {
  const d = new Date(Date.UTC(year, month - 1, 1, 12));
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
}

export function dailyTimezoneNote(): string {
  return DAILY_CHALLENGE_TIMEZONE_POLICY;
}
