import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { printableHubFaqs, printableLevels } from '@/lib/printable/content';
import { getPrintableHubSchema } from '@/lib/schema/printable-schema';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { DifficultyLevelCards } from '@/components/difficulty-page-sections';

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
      <section className="prose max-w-none pt-12 dark:prose-invert print:py-0">
        <Container className="grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
          <div className="w-full">
            <nav
              aria-label="Breadcrumb"
              className="not-prose no-print mb-6 text-sm text-stone-600 dark:text-stone-400">
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

            <h1 className="font-heading text-4xl font-black dark:text-stone-50">
              Printable Sudoku Puzzle
            </h1>
            <p>
              Print a Sudoku sheet, or save it as a PDF, without leaving the puzzles that Sudoku
              Unlimited already generates for online play. Each difficulty page builds four grids
              and a matching solution page.
            </p>
            <p>
              The rules do not change on paper. Every row, every column, and every 3×3 box still
              contains the digits 1–9 once. Givens are printed. Empty cells are blank so you can
              write the rest. For a smaller grid, see <Link href="/kids-sudoku">Kids Sudoku</Link>.
            </p>
          </div>
          <div>
            <Image
              src="/images/hero-printable.webp"
              alt="Printable Sudoku"
              width={800}
              height={800}
            />
          </div>
        </Container>
      </section>

      <section className="prose max-w-none pb-6 dark:prose-invert print:py-6">
        <Container className="max-w-6xl">
          <h2 className="font-heading text-2xl font-bold dark:text-stone-50">
            Choose a difficulty Level
          </h2>
          <p>
            Each difficulty page has four puzzles and a matching solution page. The rules are the
            same as our online game: every row, every column, and every 3×3 box contains the digits
            1–9 once. Givens are printed. Empty cells are blank so you can write the rest.
          </p>
          <DifficultyLevelCards
            action="Print"
            slugs={printableLevels.map((level) => level.slug)}
            hrefFor={(slug) => `/printable/${slug}`}
            className="mt-6"
          />
          <p>
            Prefer a screen? Play <Link href="/easy">Easy</Link>, <Link href="/medium">Medium</Link>
            , <Link href="/hard">Hard</Link>, or <Link href="/expert">Expert</Link>, or read{' '}
            <Link href="/guides/the-complete-guide-to-how-sudoku-works">how Sudoku works</Link>.
          </p>
        </Container>
      </section>

      <section className="prose max-w-none py-6 dark:prose-invert print:py-6">
        <Container className="flex max-w-6xl flex-col gap-10 md:flex-row">
          <div className="w-full md:w-2/5">
            <Image src="/images/how-to-print.webp" alt="How to print" width={800} height={800} />
          </div>
          <div className="w-full md:w-3/5">
            <h2 className="font-heading text-3xl font-black dark:text-stone-50">How to print</h2>
            <ol>
              <li>Open a difficulty page and look over the four puzzles.</li>
              <li>Use Print or save as PDF for the browser dialog, or Download PDF for a file.</li>
              <li>
                Solutions print on the next page. Choose a page range if you want puzzles only.
              </li>
              <li>Use New puzzles when you want another sheet at the same difficulty.</li>
            </ol>
          </div>
        </Container>
      </section>

      <section className="prose max-w-none pb-12 pt-6 dark:prose-invert print:py-6">
        <Container className="">
          <h2 className="font-heading text-3xl font-black dark:text-stone-50">
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
