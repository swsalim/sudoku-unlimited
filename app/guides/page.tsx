import type { Metadata } from 'next';

import { getAllGuides, getFeaturedGuide } from '@/lib/guides/load-guide';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { GuideSchemaScript } from '@/components/schemas';
import { TransitionLink } from '@/components/transition-link';

export const metadata: Metadata = {
  title: 'Sudoku Guides',
  description:
    'Learn how Sudoku works, build a repeatable solving routine, and explore advanced techniques with free in-depth guides from Sudoku Unlimited.',
  alternates: {
    canonical: absoluteUrl('/guides'),
  },
  openGraph: {
    title: 'Sudoku Guides · Sudoku Unlimited',
    description: 'Rules, beginner approaches, and advanced solving techniques for classic Sudoku.',
    url: absoluteUrl('/guides'),
  },
  robots: { index: true, follow: true },
};

export default function GuidesIndexPage() {
  const featured = getFeaturedGuide();
  const guides = getAllGuides().filter((g) => !g.featured && g.group !== 'techniques');
  const techniques = getAllGuides().filter((g) => g.group === 'techniques');

  return (
    <div className="flex grow flex-col">
      <GuideSchemaScript />
      <Container className="py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-stone-600 dark:text-stone-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <TransitionLink href="/" className="hover:text-stone-900 dark:hover:text-stone-200">
                Home
              </TransitionLink>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-stone-900 dark:text-stone-100">Guides</li>
          </ol>
        </nav>

        <h1 className="font-heading text-4xl font-black tracking-tight text-stone-900 dark:text-stone-50">
          Sudoku <span className="text-[color:var(--app-accent-strong)]">guides</span>
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600 dark:text-stone-400">
          Step-by-step articles on rules, candidate notes, and named solving techniques—written for
          players who want a logical next step.
        </p>

        <section aria-label="Featured guide" className="mt-10">
          <TransitionLink
            href={`/guides/${featured.slug}`}
            className="block rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm transition hover:border-amber-300 dark:border-amber-900/50 dark:from-amber-950/40 dark:to-stone-900/60"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-200">
              Featured guide
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-stone-900 dark:text-stone-50">
              {featured.title}
            </h2>
            <p className="mt-2 text-stone-700 dark:text-stone-300">{featured.meta_description}</p>
            <p className="mt-4 text-sm font-medium text-stone-600 dark:text-stone-400">
              {featured.readMinutes} min read
            </p>
          </TransitionLink>
        </section>

        <section aria-label="More guides" className="mt-12">
          <h2 className="font-heading text-xl font-bold text-stone-900 dark:text-stone-50">
            More guides
          </h2>
          <ul className="mt-4 divide-y divide-stone-200 dark:divide-stone-700">
            {guides.map((guide) => (
              <li key={guide.slug} className="py-5">
                <TransitionLink href={`/guides/${guide.slug}`} className="group block">
                  <h3 className="font-heading text-lg font-semibold text-stone-900 group-hover:text-[color:var(--app-accent-strong)] dark:text-stone-50">
                    {guide.title}
                  </h3>
                  <p className="mt-1 text-stone-600 dark:text-stone-400">
                    {guide.meta_description}
                  </p>
                  <p className="mt-2 text-sm text-stone-500">{guide.readMinutes} min read</p>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Print and kids puzzles" className="mt-12">
          <h2 className="font-heading text-xl font-bold text-stone-900 dark:text-stone-50">
            Print and kids puzzles
          </h2>
          <p className="mt-2 max-w-2xl text-stone-600 dark:text-stone-400">
            The same classic rules, off the 9×9 game board. Print a sheet or start on a smaller
            grid.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li>
              <TransitionLink
                href="/printable"
                className="block rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-stone-300 dark:border-stone-700 dark:bg-stone-900/50"
              >
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  Printable Sudoku
                </span>
                <span className="mt-1 block text-sm text-stone-600 dark:text-stone-400">
                  Easy, Medium, Hard, and Expert sheets with a solution page.
                </span>
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                href="/kids-sudoku"
                className="block rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-stone-300 dark:border-stone-700 dark:bg-stone-900/50"
              >
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  Kids Sudoku
                </span>
                <span className="mt-1 block text-sm text-stone-600 dark:text-stone-400">
                  Playable 4×4 and 6×6 grids, with rules and a printable puzzle.
                </span>
              </TransitionLink>
            </li>
          </ul>
        </section>

        <section aria-label="Techniques" className="mt-12">
          <h2 className="font-heading text-xl font-bold text-stone-900 dark:text-stone-50">
            Techniques
          </h2>
          <p className="mt-2 max-w-2xl text-stone-600 dark:text-stone-400">
            One page per pattern, from singles through fish and wings. Start with{' '}
            <TransitionLink
              href="/guides/solve-sudoku-without-guessing"
              className="font-medium text-[color:var(--app-accent-strong)] hover:underline"
            >
              how to solve Sudoku without guessing
            </TransitionLink>{' '}
            if you want the order to use them in.
          </p>
          <ul className="mt-4 divide-y divide-stone-200 dark:divide-stone-700">
            {techniques.map((guide) => (
              <li key={guide.slug} className="py-5">
                <TransitionLink href={`/guides/${guide.slug}`} className="group block">
                  <h3 className="font-heading text-lg font-semibold text-stone-900 group-hover:text-[color:var(--app-accent-strong)] dark:text-stone-50">
                    {guide.title}
                  </h3>
                  <p className="mt-1 text-stone-600 dark:text-stone-400">
                    {guide.meta_description}
                  </p>
                  <p className="mt-2 text-sm text-stone-500">{guide.readMinutes} min read</p>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
