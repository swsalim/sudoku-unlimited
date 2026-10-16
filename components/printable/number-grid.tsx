import { cn } from '@/lib/utils';

type NumberGridProps = {
  grid: number[][];
  label: string;
  boxRows?: number;
  boxCols?: number;
  className?: string;
};

export function NumberGrid({ grid, label, boxRows = 3, boxCols = 3, className }: NumberGridProps) {
  const size = grid.length;

  return (
    <figure className={cn('printable-puzzle', className)}>
      <figcaption className="mb-2 text-sm font-semibold text-stone-800 dark:text-[color:var(--sudoku-cell-text)] print:text-black">
        {label}
      </figcaption>
      <table
        className="border-collapse border-2 border-stone-900 bg-white text-stone-900 dark:border-[color:var(--sudoku-cell-initial-text)] dark:bg-[color:var(--sudoku-board-bg)] dark:text-[color:var(--sudoku-cell-initial-text)] print:border-black print:bg-white print:text-black"
        aria-label={label}
      >
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => {
                const thickRight = (colIndex + 1) % boxCols === 0 && colIndex !== size - 1;
                const thickBottom = (rowIndex + 1) % boxRows === 0 && rowIndex !== size - 1;
                return (
                  <td
                    key={colIndex}
                    className={cn(
                      'size-6 border border-stone-300 bg-white text-center text-xs font-semibold leading-none dark:border-[color:var(--sudoku-cell-border)] dark:bg-[color:var(--sudoku-cell-bg)] sm:size-7 sm:text-sm print:size-6 print:border-stone-400 print:bg-white print:text-[11px] print:text-black',
                      thickRight &&
                        'border-r-2 border-r-stone-900 dark:border-r-[color:var(--sudoku-cell-initial-text)] print:border-r-black',
                      thickBottom &&
                        'border-b-2 border-b-stone-900 dark:border-b-[color:var(--sudoku-cell-initial-text)] print:border-b-black',
                    )}
                  >
                    {value || ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
