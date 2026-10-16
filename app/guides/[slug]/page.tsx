import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { guideSlugs } from '@/lib/guides/registry';
import { getGuideBySlug } from '@/lib/guides/load-guide';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { GuideContents } from '@/components/guides/guide-contents';
import { GuideMarkdown } from '@/components/guides/guide-markdown';
import { RelatedGuidesSection } from '@/components/guides/related-guides-section';
import { RelatedPlaySection } from '@/components/guides/related-play-section';
import { GuideSchemaScript } from '@/components/schemas';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const canonicalUrl = absoluteUrl(`/guides/${guide.slug}`);
  const keywords = [
    guide.primary_keyword,
    ...(guide.secondary_keywords ?? []),
  ].filter(Boolean) as string[];

  return {
    title: guide.meta_title,
    description: guide.meta_description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${guide.title} · Sudoku Unlimited`,
      description: guide.meta_description,
      url: canonicalUrl,
      images: [
        {
          url: absoluteUrl('/images/og-default.png'),
          alt: guide.title,
        },
      ],
    },
    twitter: {
      title: guide.meta_title,
      description: guide.meta_description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return (
    <div className="flex grow flex-col">
      <GuideSchemaScript guide={guide} />
      <Container className="py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-stone-600 dark:text-stone-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-stone-900 dark:hover:text-stone-200">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/guides" className="hover:text-stone-900 dark:hover:text-stone-200">
                Guides
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="line-clamp-1 font-medium text-stone-900 dark:text-stone-100">
              {guide.title}
            </li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <h1 className="font-heading text-3xl font-black tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg text-stone-600 dark:text-stone-400">{guide.meta_description}</p>
          <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">
            <time dateTime={guide.dateModified}>
              Updated{' '}
              {new Intl.DateTimeFormat('en-US', {
                dateStyle: 'long',
                timeZone: 'UTC',
              }).format(new Date(`${guide.dateModified}T12:00:00.000Z`))}
            </time>
            <span aria-hidden="true"> · </span>
            <span>{guide.readMinutes} min read</span>
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
          <article className="prose max-w-none dark:prose-invert">
            <section
              aria-labelledby="short-version"
              className="not-prose rounded-xl border border-amber-200/80 bg-amber-50/80 p-5 dark:border-amber-900/40 dark:bg-amber-950/30">
              <h2
                id="short-version"
                className="font-heading text-lg font-bold text-stone-900 dark:text-stone-50">
                The short version
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700 dark:text-stone-300">
                {guide.shortVersion.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <GuideMarkdown content={guide.body} />

            <RelatedPlaySection links={guide.relatedPlayLinks} />
            <RelatedGuidesSection slugs={guide.relatedGuideSlugs} currentSlug={guide.slug} />
          </article>

          <aside className="order-first lg:order-none lg:sticky lg:top-24">
            <GuideContents headings={guide.headings} />
          </aside>
        </div>
      </Container>
    </div>
  );
}
