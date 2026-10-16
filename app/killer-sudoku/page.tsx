import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { GridFour, Prohibit, RectangleDashed, Sigma } from '@phosphor-icons/react/ssr';

import { getKillerHubSchema, killerHubFaqs } from '@/lib/schema/killer-schema';
import { openGraphImages, twitterImages } from '@/lib/open-graph';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { DifficultyLevelCards } from '@/components/difficulty-page-sections';

const description =
  'Learn Killer Sudoku rules — cages, sums, and no repeated digits — then play free puzzles from Easy to Extreme.';

const RULES = [
  {
    title: 'Classic rules still apply',
    description: 'Each row, column, and 3×3 box contains the digits 1–9 once.',
    icon: GridFour,
    iconClass: 'bg-blue-100 text-blue-500 dark:bg-blue-500/15 dark:text-blue-300',
  },
  {
    title: 'Cages',
    description:
      'A cage is a connected group of cells with a sum in the corner. Cages may cross box boundaries.',
    icon: RectangleDashed,
    iconClass: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
  {
    title: 'Sums',
    description: 'The digits in a cage must add up to the given sum. The order does not matter.',
    icon: Sigma,
    iconClass: 'bg-amber-100 text-amber-500 dark:bg-amber-500/15 dark:text-amber-300',
  },
  {
    title: 'No repeats in a cage',
    description: 'Digits inside a cage are unique, even if the cage spans multiple boxes.',
    icon: Prohibit,
    iconClass: 'bg-rose-100 text-rose-500 dark:bg-rose-500/15 dark:text-rose-300',
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
    images: openGraphImages,
  },
  twitter: {
    title: 'Killer Sudoku · Rules and Free Puzzles',
    description,
    ...twitterImages,
  },
  robots: { index: true, follow: true },
};

export default function KillerSudokuPage() {
  const schema = getKillerHubSchema();

  return (
    <div className="flex grow flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="prose max-w-none py-12 dark:prose-invert">
        <Container className="grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
          <div className="w-full">
            <nav
              aria-label="Breadcrumb"
              className="not-prose mb-6 text-sm text-stone-600 dark:text-stone-400">
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
              exactly once.
            </p>
            <p>
              Easier levels include some given digits as well as cages. Extreme starts with cages
              only. Play starts on a difficulty page below.
            </p>
          </div>
          <div>
            <Image
              src="/images/hero-killer-sudoku.webp"
              alt="Killer Sudoku"
              width={800}
              height={800}
              className="m-0 p-0"
            />
          </div>
        </Container>
      </section>

      <section className="py-6">
        <Container className="max-w-6xl">
          <h2 className="font-heading text-3xl font-black text-stone-900 dark:text-stone-50">
            Rules of Killer Sudoku
          </h2>
          <p className="mt-3 max-w-2xl text-base text-stone-600 dark:text-stone-400">
            Killer Sudoku follows the same logic as classic Sudoku, with two extra rules for cages.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RULES.map(({ title, description: ruleDescription, icon: Icon, iconClass }) => (
              <div
                key={title}
                className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
                <span
                  className={`inline-flex size-12 items-center justify-center rounded-xl ${iconClass}`}>
                  <Icon weight="duotone" size={26} aria-hidden />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-stone-900 dark:text-stone-50">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{ruleDescription}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-6">
        <Container className="max-w-6xl">
          <h2 className="font-heading text-3xl font-black text-stone-900 dark:text-stone-50">
            Play Killer Sudoku by Difficulty
          </h2>
          <p className="mt-3 max-w-2xl text-base text-stone-600 dark:text-stone-400">
            Choose a difficulty level to start playing. Easier levels include more given digits and
            simpler cages.
          </p>
          <DifficultyLevelCards
            action="Play"
            hrefFor={(slug) => `/killer-sudoku/${slug}`}
            className="mt-8"
          />
        </Container>
      </section>

      <section className="prose max-w-none py-6 dark:prose-invert">
        <Container className="flex max-w-6xl flex-col gap-10 md:flex-row">
          <div className="w-full md:w-2/5">
            <Image
              src="/images/hero-killer-sudoku.webp"
              alt="Killer Sudoku tips"
              width={800}
              height={800}
            />
          </div>
          <div className="w-full md:w-3/5">
            <h2 className="font-heading text-3xl font-black dark:text-stone-50">Tips</h2>
            <ul>
              <li>Write the combinations for two-cell cages before you fill anything else.</li>
              <li>
                Some sums allow only one combination: 3 is 1+2, 4 is 1+3, 16 is 7+9, and 17 is
                8+9. A cage cannot repeat a digit, so 10 is never 5 and 5.
              </li>
              <li>
                Reject a digit that would push the cage over its sum, or leave a total you cannot
                reach.
              </li>
              <li>
                Cross-check every cage digit against its row, column, and box. Cage arithmetic does
                not replace those scans.
              </li>
            </ul>
            <p>
              Classic elimination is the same skill as in{' '}
              <Link href="/guides/the-complete-guide-to-how-sudoku-works">how Sudoku works</Link>{' '}
              and{' '}
              <Link href="/guides/solve-sudoku-without-guessing">solving without guessing</Link>.
            </p>
          </div>
        </Container>
      </section>
      <section className="prose max-w-none py-6 dark:prose-invert">
        <Container className="max-w-6xl">
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
