import { Difficulty } from '@/types';

/**
 * Which calendar day “counts” for the global daily. Using UTC matches the
 * previous `toISOString().slice(0, 10)` behavior in the game, so the same
 * instant maps to the same YYYY-MM-DD for everyone.
 */
export const DAILY_CHALLENGE_TIMEZONE_POLICY = 'UTC' as const;

const DAILY_DIFFICULTY_CYCLE: readonly Difficulty[] = [
  Difficulty.EASY,
  Difficulty.MEDIUM,
  Difficulty.HARD,
  Difficulty.EXPERT,
  Difficulty.MASTER,
  Difficulty.EXTREME,
];

/**
 * YYYY-MM-DD in UTC for the given instant (default: now).
 */
export function getCalendarDateStringForDaily(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function epochDayUTC(isoDate: string): number {
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return 0;
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000);
}

/**
 * One difficulty for the whole product for this calendar day; derived from
 * the date only (no randomness).
 */
export function getDailyDifficultyForDate(isoDate: string): Difficulty {
  return DAILY_DIFFICULTY_CYCLE[epochDayUTC(isoDate) % DAILY_DIFFICULTY_CYCLE.length];
}

/**
 * Seeded daily puzzle: same as classic “daily” before, but only one difficulty
 * per day is the official global challenge.
 */
export function getGlobalDailySeed(isoDate: string, difficulty: Difficulty): string {
  return `${isoDate}-${difficulty}`;
}