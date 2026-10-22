import type { Grid, SudokuSolution } from '@/types';

export function countClues(puzzle: number[][]): number {
  return puzzle.reduce((acc, row) => acc + row.filter((n) => n !== 0).length, 0);
}

export function numbersToGrid(puzzle: number[][]): Grid {
  return puzzle.map((row) =>
    row.map((value) => ({
      value: value === 0 ? null : value,
      notes: new Set<number>(),
      isInitial: value !== 0,
      hasError: false,
    })),
  );
}

export function gridToPuzzleNumbers(grid: Grid): number[][] {
  return grid.map((row) => row.map((cell) => (cell.value === null ? 0 : cell.value)));
}

export function solutionToNumbers(solution: SudokuSolution): number[][] {
  return solution.map((row) => [...row]);
}

