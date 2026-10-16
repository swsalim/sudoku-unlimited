export type MiniSize = 4 | 6;

export type MiniPuzzle = {
  givens: number[][];
  solution: number[][];
};

type BoxShape = { boxRows: number; boxCols: number };

const SHAPES: Record<MiniSize, BoxShape> = {
  4: { boxRows: 2, boxCols: 2 },
  6: { boxRows: 2, boxCols: 3 },
};

/** Cells the generator tries to clear while keeping one solution. */
const CELLS_TO_REMOVE: Record<MiniSize, number> = {
  4: 8,
  6: 18,
};

class SeededRng {
  private seed: number;

  constructor(seedString: string) {
    let hash = 5381;
    for (let i = 0; i < seedString.length; i++) {
      hash = (hash * 33) ^ seedString.charCodeAt(i);
    }
    this.seed = hash >>> 0;
  }

  next() {
    this.seed = (1664525 * this.seed + 1013904223) >>> 0;
    return this.seed / 0xffffffff;
  }
}

function shuffle<T>(array: T[], rng: SeededRng): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function miniBoxShape(size: MiniSize): BoxShape {
  return SHAPES[size];
}

function isValidPlacement(
  grid: number[][],
  size: MiniSize,
  row: number,
  col: number,
  num: number,
): boolean {
  const { boxRows, boxCols } = SHAPES[size];

  for (let index = 0; index < size; index++) {
    if (grid[row][index] === num || grid[index][col] === num) return false;
  }

  const startRow = Math.floor(row / boxRows) * boxRows;
  const startCol = Math.floor(col / boxCols) * boxCols;
  for (let r = 0; r < boxRows; r++) {
    for (let c = 0; c < boxCols; c++) {
      if (grid[startRow + r][startCol + c] === num) return false;
    }
  }

  return true;
}

function findEmpty(grid: number[][], size: number): [number, number] | null {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === 0) return [row, col];
    }
  }
  return null;
}

function fill(grid: number[][], size: MiniSize, rng: SeededRng): boolean {
  const empty = findEmpty(grid, size);
  if (!empty) return true;

  const [row, col] = empty;
  const numbers = shuffle(
    Array.from({ length: size }, (_, index) => index + 1),
    rng,
  );

  for (const num of numbers) {
    if (isValidPlacement(grid, size, row, col, num)) {
      grid[row][col] = num;
      if (fill(grid, size, rng)) return true;
      grid[row][col] = 0;
    }
  }

  return false;
}

function countSolutions(grid: number[][], size: MiniSize): number {
  const copy = grid.map((row) => [...row]);
  let found = 0;

  function search() {
    if (found > 1) return;
    const empty = findEmpty(copy, size);
    if (!empty) {
      found += 1;
      return;
    }
    const [row, col] = empty;
    for (let num = 1; num <= size; num++) {
      if (isValidPlacement(copy, size, row, col, num)) {
        copy[row][col] = num;
        search();
        copy[row][col] = 0;
      }
    }
  }

  search();
  return found;
}

function emptyGrid(size: number): number[][] {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

export function generateMiniPuzzle(size: MiniSize, seed: string): MiniPuzzle {
  const rng = new SeededRng(seed);
  const solution = emptyGrid(size);
  if (!fill(solution, size, rng)) {
    return generateMiniPuzzle(size, `${seed}-retry`);
  }

  const givens = solution.map((row) => [...row]);
  const positions: Array<[number, number]> = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) positions.push([row, col]);
  }
  shuffle(positions, rng);

  let removed = 0;
  for (const [row, col] of positions) {
    if (removed >= CELLS_TO_REMOVE[size]) break;
    const temp = givens[row][col];
    givens[row][col] = 0;
    if (countSolutions(givens, size) !== 1) {
      givens[row][col] = temp;
      continue;
    }
    removed++;
  }

  return {
    givens,
    solution: solution.map((row) => [...row]),
  };
}

export function digitsConflict(
  grid: number[][],
  size: MiniSize,
  row: number,
  col: number,
): boolean {
  const value = grid[row][col];
  if (!value) return false;

  for (let index = 0; index < size; index++) {
    if (index !== col && grid[row][index] === value) return true;
    if (index !== row && grid[index][col] === value) return true;
  }

  const { boxRows, boxCols } = SHAPES[size];
  const startRow = Math.floor(row / boxRows) * boxRows;
  const startCol = Math.floor(col / boxCols) * boxCols;
  for (let r = 0; r < boxRows; r++) {
    for (let c = 0; c < boxCols; c++) {
      const rr = startRow + r;
      const cc = startCol + c;
      if ((rr !== row || cc !== col) && grid[rr][cc] === value) return true;
    }
  }

  return false;
}
