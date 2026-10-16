'use client';

import { useMemo, useState } from 'react';

import {
  CircleHelp,
  FileText,
  Lightbulb,
  List,
  type LucideIcon,
  Pencil,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  getAllLogicalSteps,
  getNextLogicalStep,
  solvePuzzle,
  validatePuzzle,
} from '@/utils/sudoku';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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

function findFirstEmpty(grid: number[][]) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) return { row, col };
    }
  }
  return { row: 0, col: 0 };
}

export function SudokuSolver() {
  const [grid, setGrid] = useState<number[][]>(cloneGrid(EMPTY_GRID));
  const [history, setHistory] = useState<number[][][]>([]);
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'error' | 'success'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [hasSolved, setHasSolved] = useState(false);
  const [stepExplanations, setStepExplanations] = useState<string[]>([]);

  const conflicts = useMemo(() => getConflictCells(grid), [grid]);

  const rememberGrid = () => {
    setHistory((prev) => [...prev, cloneGrid(grid)].slice(-50));
  };

  const resetProgress = () => {
    setHasSolved(false);
    setStepExplanations([]);
    setStatus({ type: 'idle', message: '' });
  };

  const handleCellChange = (row: number, col: number, rawValue: string) => {
    const cleaned = rawValue.replace(/[^1-9]/g, '').slice(-1);
    const nextValue = cleaned ? Number(cleaned) : 0;
    if (grid[row][col] === nextValue) return;

    rememberGrid();
    setGrid((prev) => {
      const next = cloneGrid(prev);
      next[row][col] = nextValue;
      return next;
    });
    resetProgress();
  };

  const handleNumberClick = (num: number) => {
    const target = selected ?? findFirstEmpty(grid);
    setSelected(target);
    handleCellChange(target.row, target.col, String(num));
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setGrid(cloneGrid(previous));
    resetProgress();
  };

  const handleSolve = () => {
    const validation = validatePuzzle(grid);
    if (!validation.valid) {
      setStatus({ type: 'error', message: validation.message });
      return;
    }

    const result = solvePuzzle(grid);
    if (result.status === 'solved') {
      rememberGrid();
      setGrid(result.solution);
      setHasSolved(true);
      setStepExplanations([]);
      setStatus({ type: 'success', message: 'Sudoku solved successfully.' });
      return;
    }

    setStatus({ type: 'error', message: result.message });
  };

  const handleClear = () => {
    if (grid.every((row) => row.every((value) => value === 0))) return;
    rememberGrid();
    setGrid(cloneGrid(EMPTY_GRID));
    setSelected(null);
    resetProgress();
  };

  const handleLoadExample = () => {
    rememberGrid();
    setGrid(cloneGrid(EXAMPLE_PUZZLE));
    setSelected(null);
    resetProgress();
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

    rememberGrid();
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

    rememberGrid();
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
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-8">
          <div className="overflow-x-auto">
            <div className="grid w-fit grid-cols-9 overflow-hidden rounded-xl border-2 border-[color:var(--sudoku-board-border)] bg-[color:var(--sudoku-board-bg)]">
              {grid.map((row, rowIndex) =>
                row.map((value, colIndex) => {
                  const key = `${rowIndex}-${colIndex}`;
                  const isConflict = conflicts.has(key);
                  const isSelected = selected?.row === rowIndex && selected?.col === colIndex;
                  return (
                    <input
                      key={key}
                      aria-label={`Row ${rowIndex + 1} Column ${colIndex + 1}`}
                      inputMode="numeric"
                      maxLength={1}
                      value={value === 0 ? '' : String(value)}
                      onFocus={() => setSelected({ row: rowIndex, col: colIndex })}
                      onClick={() => setSelected({ row: rowIndex, col: colIndex })}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      className={cn(
                        'h-9 w-9 border border-stone-200 bg-white text-center text-base font-semibold text-stone-900 outline-none transition focus:z-10 focus:ring-2 focus:ring-emerald-500 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 sm:h-12 sm:w-12',
                        colIndex % 3 === 2 && colIndex !== 8 && 'border-r-2 border-r-stone-400',
                        rowIndex % 3 === 2 && rowIndex !== 8 && 'border-b-2 border-b-stone-400',
                        isSelected &&
                          'z-10 bg-emerald-50 ring-2 ring-emerald-500 dark:bg-emerald-950/40',
                        isConflict &&
                          'bg-red-100 text-red-900 focus:ring-red-500 dark:bg-red-900/40 dark:text-red-100',
                      )}
                    />
                  );
                }),
              )}
            </div>
          </div>

          <div className="flex w-full max-w-sm flex-col gap-3 lg:w-80 lg:max-w-none lg:shrink-0">
            <div className="grid grid-cols-4 gap-2">
              <ToolButton
                label="Undo"
                icon={RotateCcw}
                onClick={handleUndo}
                disabled={history.length === 0}
              />
              <ToolButton label="Clear" icon={Pencil} onClick={handleClear} />
              <ToolButton label="Example" icon={FileText} onClick={handleLoadExample} />
              <ToolButton label="Help" icon={CircleHelp} onClick={() => setHelpOpen(true)} />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleNumberClick(num)}
                  className="flex h-12 items-center justify-center rounded-2xl border border-stone-200 bg-white text-lg font-semibold text-stone-800 shadow-sm transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:hover:bg-stone-900 sm:h-14"
                >
                  {num}
                </button>
              ))}
            </div>

            <Button
              onClick={handleSolve}
              className="h-12 rounded-xl bg-[color:var(--app-accent)] text-base font-semibold text-white shadow-sm hover:bg-[color:var(--app-accent-strong)]"
            >
              <Sparkles className="size-4" />
              Solve
            </Button>
            <Button
              variant="outline"
              onClick={handleShowAllSteps}
              className="h-12 rounded-xl border-stone-200 bg-white text-sm font-medium text-stone-800 shadow-sm hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:hover:bg-stone-900"
            >
              <List className="size-4" />
              Show All Steps
            </Button>
            <Button
              variant="outline"
              onClick={handleExplainNextStep}
              className="h-12 rounded-xl border-stone-200 bg-white text-sm font-medium text-stone-800 shadow-sm hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:hover:bg-stone-900"
            >
              <Lightbulb className="size-4" />
              Explain Next Step
            </Button>
          </div>
        </div>

        {!!status.message && (
          <p
            className={cn(
              'mt-4 text-sm',
              status.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-emerald-700',
            )}
          >
            {status.message}
          </p>
        )}

        {hasSolved && (
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Tip: click <strong>Undo</strong> to return to your pre-solve puzzle.
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

      <AlertDialog open={helpOpen} onOpenChange={setHelpOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>How to use the solver</AlertDialogTitle>
            <AlertDialogDescription>
              Select a cell, then tap a number or type 1–9. Leave unknown cells blank.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <ul className="list-disc space-y-1 pl-5 text-sm text-stone-600 dark:text-stone-300">
            <li>
              <strong>Undo</strong> restores the previous board.
            </li>
            <li>
              <strong>Clear</strong> empties every cell.
            </li>
            <li>
              <strong>Example</strong> loads a sample puzzle.
            </li>
            <li>
              <strong>Solve</strong> fills the completed grid.
            </li>
            <li>
              <strong>Explain Next Step</strong> and <strong>Show All Steps</strong> walk through
              the logic.
            </li>
          </ul>
          <AlertDialogFooter>
            <AlertDialogAction>Got it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

function ToolButton({
  label,
  icon: Icon,
  onClick,
  disabled,
}: {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-[4.25rem] flex-col items-center justify-center gap-1.5 rounded-2xl border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200 dark:hover:bg-stone-900"
    >
      <Icon className="size-5" strokeWidth={1.75} />
      <span className="text-[11px] font-medium leading-none text-stone-500 dark:text-stone-400">
        {label}
      </span>
    </button>
  );
}
