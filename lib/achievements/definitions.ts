import type { GameStats } from '@/lib/storage/stats-storage';

/**
 * Achievement definitions.
 *
 * To add a new achievement: append an object to the ACHIEVEMENTS array with:
 * - id: unique string (e.g. 'my-achievement')
 * - name: display name
 * - description: what the user did to unlock it
 * - icon: emoji (e.g. '🏆')
 * - check: (stats) => boolean — returns true when the achievement should unlock
 *
 * Available stats for check(): totalPuzzlesCompleted, puzzlesByDifficulty,
 * perfectSolves, perfectSolvesByDifficulty, bestTimeByDifficulty (seconds),
 * timeSumByDifficulty, puzzlesWithoutHints, puzzlesWithNotes, lastPlayDate,
 * currentStreak, longestStreak.
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  check: (stats: GameStats) => boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-win',
    name: 'First Steps',
    description: 'Complete your first puzzle',
    icon: '🎯',
    check: (s) => s.totalPuzzlesCompleted >= 1,
  },
  {
    id: 'ten-complete',
    name: 'Getting Started',
    description: 'Complete 10 puzzles',
    icon: '📊',
    check: (s) => s.totalPuzzlesCompleted >= 10,
  },
  {
    id: 'fifty-complete',
    name: 'Puzzle Enthusiast',
    description: 'Complete 50 puzzles',
    icon: '🌟',
    check: (s) => s.totalPuzzlesCompleted >= 50,
  },
  {
    id: 'perfect-easy',
    name: 'Flawless Easy',
    description: 'Complete an Easy puzzle with no mistakes',
    icon: '✨',
    check: (s) => (s.perfectSolvesByDifficulty['easy'] ?? 0) >= 1,
  },
  {
    id: 'perfect-any',
    name: 'Perfectionist',
    description: 'Complete any puzzle with no mistakes',
    icon: '💎',
    check: (s) => s.perfectSolves >= 1,
  },
  {
    id: 'speed-easy',
    name: 'Quick Thinker',
    description: 'Complete Easy in under 5 minutes',
    icon: '⚡',
    check: (s) => (s.bestTimeByDifficulty['easy'] ?? Infinity) <= 300,
  },
  {
    id: 'speed-medium',
    name: 'Speed Demon',
    description: 'Complete Medium in under 10 minutes',
    icon: '🔥',
    check: (s) => (s.bestTimeByDifficulty['medium'] ?? Infinity) <= 600,
  },
  {
    id: 'all-difficulties',
    name: 'Difficulty Master',
    description: 'Complete at least one puzzle of each difficulty',
    icon: '🏆',
    check: (s) => {
      const diffs = ['easy', 'medium', 'hard', 'expert', 'master', 'extreme'];
      return diffs.every((d) => (s.puzzlesByDifficulty[d] ?? 0) >= 1);
    },
  },
  {
    id: 'no-hints',
    name: 'Independent',
    description: 'Complete a puzzle without using hints',
    icon: '🧠',
    check: (s) => s.puzzlesWithoutHints >= 1,
  },
  {
    id: 'note-master',
    name: 'Note Master',
    description: 'Use notes and complete a puzzle',
    icon: '📝',
    check: (s) => s.puzzlesWithNotes >= 1,
  },
  {
    id: 'streak-3',
    name: 'Streak Keeper',
    description: 'Play 3 days in a row',
    icon: '🔥',
    check: (s) => s.longestStreak >= 3,
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Play 7 days in a row',
    icon: '💪',
    check: (s) => s.longestStreak >= 7,
  },
];
