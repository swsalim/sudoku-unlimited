import { getCalendarDateStringForDaily } from '@/lib/daily-challenge';

/** Seconds until the next UTC daily boundary (midnight UTC). */
export function getSecondsUntilNextDailyBoundary(now = new Date()): number {
  const today = getCalendarDateStringForDaily(now);
  const [y, m, d] = today.split('-').map(Number);
  const nextMidnight = Date.UTC(y, m - 1, d + 1, 0, 0, 0, 0);
  const diffMs = nextMidnight - now.getTime();
  return Math.max(60, Math.ceil(diffMs / 1000));
}

export function getRevalidateForDailyDate(isoDate: string, now = new Date()): number | false {
  const today = getCalendarDateStringForDaily(now);
  if (isoDate < today) return false;
  if (isoDate === today) return getSecondsUntilNextDailyBoundary(now);
  return false;
}
