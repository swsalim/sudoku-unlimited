import { getDailyDifficultyForDate, getGlobalDailySeed } from '@/lib/daily-challenge';
import { DAILY_ARCHIVE_GENERATE_THROUGH, DAILY_ARCHIVE_START_DATE } from '@/lib/daily/constants';
import { countClues, gridToPuzzleNumbers, solutionToNumbers } from '@/lib/daily/grid';
import type { DailyPuzzleArchive } from '@/lib/daily/types';
import { generateSeededGrid } from '@/utils/sudoku';

function addDays(iso: string, delta: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + delta, 12));
  const yy = next.getUTCFullYear();
  const mm = String(next.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(next.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

export function generateDailyArchive(): DailyPuzzleArchive {
  const puzzles: DailyPuzzleArchive['puzzles'] = {};
  let cursor = DAILY_ARCHIVE_START_DATE;
  while (cursor <= DAILY_ARCHIVE_GENERATE_THROUGH) {
    const difficulty = getDailyDifficultyForDate(cursor);
    const { grid, solution } = generateSeededGrid(
      difficulty,
      getGlobalDailySeed(cursor, difficulty),
    );
    const puzzle = gridToPuzzleNumbers(grid);
    puzzles[cursor] = {
      difficulty,
      clueCount: countClues(puzzle),
      puzzle,
      solution: solutionToNumbers(solution),
    };
    cursor = addDays(cursor, 1);
  }

  return {
    version: 1,
    timezonePolicy: 'UTC',
    puzzles,
  };
}
