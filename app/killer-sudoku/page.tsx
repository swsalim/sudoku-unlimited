import type { Metadata } from 'next';
import Link from 'next/link';

import { killerHubFaqs, getKillerHubSchema } from '@/lib/schema/killer-schema';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';

const description =
  'Learn Killer Sudoku rules — cages, sums, and no repeated digits — then play free puzzles from Easy to Extreme.';

const levels = [
  {
    href: '/killer-sudoku/easy',
    title: 'Easy Killer Sudoku',
    text: 'More given digits and simpler cages for learning sums alongside ordinary elimination.',
  },
  {
    href: '/killer-sudoku/medium',
    title: 'Medium Killer Sudoku',
    text: 'Cage totals start to interact with rows, columns, and boxes.',
  },
  {
    href: '/killer-sudoku/hard',
    title: 'Hard Killer Sudoku',
    text: 'Fewer givens, so progress depends on combining cage combinations with Sudoku constraints.',
  },
  {
    href: '/killer-sudoku/expert',
    title: 'Expert Killer Sudoku',
    text: 'Tighter cages and longer candidate lists for solvers who already finish Hard.',
  },
  {
    href: '/killer-sudoku/master',
    title: 'Master Killer Sudoku',
    text: 'Sparse givens and cages that have to be tracked across several regions.',
  },
  {
    href: '/killer-sudoku/extreme',
    title: 'Extreme Killer Sudoku',
    text: 'No given digits. The cages and the classic rules are the whole puzzle.',
  },
] as const;

export const metadata: Metadata = {
  title: 'Killer Sudoku · Rules and Free Puzzles',
  description,
  alternates: { canonical: absoluteUrl('/killer-sudoku') },
  openGraph: {
    title: 'Killer Sudoku · Sudoku Unlimited',
    description,
    url: absoluteUrl('/killer-sudoku'),
  },
  twitter: {
    title: 'Killer Sudoku · Rules and Free Puzzles',
    description,
  },
  robots: { index: true, follow: true },
};

export default function KillerSudokuPage() {
  const schema = getKillerHubSchema();

  return (
    <div className="flex grow flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="prose max-w-none py-12 dark:prose-invert">
        <Container>
          <nav aria-label="Breadcrumb" className="not-prose mb-6 text-sm text-stone-600 dark:text-stone-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-stone-900 dark:hover:text-stone-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-stone-900 dark:text-stone-100">Killer Sudoku</li>
            </ol>
          </nav>

          <h1 className="font-heading text-4xl font-black dark:text-stone-50">Killer Sudoku</h1>
          <p>
            Killer Sudoku keeps the classic grid and adds cages: outlined groups of cells with a
            sum in the corner. You still fill every row, column, and 3×3 box with the digits 1–9
            exactly once. You also make each cage add up to its clue, without repeating a digit
            inside that cage.
          </p>
          <p>
            Play starts on a difficulty page. Easier levels on Sudoku Unlimited include some given
            digits as well as cages. Extreme starts with cages only. The rules below are the same
            at every level.
          </p>

          <h2 className="font-heading text-2xl font-bold dark:text-stone-50">Rules of Killer Sudoku</h2>
          <h3 className="font-heading text-xl font-bold dark:text-stone-50">Classic rules still apply</h3>
          <p>
            Each row, each column, and each 3×3 box contains the digits 1 through 9 once. A digit
            that is legal for a cage can still be illegal for its row, column, or box.
          </p>
          <h3 className="font-heading text-xl font-bold dark:text-stone-50">Cages</h3>
          <p>
            A cage is a connected group of cells, drawn with a border inside the grid. Cages may
            cross a box boundary. The sum is printed in the first cell of the cage. On this site
            that clue sits in the corner of the earliest cell in the cage.
          </p>
          <h3 className="font-heading text-xl font-bold dark:text-stone-50">Sums</h3>
          <p>
            The digits in a cage must add up to the printed sum. The sum does not tell you the
            order. A two-cell cage totaling 10 might be 1 and 9, 2 and 8, 3 and 7, or 4 and 6. It
            cannot be 5 and 5, because a cage cannot repeat a digit. Some sums allow only one
            combination: 3 is 1+2, 4 is 1+3, 16 is 7+9, and 17 is 8+9.
          </p>
          <h3 className="font-heading text-xl font-bold dark:text-stone-50">No repeats in a cage</h3>
          <p>
            Digits inside one cage are unique, even when the cage stretches across two boxes. A
            repeat that would be legal in two different boxes is still illegal if both cells belong
            to the same cage.
          </p>

          <h2 className="font-heading text-2xl font-bold dark:text-stone-50">Tips</h2>
          <ul>
            <li>Write the combinations for two-cell cages before you fill anything else.</li>
            <li>
              When a cage has only one combination, those digits are locked to the cage even though
              the order is still unknown.
            </li>
            <li>Reject a digit that would push the cage over its sum, or leave a total you cannot reach.</li>
            <li>
              Cross-check every cage digit against its row, column, and box. Cage arithmetic does
              not replace those scans.
            </li>
            <li>
              Use pencil marks for the digits a cell can still hold, and update them when a cage
              combination shrinks.
            </li>
          </ul>
          <p>
            Classic elimination is the same skill as in{' '}
            <Link href="/guides/the-complete-guide-to-how-sudoku-works">how Sudoku works</Link> and{' '}
            <Link href="/guides/solve-sudoku-without-guessing">solving without guessing</Link>.
            Killer puzzles add the cage list on top of that routine.
          </p>

          <h2 className="font-heading text-2xl font-bold dark:text-stone-50">Play by difficulty</h2>
          <ul>
            {levels.map((level) => (
              <li key={level.href}>
                <Link href={level.href}>{level.title}</Link>
                {' — '}
                {level.text}
              </li>
            ))}
          </ul>

          <h2 id="faq" className="font-heading text-2xl font-bold dark:text-stone-50">
            Frequently asked questions
          </h2>
          <dl>
            {killerHubFaqs.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold">{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </div>
  );
}
