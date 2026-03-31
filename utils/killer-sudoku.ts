import { Difficulty, GameVariant, Grid, KillerCage, SudokuSolution } from '@/types';
import { generateGrid } from '@/utils/sudoku';

type CellPos = { row: number; col: number };

function getNeighbors(row: number, col: number): CellPos[] {
  const raw = [
    { row: row - 1, col },
    { row: row + 1, col },
    { row, col: col - 1 },
    { row, col: col + 1 },
  ];
  return raw.filter((cell) => cell.row >= 0 && cell.row < 9 && cell.col >= 0 && cell.col < 9);
}

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function getTargetCageSize(difficulty: Difficulty, remaining: number): number {
  if (remaining <= 4) return remaining;
  const weightedByDifficulty: Record<Difficulty, number[]> = {
    [Difficulty.EASY]: [2, 2, 2, 3, 3, 4],
    [Difficulty.MEDIUM]: [2, 2, 3, 3, 4, 4],
    [Difficulty.HARD]: [2, 3, 3, 4, 4, 5],
    [Difficulty.EXPERT]: [3, 3, 4, 4, 5],
    [Difficulty.MASTER]: [3, 4, 4, 5],
    [Difficulty.EXTREME]: [3, 4, 4, 5],
  };
  const sample = randomItem(weightedByDifficulty[difficulty]);
  return Math.min(sample, remaining);
}

function buildDynamicCages(solution: SudokuSolution, difficulty: Difficulty): KillerCage[] {
  const unassigned = new Set<string>();
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      unassigned.add(`${row}-${col}`);
    }
  }

  const cages: KillerCage[] = [];
  let idCounter = 1;

  while (unassigned.size > 0) {
    const startKey = randomItem(Array.from(unassigned));
    const [startRow, startCol] = startKey.split('-').map(Number);
    const targetSize = getTargetCageSize(difficulty, unassigned.size);
    const cageCells: CellPos[] = [{ row: startRow, col: startCol }];
    const usedValues = new Set<number>([solution[startRow][startCol]]);
    unassigned.delete(startKey);

    while (cageCells.length < targetSize) {
      const frontier: CellPos[] = [];
      for (const cell of cageCells) {
        for (const neighbor of getNeighbors(cell.row, cell.col)) {
          const key = `${neighbor.row}-${neighbor.col}`;
          if (!unassigned.has(key)) continue;
          if (usedValues.has(solution[neighbor.row][neighbor.col])) continue;
          if (!frontier.some((f) => f.row === neighbor.row && f.col === neighbor.col)) {
            frontier.push(neighbor);
          }
        }
      }

      if (frontier.length === 0) break;
      const next = randomItem(frontier);
      cageCells.push(next);
      usedValues.add(solution[next.row][next.col]);
      unassigned.delete(`${next.row}-${next.col}`);
    }

    cages.push({
      id: `cage-${idCounter++}`,
      sum: cageCells.reduce((sum, cell) => sum + solution[cell.row][cell.col], 0),
      cells: cageCells,
    });
  }

  // Merge single-cell cages whenever possible to improve playability/readability.
  let changed = true;
  while (changed) {
    changed = false;
    const singles = cages.filter((cage) => cage.cells.length === 1);
    if (!singles.length) break;

    for (const single of singles) {
      const singleCell = single.cells[0];
      const singleValue = solution[singleCell.row][singleCell.col];
      const neighbors = getNeighbors(singleCell.row, singleCell.col);

      const candidate = cages.find((cage) => {
        if (cage.id === single.id) return false;
        if (cage.cells.length >= 5) return false;
        const touches = cage.cells.some((cell) =>
          neighbors.some((neighbor) => neighbor.row === cell.row && neighbor.col === cell.col),
        );
        if (!touches) return false;
        const cageValues = new Set(cage.cells.map((cell) => solution[cell.row][cell.col]));
        return !cageValues.has(singleValue);
      });

      if (!candidate) continue;

      candidate.cells.push(singleCell);
      candidate.sum += singleValue;
      const index = cages.findIndex((cage) => cage.id === single.id);
      if (index >= 0) {
        cages.splice(index, 1);
      }
      changed = true;
    }
  }

  return cages;
}

function clueCountByDifficulty(difficulty: Difficulty): number {
  const map: Record<Difficulty, number> = {
    [Difficulty.EASY]: 24,
    [Difficulty.MEDIUM]: 16,
    [Difficulty.HARD]: 10,
    [Difficulty.EXPERT]: 7,
    [Difficulty.MASTER]: 4,
    [Difficulty.EXTREME]: 0,
  };
  return map[difficulty];
}

function getCellToCageMap(cages: KillerCage[]): Map<string, string> {
  const cellToCage = new Map<string, string>();
  for (const cage of cages) {
    for (const cell of cage.cells) {
      cellToCage.set(`${cell.row}-${cell.col}`, cage.id);
    }
  }
  return cellToCage;
}

export function generateKillerGrid(difficulty: Difficulty): {
  grid: Grid;
  solution: SudokuSolution;
  variant: GameVariant;
  cages: KillerCage[];
} {
  const solution = generateGrid(difficulty).solution.map((row) => [...row]);
  const cages = buildDynamicCages(solution, difficulty);
  const clueCount = clueCountByDifficulty(difficulty);
  const clueIndices = new Set<number>();
  while (clueIndices.size < clueCount) {
    clueIndices.add(Math.floor(Math.random() * 81));
  }

  const cellToCage = getCellToCageMap(cages);
  const grid: Grid = solution.map((row, rowIndex) =>
    row.map((value, colIndex) => {
      const idx = rowIndex * 9 + colIndex;
      const isInitial = clueIndices.has(idx);
      return {
        value: isInitial ? value : null,
        notes: new Set<number>(),
        isInitial,
        hasError: false,
        cageId: cellToCage.get(`${rowIndex}-${colIndex}`),
      };
    }),
  );

  return {
    grid,
    solution,
    variant: GameVariant.KILLER,
    cages,
  };
}
