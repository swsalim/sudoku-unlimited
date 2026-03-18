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
