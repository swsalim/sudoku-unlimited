import type { Metadata } from 'next';
import Link from 'next/link';

import { kidsHubFaqs, kidsLevels, kidsRulesForKids, kidsRulesForParents } from '@/lib/kids/content';
import { getKidsHubSchema } from '@/lib/schema/kids-schema';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';

const description =
  'Play free kids Sudoku on a 4×4 or 6×6 grid. Rules for kids and parents, plus a printable puzzle with its solution.';

export const metadata: Metadata = {
  title: 'Kids Sudoku · 4×4 and 6×6 Puzzles',
  description,
  alternates: { canonical: absoluteUrl('/kids-sudoku') },
  openGraph: {
    title: 'Kids Sudoku · Sudoku Unlimited',
    description,
    url: absoluteUrl('/kids-sudoku'),
  },
  twitter: {
    title: 'Kids Sudoku · 4×4 and 6×6 Puzzles',
    description,
  },
  robots: { index: true, follow: true },
};

export default function KidsSudokuPage() {
  const schema = getKidsHubSchema();

  return (
    <div className="flex grow flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="prose max-w-none py-12 dark:prose-invert">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="not-prose mb-6 text-sm text-stone-600 dark:text-stone-400"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-stone-900 dark:hover:text-stone-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-stone-900 dark:text-stone-100">Kids Sudoku</li>
            </ol>
          </nav>

          <h1 className="font-heading text-4xl font-black dark:text-stone-50">Kids Sudoku</h1>
          <p>
            Kids Sudoku uses a smaller grid than the classic 9×9 puzzle. The rule is the same idea:
            each digit appears once in every row, once in every column, and once in every box.
          </p>
          <p>
            Start with 4×4 if the digits should only run from 1 to 4. Move to 6×6 when that feels
            small. Both pages are playable in the browser, and each one can print the current puzzle
            with a solution page.
          </p>

          <h2 className="font-heading text-2xl font-bold dark:text-stone-50">
            Play a smaller grid
          </h2>
          <ul>
            {kidsLevels.map((level) => (
              <li key={level.slug}>
                <Link href={`/kids-sudoku/${level.slug}`}>{level.title}</Link>
                {' — '}
                digits {level.digits}, each {level.boxLabel} included once.
              </li>
            ))}
          </ul>

          <h2 className="font-heading text-2xl font-bold dark:text-stone-50">Rules for kids</h2>
          <ul>
            {kidsRulesForKids.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>

          <h2 className="font-heading text-2xl font-bold dark:text-stone-50">Notes for parents</h2>
          <ul>
            {kidsRulesForParents.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
          <p>
            When a 6×6 grid is comfortable, <Link href="/easy">Easy Sudoku</Link> is the full 9×9
            game. Paper versions of that size are on <Link href="/printable">printable Sudoku</Link>
            . The longer explanation of the classic grid is in{' '}
            <Link href="/guides/the-complete-guide-to-how-sudoku-works">how Sudoku works</Link>.
          </p>

          <h2 id="faq" className="font-heading text-2xl font-bold dark:text-stone-50">
            Frequently asked questions
          </h2>
          <dl>
            {kidsHubFaqs.map((item) => (
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
