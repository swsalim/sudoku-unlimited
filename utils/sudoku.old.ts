import { Grid, Cell, Difficulty } from '../types';

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate a solved Sudoku grid
function generateSolvedGrid(): number[][] {
  const grid: number[][] = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  function isValid(num: number, pos: [number, number]): boolean {
    const [row, col] = pos;

    // Check row
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num && x !== col) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (grid[x][col] === num && x !== row) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          grid[boxRow + i][boxCol + j] === num &&
          (boxRow + i !== row || boxCol + j !== col)
        ) {
          return false;
        }
      }
    }

    return true;
  }

  function solve(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of numbers) {
            if (isValid(num, [row, col])) {
              grid[row][col] = num;
              if (solve()) return true;
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solve();
  return grid;
}

// Get difficulty settings
function getDifficultySettings(difficulty: string): { cellsToRemove: number } {
  const settings = {
    Easy: { cellsToRemove: 30 },
    Medium: { cellsToRemove: 40 },
    Hard: { cellsToRemove: 50 },
    Expert: { cellsToRemove: 55 },
    Master: { cellsToRemove: 60 },
    Extreme: { cellsToRemove: 65 },
  };
  return settings[difficulty] || settings['Medium'];
}

// Generate a puzzle by removing numbers from a solved grid
export function generatePuzzle(difficulty: string): {
  puzzle: Grid;
  solution: number[][];
} {
  const solution = generateSolvedGrid();
  const { cellsToRemove } = getDifficultySettings(difficulty);

  // Create a copy of the solution
  const puzzle: Grid = solution.map((row) =>
    row.map((value) => ({
      value,
      notes: new Set<number>(),
      isInitial: true,
      hasError: false,
    }))
  );

  // Create array of all positions
  const positions: [number, number][] = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      positions.push([i, j]);
    }
  }

  // Shuffle positions and remove numbers
  shuffleArray(positions);
  for (let i = 0; i < cellsToRemove; i++) {
    const [row, col] = positions[i];
    puzzle[row][col] = {
      value: null,
      notes: new Set<number>(),
      isInitial: false,
      hasError: false,
    };
  }

  return { puzzle, solution };
}

// Get all possible values for a cell
export function getPossibleValues(
  grid: Grid,
  row: number,
  col: number
): number[] {
  if (grid[row][col].value !== null) return [];

  const possible = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // Check row
  for (let i = 0; i < 9; i++) {
    if (grid[row][i].value) possible.delete(grid[row][i].value!);
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col].value) possible.delete(grid[i][col].value!);
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const value = grid[boxRow + i][boxCol + j].value;
      if (value) possible.delete(value);
    }
  }

  return Array.from(possible);
}

// Validate if a move is correct against the solution
export function validateMove(
  grid: Grid,
  row: number,
  col: number,
  value: number,
  solution: number[][]
): boolean {
  return solution[row][col] === value;
}

// Check if the puzzle is solved
export function isSolved(grid: Grid): boolean {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j].value === null || grid[i][j].hasError) {
        return false;
      }
    }
  }
  return true;
}
