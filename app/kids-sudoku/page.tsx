import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { kidsHubFaqs, kidsLevels, kidsRulesForKids, kidsRulesForParents } from '@/lib/kids/content';
import { getKidsHubSchema } from '@/lib/schema/kids-schema';
import { openGraphImages, twitterImages } from '@/lib/open-graph';
import { absoluteUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';

import { Container } from '@/components/container';
import { buttonVariants } from '@/components/ui/button';

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
    images: openGraphImages,
  },
  twitter: {
    title: 'Kids Sudoku · 4×4 and 6×6 Puzzles',
    description,
    ...twitterImages,
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
                <li className="font-medium text-stone-900 dark:text-stone-100">Kids Sudoku</li>
              </ol>
            </nav>

            <h1 className="font-heading text-4xl font-black dark:text-stone-50">Kids Sudoku</h1>
            <p>
              Kids Sudoku uses a smaller grid than the classic 9×9 puzzle. The rule is the same
              idea: each digit appears once in every row, once in every column, and once in every
              box.
            </p>
            <p>
              Start with 4×4 if the digits should only run from 1 to 4. Move to 6×6 when that feels
              small. Both pages are playable in the browser, and each one can print the current
              puzzle with a solution page.
            </p>
          </div>
          <div>
            <Image
              src="/images/hero-kids.webp"
              alt="Kids Sudoku"
              width={800}
              height={800}
              className="m-0 p-0"
            />
          </div>
        </Container>
      </section>
      <section className="max-w-none py-6">
        <Container className="max-w-6xl">
          <h2 className="font-heading text-3xl font-black dark:text-stone-50">
            Choose a Kids Sudoku Size
          </h2>
          <p className="mt-3 max-w-2xl text-base text-stone-600 dark:text-stone-400">
            Start with 4x4 if you&apos;re new to Sudoku, or try 6x6 when you&apos;re ready for more
            challenge.
          </p>
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {kidsLevels.map((level) => (
              <div key={level.slug}>
                <div className="grid items-center gap-8 md:grid-cols-2">
                  <div className="">
                    <h3 className="font-heading text-2xl font-bold dark:text-stone-50">
                      {level.title}
                    </h3>
                    <p className="mt-1 text-base text-stone-600 dark:text-stone-400">
                      {level.shortDescription}
                    </p>
                  </div>
                  <div className="">
                    <Image
                      src={`/images/kids-${level.slug}.webp`}
                      alt={level.title}
                      width={400}
                      height={400}
                      className="rounded-md"
                    />
                  </div>
                </div>
                <Link
                  href={`/kids-sudoku/${level.slug}`}
                  className={cn(buttonVariants({ variant: 'default' }), 'mt-4 w-full')}>
                  Play {level.slug} Sudoku
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="prose max-w-none py-6 dark:prose-invert">
        <Container className="grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
          <div className="w-full">
            <h2 className="font-heading text-3xl font-black dark:text-stone-50">Rules for kids</h2>
            <ul>
              {kidsRulesForKids.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <h2 className="font-heading text-3xl font-black dark:text-stone-50">
              Notes for parents
            </h2>
            <ul>
              {kidsRulesForParents.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <section className="prose max-w-none py-6 dark:prose-invert">
        <Container className="max-w-6xl">
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
