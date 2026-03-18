/**
 * Hint economy: daily free hints, earned hints, and refresh timing.
 *
 * - 3 free hints per day (resets at midnight local time)
 * - Earn +1 hint per completed puzzle
 * - Earn +1 hint for no-hints achievements (first time)
 * - Optional: hasUnlimitedHints for premium users (future)
 */

const HINT_STORAGE_KEY = 'sudoku-hints';
const DAILY_FREE_HINTS = 3;

export interface HintState {
  /** Hints earned from completing puzzles / achievements (persists) */
  earnedHints: number;
  /** Last date (YYYY-MM-DD) when daily hints were refreshed */
  lastDailyRefresh: string;
  /** Hints consumed today (resets with daily refresh) */
  hintsUsedToday: number;
}

const DEFAULT: HintState = {
  earnedHints: 0,
  lastDailyRefresh: '',
  hintsUsedToday: 0,
};

function getLocalDateString(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getHintState(): HintState {
  if (typeof window === 'undefined') return DEFAULT;
  try {
    const raw = localStorage.getItem(HINT_STORAGE_KEY);
    if (!raw) return { ...DEFAULT };
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT };
  }
}

function saveHintState(state: HintState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(HINT_STORAGE_KEY, JSON.stringify(state));
}

/** Refresh daily hints if it's a new day */
function maybeRefreshDaily(state: HintState): HintState {
  const today = getLocalDateString();
  if (state.lastDailyRefresh === today) return state;
  return {
    ...state,
    lastDailyRefresh: today,
    hintsUsedToday: 0,
  };
}

/**
 * Get how many hints the user has available.
 * Daily free hints (3) + earned hints, minus hints used today.
 */
export function getAvailableHints(hasUnlimitedHints = false): number {
  if (hasUnlimitedHints) return Infinity;
  const state = maybeRefreshDaily(getHintState());
  const freeRemaining = Math.max(0, DAILY_FREE_HINTS - state.hintsUsedToday);
  return freeRemaining + state.earnedHints;
}

/**
 * Consume one hint. Returns true if consumed, false if none left.
 * Uses daily free hints first, then earned hints.
 */
export function consumeHint(hasUnlimitedHints = false): boolean {
  if (hasUnlimitedHints) return true;
  let state = maybeRefreshDaily(getHintState());
  if (state.hintsUsedToday < DAILY_FREE_HINTS) {
    state = { ...state, hintsUsedToday: state.hintsUsedToday + 1 };
  } else if (state.earnedHints > 0) {
    state = { ...state, earnedHints: state.earnedHints - 1 };
  } else {
    return false;
  }
  saveHintState(state);
  return true;
}

/**
 * Grant earned hints (e.g. +1 per puzzle completed).
 */
export function grantEarnedHints(count: number): void {
  const state = maybeRefreshDaily(getHintState());
  saveHintState({
    ...state,
    earnedHints: state.earnedHints + count,
  });
}

/**
 * Milliseconds until next daily refresh (midnight local).
 */
export function getMsUntilDailyRefresh(): number {
  if (typeof window === 'undefined') return 0;
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.getTime() - now.getTime();
}

/**
 * Human-readable "Hints refresh in X hours" string.
 */
export function getHintRefreshMessage(): string {
  const ms = getMsUntilDailyRefresh();
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `Hints refresh in ${hours}h ${mins}m`;
  if (mins > 0) return `Hints refresh in ${mins}m`;
  return 'Hints refresh soon';
}
