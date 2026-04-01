import type { Metadata } from 'next';
import Link from 'next/link';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { SudokuSolverSchemaScript } from '@/components/schemas';
import { SudokuSolver } from '@/components/sudoku-solver';
import { SudokuSolverFaqSection } from '@/components/sudoku-solver-faq-section';

const title = 'Sudoku Solver - Solve This Sudoku Puzzle Online';
const description =
  'Use this free Sudoku solver to solve this Sudoku puzzle instantly or with step-by-step explanations. Enter your 9x9 grid, validate conflicts, and get the full solution online.';
const canonicalUrl = absoluteUrl('/sudoku-solver');

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'solve this sudoku',
    'sudoku solver',
    'solve sudoku online',
    'sudoku puzzle solver',
    'free sudoku solver',
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
  },
  twitter: {
    title,
    description,
  },
};

export default function SudokuSolverPage() {
  return (
    <>
      <SudokuSolverSchemaScript />
      <SudokuSolver />

      <section className="prose mt-8 max-w-none dark:prose-invert">
        <Container>
          <h2 className="font-heading text-3xl font-black dark:text-stone-50">
            How to Solve This Sudoku Quickly
          </h2>
          <p>
            If you are stuck and searching for how to solve this Sudoku, enter your known digits
            into the grid above and press <strong>Solve</strong>. The solver applies standard Sudoku
            rules (rows, columns, and 3x3 boxes) and fills the board in seconds.
          </p>
          <p>
            Want to learn instead of jumping to the final answer? Use{' '}
            <strong>Explain Next Step</strong> for guided logic or <strong>Show All Steps</strong>{' '}
            to view a full sequence of explainable moves.
          </p>

          <h3 className="font-heading text-2xl font-bold dark:text-stone-50">
            How to Enter Your Puzzle
          </h3>
          <ol>
            <li>Copy only the given numbers from your puzzle.</li>
            <li>Leave unknown cells empty.</li>
            <li>Use one digit (1-9) per cell.</li>
            <li>Click Solve to get the completed grid.</li>
          </ol>

          <h3 className="font-heading text-2xl font-bold dark:text-stone-50">
            Why Your Sudoku Might Not Solve
          </h3>
          <p>
            If the solver reports an invalid or unsolvable puzzle, there is usually a typo in the
            input clues. Re-check repeated digits in each row, column, and 3x3 box, then try again.
          </p>

          <h3 className="font-heading text-2xl font-bold dark:text-stone-50">
            Practice on New Puzzles
          </h3>
          <p>
            After checking your answer, practice with playable boards on our{' '}
            <Link href="/">classic Sudoku page</Link> or try a variant on{' '}
            <Link href="/killer-sudoku">Killer Sudoku</Link>.
          </p>
        </Container>
      </section>

      <SudokuSolverFaqSection />
    </>
  );
}
