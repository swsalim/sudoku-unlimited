const STATS_KEY = 'sudoku-stats';
const UNLOCKED_KEY = 'sudoku-achievements-unlocked';

export interface GameStats {
  totalPuzzlesCompleted: number;
  puzzlesByDifficulty: Record<string, number>;
  perfectSolves: number;
  perfectSolvesByDifficulty: Record<string, number>;
  bestTimeByDifficulty: Record<string, number>;
  timeSumByDifficulty: Record<string, number>;
  totalHintsUsed: number;
  puzzlesWithoutHints: number;
  puzzlesWithNotes: number;
  lastPlayDate: string | null;
  currentStreak: number;
  longestStreak: number;
}

const DEFAULT_STATS: GameStats = {
  totalPuzzlesCompleted: 0,
  puzzlesByDifficulty: {},
  perfectSolves: 0,
  perfectSolvesByDifficulty: {},
  bestTimeByDifficulty: {},
  timeSumByDifficulty: {},
  totalHintsUsed: 0,
  puzzlesWithoutHints: 0,
  puzzlesWithNotes: 0,
  lastPlayDate: null,
  currentStreak: 0,
  longestStreak: 0,
};

function getLocalDateString(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
}

export function getStats(): GameStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_STATS;
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATS;
  }
}

export function updateStats(
  result: {
    difficulty: string;
    timeSeconds: number;
    mistakes: number;
    hintsUsed: number;
    usedNotes: boolean;
  },
): GameStats {
  const stats = getStats();
  const diffKey = result.difficulty.toLowerCase();
  const isPerfect = result.mistakes === 0;
  const noHints = result.hintsUsed === 0;

  const withNotes = result.usedNotes ? 1 : 0;
  const today = getLocalDateString();
  const yesterday = getYesterdayDateString();

  let currentStreak = stats.currentStreak;
  if (stats.lastPlayDate === null) {
    currentStreak = 1;
  } else if (stats.lastPlayDate === today) {
    currentStreak = stats.currentStreak; // already played today, keep streak
  } else if (stats.lastPlayDate === yesterday) {
    currentStreak = stats.currentStreak + 1;
  } else {
    currentStreak = 1; // streak broken
  }
  const longestStreak = Math.max(stats.longestStreak, currentStreak);

  const updated: GameStats = {
    ...stats,
    totalPuzzlesCompleted: stats.totalPuzzlesCompleted + 1,
    puzzlesByDifficulty: {
      ...stats.puzzlesByDifficulty,
      [diffKey]: (stats.puzzlesByDifficulty[diffKey] ?? 0) + 1,
    },
    perfectSolves: stats.perfectSolves + (isPerfect ? 1 : 0),
    perfectSolvesByDifficulty: {
      ...stats.perfectSolvesByDifficulty,
      [diffKey]: (stats.perfectSolvesByDifficulty[diffKey] ?? 0) + (isPerfect ? 1 : 0),
    },
    bestTimeByDifficulty: {
      ...stats.bestTimeByDifficulty,
      [diffKey]:
        stats.bestTimeByDifficulty[diffKey] == null
          ? result.timeSeconds
          : Math.min(stats.bestTimeByDifficulty[diffKey], result.timeSeconds),
    },
    timeSumByDifficulty: {
      ...stats.timeSumByDifficulty,
      [diffKey]: (stats.timeSumByDifficulty[diffKey] ?? 0) + result.timeSeconds,
    },
    totalHintsUsed: stats.totalHintsUsed + result.hintsUsed,
    puzzlesWithoutHints: stats.puzzlesWithoutHints + (noHints ? 1 : 0),
    puzzlesWithNotes: stats.puzzlesWithNotes + withNotes,
    lastPlayDate: today,
    currentStreak,
    longestStreak,
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(STATS_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function getUnlockedAchievementIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(UNLOCKED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function unlockAchievement(id: string): void {
  if (typeof window === 'undefined') return;
  const ids = getUnlockedAchievementIds();
  if (ids.includes(id)) return;
  localStorage.setItem(UNLOCKED_KEY, JSON.stringify([...ids, id]));
}
