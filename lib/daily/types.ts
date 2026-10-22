import type { Difficulty } from '@/types';

/** Compact persisted puzzle (immutable once published). */
export interface DailyPuzzleRecord {
  difficulty: Difficulty;
  clueCount: number;
  /** 9×9 givens; 0 = empty cell. */
  puzzle: number[][];
  solution: number[][];
}

export interface DailyPuzzleArchive {
  version: 1;
  timezonePolicy: 'UTC';
  /** ISO dates → puzzle payload */
  puzzles: Record<string, DailyPuzzleRecord>;
}
