import { Difficulty, Grid, SudokuSolution } from '@/types';

import { deepCopy } from '@/lib/utils';

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate a valid Sudoku solution
function generateSolution(): number[][] {
  const grid: number[][] = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  // Fill diagonal 3x3 boxes first (they are independent)
  for (let box = 0; box < 9; box += 3) {
    const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[box + i][box + j] = numbers[i * 3 + j];
      }
    }
  }

  // Fill the rest using backtracking (iterative approach)
  if (!fillRemaining(grid)) {
    // If filling fails, try again
    return generateSolution();
  }

  return grid;
}

function fillRemaining(grid: number[][]): boolean {
  const emptyCell = findEmptyCell(grid);
  if (!emptyCell) return true; // puzzle is solved

  const [row, col] = emptyCell;
  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (const num of numbers) {
    if (isValidPlacement(grid, row, col, num)) {
      grid[row][col] = num;
      if (fillRemaining(grid)) return true;
      grid[row][col] = 0; // backtrack
    }
  }

  return false;
}

function findEmptyCell(grid: number[][]): [number, number] | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

// Create puzzle by removing numbers from solution
function generatePuzzle(solution: SudokuSolution, difficulty: Difficulty): number[][] {
  const puzzle = deepCopy(solution);

  // Define cells to remove based on difficulty
  const cellsToRemove = {
    [Difficulty.EASY]: 30,
    [Difficulty.MEDIUM]: 40,
    [Difficulty.HARD]: 50,
    [Difficulty.EXPERT]: 55,
    [Difficulty.MASTER]: 60,
    [Difficulty.EXTREME]: 65,
  }[difficulty];

  // Create array of all positions
  const positions = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      positions.push([i, j]);
    }
  }

  // Randomly remove numbers
  shuffleArray(positions);
  let removed = 0;
  for (const [row, col] of positions) {
    if (removed >= cellsToRemove) break;

    const temp = puzzle[row][col];
    puzzle[row][col] = 0;

    // If removing this number creates multiple solutions, put it back
    if (!hasUniqueSolution(puzzle)) {
      puzzle[row][col] = temp;
      continue;
    }

    removed++;
  }

  return puzzle;
}

// Check if puzzle has a unique solution
function hasUniqueSolution(grid: number[][]): boolean {
  const solutions: number[][][] = [];

  function solve(grid: number[][]): void {
    if (solutions.length > 1) return; // Stop if multiple solutions found

    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) {
      solutions.push(grid.map((row) => [...row]));
      return;
    }

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
      if (isValidPlacement(grid, row, col, num)) {
        grid[row][col] = num;
        solve(grid);
        grid[row][col] = 0;
      }
    }
  }

  solve(grid.map((row) => [...row]));
  return solutions.length === 1;
}

export function isValidMove(
  grid: number[][],
  row: number,
  col: number,
  num: number,
  solution: SudokuSolution,
): boolean {
  // First, check if the move conflicts with existing numbers in the row, column, or 3x3 box
  if (!isValidPlacement(grid, row, col, num)) {
    return false;
  }

  // Then, check if the move matches the solution
  return solution[row][col] === num;
}

// Add this helper function to check placement without considering the solution
function isValidPlacement(grid: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
}

// Get all possible values for a cell
export function getPossibleValues(grid: number[][], row: number, col: number): number[] {
  const possible: number[] = [];

  if (grid[row][col] !== 0) return possible;

  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      possible.push(num);
    }
  }

  return possible;
}

// Check if the entire grid is valid
export function isValidGrid(grid: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col];
      if (num !== 0 && !isValidPlacement(grid, row, col, num)) {
        return false;
      }
    }
  }
  return true;
}

export function generateGrid(difficulty: Difficulty): { grid: Grid; solution: SudokuSolution } {
  const solution = generateSolution();
  const puzzle = generatePuzzle(solution, difficulty);
  return {
    grid: puzzle.map((row) =>
      row.map((value) => ({
        value: value === 0 ? null : value,
        notes: new Set(),
        isInitial: value !== 0,
        hasError: false,
      })),
    ),
    solution,
  };
}
