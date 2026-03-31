import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Killer Sudoku · Play Free Online',
  description:
    'Play Killer Sudoku online for free. Solve cage-sum puzzles from easy to extreme with no signup required.',
};

export default function KillerSudokuIndexPage() {
  redirect('/killer-sudoku/easy');
}
