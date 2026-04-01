import { getSudokuSolverSchema } from '@/lib/schema/sudoku-solver-schema';

export function SudokuSolverSchemaScript() {
  const schema = getSudokuSolverSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
