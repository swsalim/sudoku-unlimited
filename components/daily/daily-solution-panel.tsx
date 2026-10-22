'use client';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

export function DailySolutionPanel({ solution }: { solution: number[][] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 w-full max-w-md rounded-xl border border-[color:var(--app-surface-border)] bg-[color:var(--app-surface-bg)]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-stone-900 dark:text-stone-50"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}>
        Show solution
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open && (
        <div className="border-t border-[color:var(--app-surface-border)] px-4 py-3">
          <p className="mb-3 text-xs text-stone-500 dark:text-stone-400">
            Spoiler: completed grid for this daily puzzle.
          </p>
          <div
            className="mx-auto grid w-fit grid-cols-9 gap-0 border-2 border-stone-800 dark:border-stone-200"
            role="img"
            aria-label="Sudoku solution grid">
            {solution.flatMap((row, ri) =>
              row.map((n, ci) => {
                const thickRight = ci === 2 || ci === 5;
                const thickBottom = ri === 2 || ri === 5;
                return (
                  <div
                    key={`${ri}-${ci}`}
                    className={cn(
                      'flex h-7 w-7 items-center justify-center border border-stone-300 text-sm font-semibold dark:border-stone-600',
                      thickRight && 'border-r-2 border-r-stone-800 dark:border-r-stone-200',
                      thickBottom && 'border-b-2 border-b-stone-800 dark:border-b-stone-200',
                    )}>
                    {n}
                  </div>
                );
              }),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
