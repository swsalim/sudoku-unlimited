import { cn } from '@/lib/utils';

import type { Cell as CellType } from '../types';

interface CellProps {
  cell: CellType;
  isSelected: boolean;
  isHighlighted: boolean;
  isSameNumber: boolean;
  onClick: () => void;
  tabIndex: number;
  role: string;
  'aria-selected': boolean;
  className?: string;
  cageSum?: number;
  cageBorders?: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
}

export function Cell({
  cell,
  isSelected,
  isHighlighted,
  isSameNumber,
  onClick,
  tabIndex,
  role,
  'aria-selected': ariaSelected,
  className,
  cageSum,
  cageBorders,
}: CellProps) {
  const baseClasses =
    'size-8 md:size-14 flex items-center justify-center border relative transition-colors text-[color:var(--sudoku-cell-text)] border-[color:var(--sudoku-cell-border)] bg-[color:var(--sudoku-cell-bg)] rounded-[var(--sudoku-cell-radius)]';
  const highlightClasses = isSelected
    ? 'bg-[color:var(--sudoku-cell-selected-bg)]'
    : isHighlighted
      ? 'bg-[color:var(--sudoku-cell-highlighted-bg)]'
      : isSameNumber
        ? 'bg-[color:var(--sudoku-cell-same-number-bg)]'
        : '';
  const errorClasses = cell.hasError
    ? 'bg-[color:var(--sudoku-cell-error-bg)] text-[color:var(--sudoku-cell-error-text)]'
    : '';
  const valueClasses = cell.isInitial
    ? 'text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[color:var(--sudoku-cell-initial-text)]'
    : 'text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold text-inherit';

  return (
    <button
      className={cn(baseClasses, highlightClasses, errorClasses, className)}
      onClick={onClick}
      disabled={cell.isInitial || false}
      tabIndex={tabIndex}
      role={role}
      aria-selected={ariaSelected}>
      {cageBorders?.top && (
        <span
          className="pointer-events-none absolute left-0 right-0 top-0 h-[2px]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, rgb(14 165 233 / 0.95) 0 8px, transparent 8px 14px)',
          }}
        />
      )}
      {cageBorders?.right && (
        <span
          className="pointer-events-none absolute bottom-0 right-0 top-0 w-[2px]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgb(14 165 233 / 0.95) 0 8px, transparent 8px 14px)',
          }}
        />
      )}
      {cageBorders?.bottom && (
        <span
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, rgb(14 165 233 / 0.95) 0 8px, transparent 8px 14px)',
          }}
        />
      )}
      {cageBorders?.left && (
        <span
          className="pointer-events-none absolute bottom-0 left-0 top-0 w-[2px]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgb(14 165 233 / 0.95) 0 8px, transparent 8px 14px)',
          }}
        />
      )}
      {typeof cageSum === 'number' && (
        <span className="absolute left-1 top-1 text-xs font-semibold leading-none text-stone-600 dark:text-stone-400">
          {cageSum}
        </span>
      )}
      {cell.value ? (
        <span className={valueClasses}>{cell.value}</span>
      ) : (
        <div className="absolute inset-0.5 grid grid-cols-3 grid-rows-3 gap-0.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <span
              key={num}
              className="flex h-full w-full items-center justify-center text-[10px] leading-tight text-[color:var(--sudoku-cell-notes-text)] sm:text-xs md:text-sm">
              {cell.notes.has(num) ? num : ''}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
