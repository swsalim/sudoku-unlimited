import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  getKidsLevel,
  KIDS_SIZES,
  kidsFaqBySize,
  kidsLevels,
  kidsRulesForKids,
  kidsRulesForParents,
} from '@/lib/kids/content';
import { getKidsSizeSchema } from '@/lib/schema/kids-schema';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { KidsSudokuGame } from '@/components/kids/kids-sudoku-game';

type Props = {
  params: Promise<{ size: string }>;
};

export function generateStaticParams() {
  return KIDS_SIZES.map((size) => ({ size }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).size?.toLowerCase() ?? '';
  const level = getKidsLevel(slug);
  if (!level) return { title: 'Kids Sudoku' };

  const canonical = absoluteUrl(`/kids-sudoku/${level.slug}`);
  return {
    title: `${level.title} · Free Play and Print`,
    description: level.description,
    keywords: [
      `${level.slug} sudoku`,
      'kids sudoku',
      `sudoku for kids ${level.slug}`,
      'printable kids sudoku',
    ],
    alternates: { canonical },
    openGraph: {
      title: `${level.title} · Sudoku Unlimited`,
      description: level.description,
      url: canonical,
    },
    twitter: {
      title: `${level.title} · Free Play and Print`,
      description: level.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function KidsSizePage({ params }: Props) {
  const slug = (await params).size.toLowerCase();
  const level = getKidsLevel(slug);
  if (!level) notFound();

  const schema = getKidsSizeSchema(level.slug, level.h1, level.description);
  const other = kidsLevels.find((item) => item.slug !== level.slug);
  const faqs = kidsFaqBySize[level.slug];

  return (
    <div className="flex grow flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="relative print:py-4">
        <Image
          src="/images/hero-home.webp"
          alt="Sudoku background"
          width={1000}
          height={1000}
          unoptimized
          className="absolute inset-0 h-full w-full object-cover print:hidden"
        />
        <Container className="relative z-10">
          <nav
            aria-label="Breadcrumb"
            className="no-print mb-6 text-sm text-stone-600 dark:text-stone-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-stone-900 dark:hover:text-stone-200">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/kids-sudoku"
                  className="hover:text-stone-900 dark:hover:text-stone-200">
                  Kids Sudoku
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-stone-900 dark:text-stone-100">{level.slug}</li>
            </ol>
          </nav>

          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-4xl font-black text-stone-900 dark:text-stone-50 print:text-black">
              {level.h1}
            </h1>
            <div className="space-y-3 text-lg text-stone-600 dark:text-stone-400 print:text-black">
              {level.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-8">
            <KidsSudokuGame level={level} />
          </div>
        </Container>
      </section>

      <section className="no-print prose max-w-none py-6 dark:prose-invert">
        <Container className="grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
          <div className="w-full">
            <h2 className="font-heading text-3xl font-black dark:text-stone-50">Rules for kids</h2>
            <ul>
              {kidsRulesForKids.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
            <p>
              On this {level.slug} grid the digits are {level.digits}. The box to check is each{' '}
              {level.boxLabel}.
            </p>
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

      <section className="no-print prose max-w-none pb-12 dark:prose-invert">
        <Container>
          <p>
            {other ? (
              <>
                The other kids grid is{' '}
                <Link href={`/kids-sudoku/${other.slug}`}>{other.title}</Link>.{' '}
              </>
            ) : null}
            Full-size puzzles start at <Link href="/easy">Easy Sudoku</Link>, with paper copies on{' '}
            <Link href="/printable/easy">printable easy Sudoku</Link>. Rules for the 9×9 grid are in{' '}
            <Link href="/guides/the-complete-guide-to-how-sudoku-works">how Sudoku works</Link>.
          </p>

          <h2 id="faq" className="font-heading text-2xl font-bold dark:text-stone-50">
            Frequently asked questions
          </h2>
          <dl>
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
