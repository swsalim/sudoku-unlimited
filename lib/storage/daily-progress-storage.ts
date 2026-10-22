import type { GameState } from '@/types';

import {
  buildSavedGameState,
  type GameMoveForSave,
  type SavedGameState,
} from '@/lib/storage/game-storage';

const COMPLETIONS_KEY = 'sudoku-daily-completions';
const STREAK_KEY = 'sudoku-daily-streak';

function dailySaveKey(isoDate: string): string {
  return `sudoku-daily-save-${isoDate}`;
}

export function saveDailyGame(isoDate: string, state: SavedGameState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(dailySaveKey(isoDate), JSON.stringify(state));
}

export function saveDailyGameProgress(
  isoDate: string,
  state: { gameState: GameState; time: number; moveHistory: GameMoveForSave[] },
): void {
  if (typeof window === 'undefined') return;
  saveDailyGame(isoDate, buildSavedGameState(state));
}

export function loadDailyGame(isoDate: string): SavedGameState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(dailySaveKey(isoDate));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedGameState;
    if (!parsed?.gameState?.grid) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearDailyGame(isoDate: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(dailySaveKey(isoDate));
}

export function getCompletedDailyDates(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(COMPLETIONS_KEY);
    if (!raw) return new Set();
    const list = JSON.parse(raw) as string[];
    return new Set(list);
  } catch {
    return new Set();
  }
}

export function markDailyCompleted(isoDate: string): void {
  if (typeof window === 'undefined') return;
  const set = getCompletedDailyDates();
  set.add(isoDate);
  localStorage.setItem(COMPLETIONS_KEY, JSON.stringify([...set].sort()));
  updateStreakAfterCompletion(isoDate);
}

export function isDailyCompleted(isoDate: string): boolean {
  return getCompletedDailyDates().has(isoDate);
}

function parseIsoToEpochDay(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000);
}

function epochDayToIso(epoch: number): string {
  const d = new Date(epoch * 86_400_000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function updateStreakAfterCompletion(isoDate: string): void {
  const stored = localStorage.getItem(STREAK_KEY);
  let current = 0;
  let lastCompleted = '';
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as { current: number; lastCompleted: string };
      current = parsed.current ?? 0;
      lastCompleted = parsed.lastCompleted ?? '';
    } catch {
      /* ignore */
    }
  }

  if (!lastCompleted) {
    current = 1;
  } else {
    const gap = parseIsoToEpochDay(isoDate) - parseIsoToEpochDay(lastCompleted);
    if (gap === 0) {
      /* same day */
    } else if (gap === 1) {
      current += 1;
    } else {
      current = 1;
    }
  }

  localStorage.setItem(STREAK_KEY, JSON.stringify({ current, lastCompleted: isoDate }));
}

export function getDailyStreak(): { current: number; lastCompleted: string } {
  if (typeof window === 'undefined') return { current: 0, lastCompleted: '' };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { current: 0, lastCompleted: '' };
    return JSON.parse(raw) as { current: number; lastCompleted: string };
  } catch {
    return { current: 0, lastCompleted: '' };
  }
}

/** Consecutive completed UTC days ending at `throughIso` (inclusive). */
export function computeStreakThroughDate(completed: Set<string>, throughIso: string): number {
  if (!completed.has(throughIso)) {
    const prev = epochDayToIso(parseIsoToEpochDay(throughIso) - 1);
    if (completed.has(prev)) return computeStreakThroughDate(completed, prev);
    return 0;
  }
  let streak = 0;
  let day = parseIsoToEpochDay(throughIso);
  while (completed.has(epochDayToIso(day))) {
    streak += 1;
    day -= 1;
  }
  return streak;
}
