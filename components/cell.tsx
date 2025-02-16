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
    'size-10 sm:size-12 md:size-16 flex items-center justify-center border border-green-900/30 relative text-green-900';
  const highlightClasses = isSelected
    ? 'bg-green-300/70'
    : isHighlighted
      ? 'bg-green-100'
      : isSameNumber
        ? 'bg-green-100/50'
        : '';
  const errorClasses = cell.hasError ? 'bg-green-100 text-red-500' : '';
  const valueClasses = cell.isInitial
    ? 'text-xl sm:text-3xl font-medium text-inherit'
    : 'text-xl sm:text-3xl font-medium text-inherit';

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
              className="flex h-full w-full items-center justify-center text-sm leading-tight text-green-700">
              {cell.notes.has(num) ? num : ''}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
