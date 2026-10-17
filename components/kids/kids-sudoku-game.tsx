'use client';

import { type KeyboardEvent, useMemo, useState } from 'react';

import { Eraser, RotateCcw } from 'lucide-react';

import { selineTrack } from '@/lib/analytics';
import type { KidsLevel } from '@/lib/kids/content';
import { cn } from '@/lib/utils';

import { digitsConflict, generateMiniPuzzle, miniBoxShape } from '@/utils/mini-sudoku';

import { NumberGrid } from '@/components/printable/number-grid';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type KidsSudokuGameProps = {
  level: KidsLevel;
};

type Board = number[][];

function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

const controlButtonClass =
  'h-12 w-full border-[color:var(--app-surface-border)] bg-[color:var(--app-surface-bg)] font-semibold hover:bg-[color:var(--app-muted-bg)] md:h-14';

export function KidsSudokuGame({ level }: KidsSudokuGameProps) {
  const [seed, setSeed] = useState(`${level.slug}-start`);
  const puzzle = useMemo(() => generateMiniPuzzle(level.size, seed), [level.size, seed]);
  const [board, setBoard] = useState<Board>(() => cloneBoard(puzzle.givens));
  const [history, setHistory] = useState<Board[]>([]);
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);
  const [checked, setChecked] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const given = puzzle.givens;
  const { boxRows, boxCols } = miniBoxShape(level.size);
  const solved = board.every((row, rowIndex) =>
    row.every((value, colIndex) => value === puzzle.solution[rowIndex][colIndex]),
  );

  function restart(nextSeed: string) {
    const next = generateMiniPuzzle(level.size, nextSeed);
    setSeed(nextSeed);
    setBoard(cloneBoard(next.givens));
    setHistory([]);
    setSelected(null);
    setChecked(false);
    setShowSolution(false);
  }

  function place(value: number) {
    if (!selected || solved) return;
    const { row, col } = selected;
    if (given[row][col] !== 0) return;
    if (board[row][col] === value) return;
    setHistory((previous) => [...previous, cloneBoard(board)]);
    const next = cloneBoard(board);
    next[row][col] = value;
    setBoard(next);
    setChecked(false);
  }

  function undo() {
    const last = history[history.length - 1];
    if (!last) return;
    setBoard(cloneBoard(last));
    setHistory((previous) => previous.slice(0, -1));
    setChecked(false);
  }

  function erase() {
    place(0);
  }

  function reset() {
    selineTrack('kids_reset_click', { size: level.slug });
    setBoard(cloneBoard(given));
    setHistory([]);
    setChecked(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      undo();
      return;
    }
    if (!selected) return;
    if (event.key === 'Backspace' || event.key === 'Delete' || event.key === '0') {
      event.preventDefault();
      erase();
      return;
    }
    const digit = Number(event.key);
    if (digit >= 1 && digit <= level.size) {
      event.preventDefault();
      place(digit);
    }
  }

  return (
    <div className="mx-auto text-center">
      <p className="no-print mb-4 text-sm text-stone-600 dark:text-stone-400" aria-live="polite">
        {solved
          ? 'Solved. Every digit is in the right cell.'
          : 'Select an empty cell, then choose a digit. Given numbers stay fixed.'}
      </p>

      <div
        className="kids-print-board mx-auto inline-block rounded-xl border border-stone-200 bg-white p-3 shadow-sm dark:border-stone-700 dark:bg-stone-950 print:border-0 print:bg-white print:p-0 print:shadow-none"
        onKeyDown={onKeyDown}>
        <p className="mb-2 hidden text-sm font-semibold text-black print:block">
          {level.h1} · digits {level.digits}
        </p>
        <table
          className="border-collapse border-2 border-stone-900 dark:border-stone-200 print:border-black"
          aria-label={`${level.h1} grid`}>
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => {
                  const isGiven = given[rowIndex][colIndex] !== 0;
                  const isSelected = selected?.row === rowIndex && selected?.col === colIndex;
                  const conflict = digitsConflict(board, level.size, rowIndex, colIndex);
                  const wrong =
                    checked && value !== 0 && value !== puzzle.solution[rowIndex][colIndex];
                  const thickRight = (colIndex + 1) % boxCols === 0 && colIndex !== level.size - 1;
                  const thickBottom = (rowIndex + 1) % boxRows === 0 && rowIndex !== level.size - 1;
                  const sameBand =
                    selected &&
                    (selected.row === rowIndex ||
                      selected.col === colIndex ||
                      (Math.floor(selected.row / boxRows) === Math.floor(rowIndex / boxRows) &&
                        Math.floor(selected.col / boxCols) === Math.floor(colIndex / boxCols)));

                  return (
                    <td key={colIndex} className="p-0">
                      <button
                        type="button"
                        aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}${value ? `, ${value}` : ', empty'}`}
                        disabled={isGiven}
                        onClick={() => setSelected({ row: rowIndex, col: colIndex })}
                        className={cn(
                          'flex size-12 items-center justify-center border border-stone-300 text-lg font-semibold dark:border-stone-600 sm:size-14 print:size-8 print:border-stone-400 print:text-black',
                          level.size === 6 && 'size-10 text-base sm:size-12',
                          isGiven
                            ? 'bg-stone-100 text-stone-900 dark:bg-[color:var(--sudoku-cell-highlighted-bg)] dark:text-[color:var(--sudoku-cell-initial-text)] print:bg-white'
                            : 'bg-white text-emerald-800 dark:bg-[color:var(--sudoku-cell-bg)] dark:text-[color:var(--app-accent-strong)] print:bg-white print:text-black',
                          isSelected &&
                            'bg-emerald-100 dark:bg-[color:var(--sudoku-cell-selected-bg)] dark:text-[color:var(--sudoku-cell-text)] print:bg-white',
                          !isSelected &&
                            sameBand &&
                            'bg-stone-50 dark:bg-[color:var(--sudoku-cell-highlighted-bg)] print:bg-white',
                          (conflict || wrong) &&
                            'bg-red-100 text-red-700 dark:bg-[color:var(--sudoku-cell-error-bg)] dark:text-[color:var(--sudoku-cell-error-text)]',
                          thickRight &&
                            'border-r-2 border-r-stone-900 dark:border-r-stone-200 print:border-r-black',
                          thickBottom &&
                            'border-b-2 border-b-stone-900 dark:border-b-stone-200 print:border-b-black',
                        )}>
                        {value || ''}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TooltipProvider delayDuration={150}>
        <div className="no-print mx-auto mt-4 flex w-full max-w-md flex-col gap-4">
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={controlButtonClass}
                  onClick={undo}
                  disabled={history.length === 0}
                  aria-label="Undo">
                  <RotateCcw className="size-5 md:size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo last move</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={controlButtonClass}
                  onClick={erase}
                  aria-label="Erase">
                  <Eraser className="size-5 md:size-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear selected cell</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={controlButtonClass}
                  onClick={reset}>
                  Reset
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear your entries and keep this puzzle</TooltipContent>
            </Tooltip>
          </div>

          <div
            className={cn('grid gap-2', level.size === 4 ? 'grid-cols-4' : 'grid-cols-3')}
            role="group"
            aria-label="Digits">
            {Array.from({ length: level.size }, (_, index) => index + 1).map((digit) => (
              <Button
                key={digit}
                type="button"
                variant="outline"
                className={cn(controlButtonClass, 'text-xl md:text-2xl')}
                onClick={() => place(digit)}>
                {digit}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              className="h-12 flex-1 bg-[color:var(--app-accent)] font-semibold text-white hover:opacity-95 md:h-14"
              onClick={() =>
                restart(
                  `${level.slug}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
                )
              }>
              New Game
            </Button>
            <Button
              type="button"
              variant="outline"
              className={cn(controlButtonClass, 'flex-1')}
              onClick={() => {
                selineTrack('kids_print_click', { size: level.slug });
                window.print();
              }}>
              Print
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className={cn(controlButtonClass, 'flex-1')}
              onClick={() => {
                selineTrack('kids_check_click', { size: level.slug });
                setChecked(true);
              }}>
              Check
            </Button>
            <Button
              type="button"
              variant="outline"
              className={cn(controlButtonClass, 'flex-1')}
              onClick={() => {
                selineTrack('kids_show_solution_click', {
                  size: level.slug,
                  visible: !showSolution,
                });
                setShowSolution((value) => !value);
              }}>
              {showSolution ? 'Hide solution' : 'Show solution'}
            </Button>
          </div>
        </div>
      </TooltipProvider>

      <section
        className={cn('solutions-page mt-8', showSolution ? 'block' : 'hidden print:block')}
        aria-labelledby="kids-solution-heading">
        <h2
          id="kids-solution-heading"
          className="font-heading text-xl font-bold text-stone-900 dark:text-stone-50 print:text-black">
          Solution
        </h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 print:text-black">
          This answer matches the puzzle on the page. Printing places it on the next page.
        </p>
        <div className="mt-4">
          <NumberGrid grid={puzzle.solution} label="Solution" boxRows={boxRows} boxCols={boxCols} />
        </div>
      </section>
    </div>
  );
}
