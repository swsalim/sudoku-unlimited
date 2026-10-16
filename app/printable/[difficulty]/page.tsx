import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  getPrintableLevel,
  PRINTABLE_DIFFICULTIES,
  printableFaqByDifficulty,
  printableLevels,
} from '@/lib/printable/content';
import { createPrintableSheet, defaultPrintableSeed } from '@/lib/printable/sheet';
import { getPrintableDifficultySchema } from '@/lib/schema/printable-schema';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { PrintableSheet } from '@/components/printable/printable-sheet';

type Props = {
  params: Promise<{ difficulty: string }>;
};

export function generateStaticParams() {
  return PRINTABLE_DIFFICULTIES.map((difficulty) => ({ difficulty }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).difficulty?.toLowerCase() ?? '';
  const level = getPrintableLevel(slug);
  if (!level) return { title: 'Printable Sudoku' };

  const canonical = absoluteUrl(`/printable/${level.slug}`);
  return {
    title: `${level.title} · Free Sheets with Solutions`,
    description: level.description,
    keywords: [
      `printable ${level.slug} sudoku`,
      `${level.slug} sudoku pdf`,
      'printable sudoku',
      'sudoku with answers',
    ],
    alternates: { canonical },
    openGraph: {
      title: `${level.title} · Sudoku Unlimited`,
      description: level.description,
      url: canonical,
    },
    twitter: {
      title: `${level.title} · Free Sheets with Solutions`,
      description: level.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrintableDifficultyPage({ params }: Props) {
  const slug = (await params).difficulty.toLowerCase();
  const level = getPrintableLevel(slug);
  if (!level) notFound();

  const puzzles = createPrintableSheet(level.difficulty, defaultPrintableSeed(level.slug));
  const faqs = printableFaqByDifficulty[level.slug];
  const schema = getPrintableDifficultySchema(level.slug, level.description);
  const others = printableLevels.filter((item) => item.slug !== level.slug);

  return (
    <div className="flex grow flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="prose max-w-none py-12 dark:prose-invert print:max-w-none print:py-4">
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
              <li>
                <Link href="/printable" className="hover:text-stone-900 dark:hover:text-stone-200">
                  Printable
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium capitalize text-stone-900 dark:text-stone-100">
                {level.slug}
              </li>
            </ol>
          </nav>

          <h1 className="font-heading text-4xl font-black dark:text-stone-50 print:text-black">
            {level.h1}
          </h1>
          {level.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="no-print">
            Play this level on screen at <Link href={level.playHref}>{level.slug} Sudoku</Link>, or
            go back to the <Link href="/printable">printable Sudoku</Link> list. Smaller grids are
            on <Link href="/kids-sudoku">Kids Sudoku</Link>.
          </p>

          <PrintableSheet level={level} initialPuzzles={puzzles} />

          <h2 className="no-print font-heading text-2xl font-bold dark:text-stone-50">
            Other printable levels
          </h2>
          <ul className="no-print">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={`/printable/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <h2 id="faq" className="no-print font-heading text-2xl font-bold dark:text-stone-50">
            Frequently asked questions
          </h2>
          <dl className="no-print">
            {faqs.map((item) => (
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
