import Link from 'next/link';

import { getGuideBySlug } from '@/lib/guides/load-guide';

type RelatedGuidesSectionProps = {
  slugs: string[];
  currentSlug: string;
};

export function RelatedGuidesSection({ slugs, currentSlug }: RelatedGuidesSectionProps) {
  const guides = slugs
    .filter((slug) => slug !== currentSlug)
    .map((slug) => getGuideBySlug(slug))
    .filter((guide): guide is NonNullable<typeof guide> => guide !== undefined);

  if (guides.length === 0) return null;

  return (
    <section aria-labelledby="related-guides" className="not-prose mt-12 border-t border-stone-200 pt-10 dark:border-stone-700">
      <h2
        id="related-guides"
        className="font-heading text-2xl font-bold text-stone-900 dark:text-stone-50">
        Keep reading
      </h2>
      <ul className="mt-4 space-y-3">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="text-[color:var(--app-accent-strong)] font-medium hover:underline">
              {guide.title}
            </Link>
            <p className="text-sm text-stone-600 dark:text-stone-400">{guide.meta_description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
