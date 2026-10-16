import { Difficulty } from '@/types';

import { generateSeededGrid } from '@/utils/sudoku';

export type PrintablePuzzle = {
  givens: number[][];
  solution: number[][];
};

export const PUZZLES_PER_SHEET = 4;

export function createPrintableSheet(
  difficulty: Difficulty,
  seed: string,
  count = PUZZLES_PER_SHEET,
): PrintablePuzzle[] {
  return Array.from({ length: count }, (_, index) => {
    const { grid, solution } = generateSeededGrid(difficulty, `${seed}:${index}`);
    return {
      givens: grid.map((row) => row.map((cell) => cell.value ?? 0)),
      solution: solution.map((row) => [...row]),
    };
  });
}

export function defaultPrintableSeed(slug: string): string {
  return `printable-${slug}-sheet`;
}
