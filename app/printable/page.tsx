import type { Metadata } from 'next';
import Link from 'next/link';

import { printableHubFaqs, printableLevels } from '@/lib/printable/content';
import { getPrintableHubSchema } from '@/lib/schema/printable-schema';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';

const description =
  'Print free Sudoku sheets for Easy, Medium, Hard, and Expert. Each page has four puzzles from the site generator and a solution page you can print or save as a PDF.';

export const metadata: Metadata = {
  title: 'Printable Sudoku · Free Puzzle Sheets',
  description,
  alternates: { canonical: absoluteUrl('/printable') },
  openGraph: {
    title: 'Printable Sudoku · Sudoku Unlimited',
    description,
    url: absoluteUrl('/printable'),
  },
  twitter: {
    title: 'Printable Sudoku · Free Puzzle Sheets',
    description,
  },
  robots: { index: true, follow: true },
};

export default function PrintableHubPage() {
  const schema = getPrintableHubSchema();

  return (
    <div className="flex grow flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="prose max-w-none py-12 dark:prose-invert print:py-0">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="not-prose no-print mb-6 text-sm text-stone-600 dark:text-stone-400"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-stone-900 dark:hover:text-stone-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-stone-900 dark:text-stone-100">Printable Sudoku</li>
            </ol>
          </nav>

          <h1 className="font-heading text-4xl font-black dark:text-stone-50">Printable Sudoku</h1>
          <p>
            Print a Sudoku sheet, or save it as a PDF, without leaving the puzzles that Sudoku
            Unlimited already generates for online play. Each difficulty page builds four grids and
            a matching solution page.
          </p>
          <p>
            The rules do not change on paper. Every row, every column, and every 3×3 box still
            contains the digits 1–9 once. Givens are printed. Empty cells are blank so you can write
            the rest. For a smaller grid, see <Link href="/kids-sudoku">Kids Sudoku</Link>.
          </p>

          <h2 className="font-heading text-2xl font-bold dark:text-stone-50">
            Choose a difficulty
          </h2>
          <ul>
            {printableLevels.map((level) => (
              <li key={level.slug}>
                <Link href={`/printable/${level.slug}`}>{level.title}</Link>
                {' — '}
                {level.intro[0]}
              </li>
            ))}
          </ul>
          <p>
            Prefer a screen? Play <Link href="/easy">Easy</Link>, <Link href="/medium">Medium</Link>
            , <Link href="/hard">Hard</Link>, or <Link href="/expert">Expert</Link>, or read{' '}
            <Link href="/guides/the-complete-guide-to-how-sudoku-works">how Sudoku works</Link>.
          </p>

          <h2 className="font-heading text-2xl font-bold dark:text-stone-50">How to print</h2>
          <ol>
            <li>Open a difficulty page and look over the four puzzles.</li>
            <li>Use Print or save as PDF for the browser dialog, or Download PDF for a file.</li>
            <li>Solutions print on the next page. Choose a page range if you want puzzles only.</li>
            <li>Use New puzzles when you want another sheet at the same difficulty.</li>
          </ol>

          <h2 id="faq" className="font-heading text-2xl font-bold dark:text-stone-50">
            Frequently asked questions
          </h2>
          <dl>
            {printableHubFaqs.map((item) => (
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
