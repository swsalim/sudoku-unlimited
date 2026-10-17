import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export default function SudokuGameSkeleton({ boardOverlay }: { boardOverlay?: ReactNode }) {
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="rounded-2xl border border-[color:var(--app-surface-border)] bg-[color:var(--app-surface-bg)] p-5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/60 pb-4 dark:border-[color:var(--app-surface-border)]">
            <div className="flex gap-2">
              <div className="h-8 w-32 animate-pulse rounded-xl bg-stone-200 dark:bg-[color:var(--app-muted-bg)]"></div>
              <div className="h-8 w-20 animate-pulse rounded-lg bg-stone-200 dark:bg-[color:var(--app-muted-bg)]"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-12 animate-pulse rounded bg-stone-200 dark:bg-[color:var(--app-muted-bg)]"></div>
              <div className="h-8 w-8 animate-pulse rounded bg-stone-200 dark:bg-[color:var(--app-muted-bg)]"></div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-8">
            <div className="relative w-fit max-w-full">
              <div className="grid w-fit max-w-full grid-cols-9 overflow-hidden rounded-xl border-2 border-stone-200 bg-stone-50/80 shadow-inner dark:border-[color:var(--sudoku-board-border)] dark:bg-[color:var(--sudoku-board-bg)]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row, rowIndex) =>
                  [1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={cn(
                        'relative flex size-7 animate-pulse items-center justify-center border border-stone-300 bg-stone-200/60 dark:border-[color:var(--sudoku-cell-border)] dark:bg-[color:var(--sudoku-cell-bg)] sm:size-9 md:size-11 lg:size-14',
                        colIndex % 3 === 2 &&
                          colIndex !== 8 &&
                          'border-r-2 border-r-stone-300 dark:border-r-[color:var(--sudoku-cell-border)]',
                        rowIndex % 3 === 2 &&
                          rowIndex !== 8 &&
                          'border-b-2 border-b-stone-300 dark:border-b-[color:var(--sudoku-cell-border)]',
                      )}
                    />
                  )),
                )}
              </div>
              {boardOverlay}
            </div>

            <div className="flex flex-grow flex-col gap-4">
              <div className="flex gap-2">
                <div className="h-10 w-full animate-pulse rounded-md bg-stone-200 dark:bg-[color:var(--app-muted-bg)] sm:h-14"></div>
                <div className="h-10 w-full animate-pulse rounded-md bg-stone-200 dark:bg-[color:var(--app-muted-bg)] sm:h-14"></div>
                <div className="h-10 w-full animate-pulse rounded-md bg-stone-200 dark:bg-[color:var(--app-muted-bg)] sm:h-14"></div>
                <div className="h-10 w-full animate-pulse rounded-md bg-stone-200 dark:bg-[color:var(--app-muted-bg)] sm:h-14"></div>
              </div>

              <div className="flex flex-row flex-wrap gap-1 sm:grid sm:grid-cols-3 sm:gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <div
                    key={num}
                    className="h-9 w-9 animate-pulse rounded-md bg-stone-200 dark:bg-[color:var(--app-muted-bg)] sm:h-16 sm:w-full"
                  />
                ))}
              </div>

              <div className="h-10 w-full animate-pulse rounded-lg bg-emerald-500/20 sm:h-12"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
