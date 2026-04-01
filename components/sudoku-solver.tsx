'use client';

import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { getAllLogicalSteps, getNextLogicalStep, solvePuzzle, validatePuzzle } from '@/utils/sudoku';

import { Button } from '@/components/ui/button';

const EMPTY_GRID = Array.from({ length: 9 }, () => Array(9).fill(0));

const EXAMPLE_PUZZLE = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function cloneGrid(grid: number[][]) {
  return grid.map((row) => [...row]);
}

function getConflictCells(grid: number[][]): Set<string> {
  const conflicts = new Set<string>();

  for (let row = 0; row < 9; row++) {
    const seen = new Map<number, number[]>();
    for (let col = 0; col < 9; col++) {
      const val = grid[row][col];
      if (!val) continue;
      seen.set(val, [...(seen.get(val) ?? []), col]);
    }
    for (const cols of seen.values()) {
      if (cols.length < 2) continue;
      for (const col of cols) conflicts.add(`${row}-${col}`);
    }
  }

  for (let col = 0; col < 9; col++) {
    const seen = new Map<number, number[]>();
    for (let row = 0; row < 9; row++) {
      const val = grid[row][col];
      if (!val) continue;
      seen.set(val, [...(seen.get(val) ?? []), row]);
    }
    for (const rows of seen.values()) {
      if (rows.length < 2) continue;
      for (const row of rows) conflicts.add(`${row}-${col}`);
    }
  }

  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Map<number, Array<[number, number]>>();
      for (let r = boxRow * 3; r < boxRow * 3 + 3; r++) {
        for (let c = boxCol * 3; c < boxCol * 3 + 3; c++) {
          const val = grid[r][c];
          if (!val) continue;
          seen.set(val, [...(seen.get(val) ?? []), [r, c]]);
        }
      }
      for (const cells of seen.values()) {
        if (cells.length < 2) continue;
        for (const [r, c] of cells) conflicts.add(`${r}-${c}`);
      }
    }
  }

  return conflicts;
}

export function SudokuSolver() {
  const [grid, setGrid] = useState<number[][]>(cloneGrid(EMPTY_GRID));
  const [baselineGrid, setBaselineGrid] = useState<number[][]>(cloneGrid(EMPTY_GRID));
  const [status, setStatus] = useState<{ type: 'idle' | 'error' | 'success'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [hasSolved, setHasSolved] = useState(false);
  const [stepExplanations, setStepExplanations] = useState<string[]>([]);

  const conflicts = useMemo(() => getConflictCells(grid), [grid]);

  const handleCellChange = (row: number, col: number, rawValue: string) => {
    const cleaned = rawValue.replace(/[^1-9]/g, '').slice(-1);
    const nextValue = cleaned ? Number(cleaned) : 0;

    setGrid((prev) => {
      const next = cloneGrid(prev);
      next[row][col] = nextValue;
      setBaselineGrid(cloneGrid(next));
      return next;
    });

    setHasSolved(false);
    setStepExplanations([]);
    setStatus({ type: 'idle', message: '' });
  };

  const handleSolve = () => {
    const validation = validatePuzzle(grid);
    if (!validation.valid) {
      setStatus({ type: 'error', message: validation.message });
      return;
    }

    const result = solvePuzzle(grid);
    if (result.status === 'solved') {
      setGrid(result.solution);
      setHasSolved(true);
      setStepExplanations([]);
      setStatus({ type: 'success', message: 'Sudoku solved successfully.' });
      return;
    }

    setStatus({ type: 'error', message: result.message });
  };

  const handleClear = () => {
    const cleared = cloneGrid(EMPTY_GRID);
    setGrid(cleared);
    setBaselineGrid(cloneGrid(cleared));
    setHasSolved(false);
    setStepExplanations([]);
    setStatus({ type: 'idle', message: '' });
  };

  const handleReset = () => {
    setGrid(cloneGrid(baselineGrid));
    setHasSolved(false);
    setStepExplanations([]);
    setStatus({ type: 'idle', message: '' });
  };

  const handleLoadExample = () => {
    setGrid(cloneGrid(EXAMPLE_PUZZLE));
    setBaselineGrid(cloneGrid(EXAMPLE_PUZZLE));
    setHasSolved(false);
    setStepExplanations([]);
    setStatus({ type: 'idle', message: '' });
  };

  const handleExplainNextStep = () => {
    const validation = validatePuzzle(grid);
    if (!validation.valid) {
      setStatus({ type: 'error', message: validation.message });
      return;
    }

    const step = getNextLogicalStep(grid);
    if (!step) {
      setStatus({
        type: 'error',
        message: 'No explainable step found with current techniques (Naked Single, Hidden Single).',
      });
      return;
    }

    const nextGrid = cloneGrid(grid);
    nextGrid[step.row][step.col] = step.value;
    setGrid(nextGrid);
    setStatus({ type: 'success', message: step.explanation });
    setStepExplanations((prev) => [...prev, step.explanation]);
    setHasSolved(nextGrid.every((row) => row.every((value) => value !== 0)));
  };

  const handleShowAllSteps = () => {
    const validation = validatePuzzle(grid);
    if (!validation.valid) {
      setStatus({ type: 'error', message: validation.message });
      return;
    }

    const steps = getAllLogicalSteps(grid, 200);
    if (!steps.length) {
      setStatus({
        type: 'error',
        message: 'No explainable steps available for this puzzle with current techniques.',
      });
      return;
    }

    const nextGrid = cloneGrid(grid);
    for (const step of steps) {
      nextGrid[step.row][step.col] = step.value;
    }

    setGrid(nextGrid);
    setStepExplanations(steps.map((step, idx) => `Step ${idx + 1}: ${step.explanation}`));
    setHasSolved(nextGrid.every((row) => row.every((value) => value !== 0)));
    setStatus({
      type: 'success',
      message: `Applied ${steps.length} explainable step${steps.length > 1 ? 's' : ''}.`,
    });
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-[color:var(--app-surface-border)] bg-[color:var(--app-surface-bg)] p-4 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] sm:p-6">
        <h1 className="font-heading text-3xl font-black text-stone-900 dark:text-stone-50 sm:text-4xl">
          Solve This Sudoku Puzzle Online
        </h1>
        <p className="mt-3 text-base text-stone-700 dark:text-stone-300">
          Enter your puzzle digits and solve it instantly. Use 1-9 for known values and leave other
          cells blank.
        </p>

        <div className="mt-6 overflow-x-auto">
          <div className="grid w-fit grid-cols-9 overflow-hidden rounded-xl border-2 border-[color:var(--sudoku-board-border)] bg-[color:var(--sudoku-board-bg)]">
            {grid.map((row, rowIndex) =>
              row.map((value, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                const isConflict = conflicts.has(key);
                return (
                  <input
                    key={key}
                    aria-label={`Row ${rowIndex + 1} Column ${colIndex + 1}`}
                    inputMode="numeric"
                    maxLength={1}
                    value={value === 0 ? '' : String(value)}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    className={cn(
                      'h-9 w-9 border border-stone-300 bg-white text-center text-base font-semibold text-stone-900 outline-none transition focus:z-10 focus:ring-2 focus:ring-emerald-500 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 sm:h-11 sm:w-11',
                      colIndex % 3 === 2 && colIndex !== 8 && 'border-r-2 border-r-stone-500',
                      rowIndex % 3 === 2 && rowIndex !== 8 && 'border-b-2 border-b-stone-500',
                      isConflict &&
                        'bg-red-100 text-red-900 focus:ring-red-500 dark:bg-red-900/40 dark:text-red-100',
                    )}
                  />
                );
              }),
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={handleSolve}>Solve</Button>
          <Button variant="secondary" onClick={handleExplainNextStep}>
            Explain Next Step
          </Button>
          <Button variant="outline" onClick={handleShowAllSteps}>
            Show All Steps
          </Button>
          <Button variant="secondary" onClick={handleLoadExample}>
            Load Example
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="ghost" onClick={handleClear}>
            Clear
          </Button>
        </div>

        {!!status.message && (
          <p
            className={cn(
              'mt-4 text-sm',
              status.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-emerald-700',
            )}>
            {status.message}
          </p>
        )}

        {hasSolved && (
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Tip: click <strong>Reset</strong> to return to your pre-solve puzzle.
          </p>
        )}

        {stepExplanations.length > 0 && (
          <div className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-900">
            <p className="mb-2 text-sm font-semibold text-stone-800 dark:text-stone-200">
              Step-by-step explanations
            </p>
            <ol className="list-inside list-decimal space-y-1 text-sm text-stone-700 dark:text-stone-300">
              {stepExplanations.slice(-12).map((step, idx) => (
                <li key={`${step}-${idx}`}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
