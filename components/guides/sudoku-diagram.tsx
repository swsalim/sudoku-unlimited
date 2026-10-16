import { cellLabel, parseSudokuDiagram, type DiagramCell } from '@/lib/guides/sudoku-diagram';

function CandidateMarks({ cell }: { cell: DiagramCell }) {
  const byDigit = new Map(cell.candidates.map((candidate) => [candidate.digit, candidate]));

  return (
    <span aria-hidden="true" className="grid h-full w-full grid-cols-3 gap-px text-[8px] leading-none sm:text-[9px]">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => {
        const candidate = byDigit.get(digit);
        if (!candidate) {
          return (
            <span key={digit} className="invisible">
              {digit}
            </span>
          );
        }
        return (
          <span
            key={digit}
            className={
              candidate.eliminated
                ? 'font-medium text-rose-700 line-through decoration-rose-700 dark:text-rose-300 dark:decoration-rose-300'
                : 'font-medium text-stone-700 dark:text-stone-200'
            }>
            {digit}
          </span>
        );
      })}
    </span>
  );
}

function cellClass(cell: DiagramCell, cols: number[], rows: number[]): string {
  const classes = [
    'relative h-11 w-11 border border-stone-300 p-0.5 text-center align-middle dark:border-stone-600 sm:h-12 sm:w-12',
  ];
  const colIndex = cols.indexOf(cell.col);
  const rowIndex = rows.indexOf(cell.row);
  if (cell.col % 3 === 1 || colIndex === 0) classes.push('border-l-2 border-l-stone-800 dark:border-l-stone-200');
  if (cell.col % 3 === 0 || colIndex === cols.length - 1) {
    classes.push('border-r-2 border-r-stone-800 dark:border-r-stone-200');
  }
  if (cell.row % 3 === 1 || rowIndex === 0) classes.push('border-t-2 border-t-stone-800 dark:border-t-stone-200');
  if (cell.row % 3 === 0 || rowIndex === rows.length - 1) {
    classes.push('border-b-2 border-b-stone-800 dark:border-b-stone-200');
  }
  if (cell.highlight) {
    classes.push('bg-amber-200/90 dark:bg-amber-700/50');
  } else if (cell.eliminate) {
    classes.push('bg-rose-100 dark:bg-rose-950/60');
  } else if (cell.given) {
    classes.push('bg-white dark:bg-stone-900');
  } else {
    classes.push('bg-stone-50 dark:bg-stone-950');
  }
  return classes.join(' ');
}

type SudokuDiagramProps = {
  source: string;
};

export function SudokuDiagram({ source }: SudokuDiagramProps) {
  const diagram = parseSudokuDiagram(source);
  const byKey = new Map(diagram.cells.map((cell) => [`r${cell.row}c${cell.col}`, cell]));
  const hasHighlight = diagram.cells.some((cell) => cell.highlight);
  const hasElimination = diagram.cells.some(
    (cell) => cell.eliminate || cell.candidates.some((candidate) => candidate.eliminated),
  );

  return (
    <figure className="not-prose my-6 max-w-full">
      <figcaption className="mb-2 text-sm font-medium text-stone-800 dark:text-stone-200">
        {diagram.caption}
      </figcaption>
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-0 text-stone-900 dark:text-stone-50">
          <caption className="sr-only">{diagram.caption}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-8 p-1 text-xs font-medium text-stone-500">
                <span className="sr-only">Row</span>
              </th>
              {diagram.cols.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="p-1 text-center text-xs font-medium text-stone-500 dark:text-stone-400">
                  <span className="sr-only">Column </span>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {diagram.rows.map((row) => (
              <tr key={row}>
                <th
                  scope="row"
                  className="p-1 pr-2 text-right text-xs font-medium text-stone-500 dark:text-stone-400">
                  <span className="sr-only">Row </span>
                  {row}
                </th>
                {diagram.cols.map((col) => {
                  const cell = byKey.get(`r${row}c${col}`);
                  if (!cell) return <td key={col} />;
                  return (
                    <td key={col} className={cellClass(cell, diagram.cols, diagram.rows)} aria-label={cellLabel(cell)}>
                      {cell.given ? (
                        <span aria-hidden="true" className="text-lg font-semibold leading-none">
                          {cell.given}
                        </span>
                      ) : (
                        <CandidateMarks cell={cell} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasHighlight || hasElimination ? (
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600 dark:text-stone-400">
          {hasHighlight ? (
            <li className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 border border-stone-400 bg-amber-200 dark:bg-amber-700/70" />
              Pattern cells
            </li>
          ) : null}
          {hasElimination ? (
            <li className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 border border-stone-400 bg-rose-100 dark:bg-rose-950" />
              Cells that lose a candidate
            </li>
          ) : null}
        </ul>
      ) : null}
    </figure>
  );
}
