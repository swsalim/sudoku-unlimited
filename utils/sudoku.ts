import { Difficulty, GameVariant, Grid, KillerCage, SudokuSolution } from '@/types';

import { deepCopy } from '@/lib/utils';

// Simple deterministic PRNG for seeded puzzles
class SeededRng {
  private seed: number;

  constructor(seedString: string) {
    // djb2 string hash
    let hash = 5381;
    for (let i = 0; i < seedString.length; i++) {
      hash = (hash * 33) ^ seedString.charCodeAt(i);
    }
    this.seed = hash >>> 0;
  }

  next() {
    // Linear congruential generator
    this.seed = (1664525 * this.seed + 1013904223) >>> 0;
    return this.seed / 0xffffffff;
  }
}

// Helper to shuffle array (non‑seeded)
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Helper to shuffle array with seeded RNG
function shuffleArrayWithRng<T>(array: T[], rng: SeededRng): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
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

// Generate a valid Sudoku solution with a seeded RNG
function generateSeededSolution(rng: SeededRng): number[][] {
  const grid: number[][] = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  // Fill diagonal 3x3 boxes first (they are independent)
  for (let box = 0; box < 9; box += 3) {
    const numbers = shuffleArrayWithRng([1, 2, 3, 4, 5, 6, 7, 8, 9], rng);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[box + i][box + j] = numbers[i * 3 + j];
      }
    }
  }

  if (!fillRemainingWithRng(grid, rng)) {
    return generateSeededSolution(rng);
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

function fillRemainingWithRng(grid: number[][], rng: SeededRng): boolean {
  const emptyCell = findEmptyCell(grid);
  if (!emptyCell) return true;

  const [row, col] = emptyCell;
  const numbers = shuffleArrayWithRng([1, 2, 3, 4, 5, 6, 7, 8, 9], rng);

  for (const num of numbers) {
    if (isValidPlacement(grid, row, col, num)) {
      grid[row][col] = num;
      if (fillRemainingWithRng(grid, rng)) return true;
      grid[row][col] = 0;
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

// Create seeded puzzle by removing numbers from solution
function generateSeededPuzzle(
  solution: SudokuSolution,
  difficulty: Difficulty,
  rng: SeededRng,
): number[][] {
  const puzzle = deepCopy(solution);

  const cellsToRemove = {
    [Difficulty.EASY]: 30,
    [Difficulty.MEDIUM]: 40,
    [Difficulty.HARD]: 50,
    [Difficulty.EXPERT]: 55,
    [Difficulty.MASTER]: 60,
    [Difficulty.EXTREME]: 65,
  }[difficulty];

  const positions: Array<[number, number]> = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      positions.push([i, j]);
    }
  }

  shuffleArrayWithRng(positions, rng);
  let removed = 0;
  for (const [row, col] of positions) {
    if (removed >= cellsToRemove) break;

    const temp = puzzle[row][col];
    puzzle[row][col] = 0;

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
  options?: { variant?: GameVariant; cages?: KillerCage[] },
): boolean {
  // First, check if the move conflicts with existing numbers in the row, column, or 3x3 box
  if (!isValidPlacement(grid, row, col, num)) {
    return false;
  }

  if (
    options?.variant === GameVariant.KILLER &&
    !isValidKillerPlacement(grid, row, col, num, options.cages ?? [])
  ) {
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

export function getPossibleValuesForVariant(
  grid: number[][],
  row: number,
  col: number,
  options?: { variant?: GameVariant; cages?: KillerCage[] },
): number[] {
  const possible: number[] = [];

  if (grid[row][col] !== 0) return possible;

  for (let num = 1; num <= 9; num++) {
    if (!isValidPlacement(grid, row, col, num)) continue;
    if (
      options?.variant === GameVariant.KILLER &&
      !isValidKillerPlacement(grid, row, col, num, options.cages ?? [])
    ) {
      continue;
    }
    possible.push(num);
  }

  return possible;
}

function isValidKillerPlacement(
  grid: number[][],
  row: number,
  col: number,
  num: number,
  cages: KillerCage[],
): boolean {
  if (!cages.length) return true;
  const cage = getCageForCell(cages, row, col);
  if (!cage) return true;

  let sum = 0;
  let hasEmpty = false;
  for (const cageCell of cage.cells) {
    const value = cageCell.row === row && cageCell.col === col ? num : grid[cageCell.row][cageCell.col];
    if (value === 0) {
      hasEmpty = true;
      continue;
    }
    for (const peer of cage.cells) {
      if (peer.row === cageCell.row && peer.col === cageCell.col) continue;
      const peerValue =
        peer.row === row && peer.col === col ? num : (grid[peer.row][peer.col] === 0 ? null : grid[peer.row][peer.col]);
      if (peerValue !== null && peerValue === value) {
        return false;
      }
    }
    sum += value;
  }

  if (sum > cage.sum) return false;
  if (!hasEmpty && sum !== cage.sum) return false;
  return true;
}

function getCageForCell(cages: KillerCage[], row: number, col: number): KillerCage | undefined {
  return cages.find((cage) => cage.cells.some((cell) => cell.row === row && cell.col === col));
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

export type SolverValidationResult =
  | { valid: true }
  | {
      valid: false;
      reason: 'invalid_shape' | 'invalid_values' | 'conflict';
      message: string;
    };

export type SolvePuzzleResult =
  | { status: 'solved'; solution: number[][] }
  | { status: 'invalid'; message: string }
  | { status: 'unsolvable'; message: string };

export type SolverTechnique = 'naked_single' | 'hidden_single';

export type SolverStep = {
  technique: SolverTechnique;
  row: number;
  col: number;
  value: number;
  explanation: string;
};

function isPlacementValidForPuzzle(grid: number[][], row: number, col: number, num: number): boolean {
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c] === num) return false;
  }

  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if ((r !== row || c !== col) && grid[r][c] === num) return false;
    }
  }

  return true;
}

function getBestEmptyCell(grid: number[][]): [number, number, number[]] | null {
  let best: [number, number, number[]] | null = null;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] !== 0) continue;
      const candidates: number[] = [];
      for (let num = 1; num <= 9; num++) {
        if (isPlacementValidForPuzzle(grid, row, col, num)) {
          candidates.push(num);
        }
      }
      if (candidates.length === 0) return [row, col, []];
      if (!best || candidates.length < best[2].length) {
        best = [row, col, candidates];
      }
    }
  }

  return best;
}

function getCellCandidates(grid: number[][], row: number, col: number): number[] {
  if (grid[row][col] !== 0) return [];
  const candidates: number[] = [];
  for (let num = 1; num <= 9; num++) {
    if (isPlacementValidForPuzzle(grid, row, col, num)) {
      candidates.push(num);
    }
  }
  return candidates;
}

function findNakedSingle(grid: number[][]): SolverStep | null {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] !== 0) continue;
      const candidates = getCellCandidates(grid, row, col);
      if (candidates.length === 1) {
        const value = candidates[0];
        return {
          technique: 'naked_single',
          row,
          col,
          value,
          explanation: `R${row + 1}C${col + 1} must be ${value} because it is the only candidate for that cell.`,
        };
      }
    }
  }
  return null;
}

function findHiddenSingleInRow(grid: number[][]): SolverStep | null {
  for (let row = 0; row < 9; row++) {
    for (let value = 1; value <= 9; value++) {
      const positions: number[] = [];
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0 && isPlacementValidForPuzzle(grid, row, col, value)) {
          positions.push(col);
        }
      }
      if (positions.length === 1) {
        const col = positions[0];
        return {
          technique: 'hidden_single',
          row,
          col,
          value,
          explanation: `In row ${row + 1}, digit ${value} fits only at C${col + 1}.`,
        };
      }
    }
  }
  return null;
}

function findHiddenSingleInColumn(grid: number[][]): SolverStep | null {
  for (let col = 0; col < 9; col++) {
    for (let value = 1; value <= 9; value++) {
      const positions: number[] = [];
      for (let row = 0; row < 9; row++) {
        if (grid[row][col] === 0 && isPlacementValidForPuzzle(grid, row, col, value)) {
          positions.push(row);
        }
      }
      if (positions.length === 1) {
        const row = positions[0];
        return {
          technique: 'hidden_single',
          row,
          col,
          value,
          explanation: `In column ${col + 1}, digit ${value} fits only at R${row + 1}.`,
        };
      }
    }
  }
  return null;
}

function findHiddenSingleInBox(grid: number[][]): SolverStep | null {
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      for (let value = 1; value <= 9; value++) {
        const positions: Array<[number, number]> = [];
        for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
          for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
            if (grid[row][col] === 0 && isPlacementValidForPuzzle(grid, row, col, value)) {
              positions.push([row, col]);
            }
          }
        }
        if (positions.length === 1) {
          const [row, col] = positions[0];
          return {
            technique: 'hidden_single',
            row,
            col,
            value,
            explanation: `In box (${boxRow + 1}, ${boxCol + 1}), digit ${value} fits only at R${row + 1}C${col + 1}.`,
          };
        }
      }
    }
  }
  return null;
}

function findHiddenSingle(grid: number[][]): SolverStep | null {
  return findHiddenSingleInRow(grid) ?? findHiddenSingleInColumn(grid) ?? findHiddenSingleInBox(grid);
}

export function getNextLogicalStep(input: number[][]): SolverStep | null {
  const validation = validatePuzzle(input);
  if (!validation.valid) return null;

  const grid = input.map((row) => [...row]);
  return findNakedSingle(grid) ?? findHiddenSingle(grid);
}

export function getAllLogicalSteps(input: number[][], maxSteps = 200): SolverStep[] {
  const validation = validatePuzzle(input);
  if (!validation.valid) return [];

  const grid = input.map((row) => [...row]);
  const steps: SolverStep[] = [];

  for (let i = 0; i < maxSteps; i++) {
    const step = findNakedSingle(grid) ?? findHiddenSingle(grid);
    if (!step) break;
    steps.push(step);
    grid[step.row][step.col] = step.value;
  }

  return steps;
}

function solveWithBacktracking(grid: number[][]): boolean {
  const bestCell = getBestEmptyCell(grid);
  if (!bestCell) return true;

  const [row, col, candidates] = bestCell;
  if (!candidates.length) return false;

  for (const num of candidates) {
    grid[row][col] = num;
    if (solveWithBacktracking(grid)) {
      return true;
    }
    grid[row][col] = 0;
  }

  return false;
}

export function validatePuzzle(input: number[][]): SolverValidationResult {
  if (input.length !== 9 || input.some((row) => row.length !== 9)) {
    return {
      valid: false,
      reason: 'invalid_shape',
      message: 'Puzzle must be a 9x9 grid.',
    };
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = input[row][col];
      if (!Number.isInteger(value) || value < 0 || value > 9) {
        return {
          valid: false,
          reason: 'invalid_values',
          message: 'Cells must contain digits 0-9 only.',
        };
      }
    }
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = input[row][col];
      if (value === 0) continue;
      if (!isPlacementValidForPuzzle(input, row, col, value)) {
        return {
          valid: false,
          reason: 'conflict',
          message: 'Puzzle has conflicting numbers in a row, column, or 3x3 box.',
        };
      }
    }
  }

  return { valid: true };
}

export function solvePuzzle(input: number[][]): SolvePuzzleResult {
  const validation = validatePuzzle(input);
  if (!validation.valid) {
    return { status: 'invalid', message: validation.message };
  }

  const grid = input.map((row) => [...row]);
  const solved = solveWithBacktracking(grid);

  if (!solved) {
    return {
      status: 'unsolvable',
      message: 'No solution found for this Sudoku puzzle.',
    };
  }

  return { status: 'solved', solution: grid };
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

export function generateSeededGrid(
  difficulty: Difficulty,
  seed: string,
): { grid: Grid; solution: SudokuSolution } {
  const rng = new SeededRng(seed);
  const solution = generateSeededSolution(rng);
  const puzzle = generateSeededPuzzle(solution, difficulty, rng);
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
