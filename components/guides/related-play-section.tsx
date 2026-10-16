import Link from 'next/link';

import type { GuidePlayLink } from '@/lib/guides/types';

type RelatedPlaySectionProps = {
  links: GuidePlayLink[];
};

export function RelatedPlaySection({ links }: RelatedPlaySectionProps) {
  if (links.length === 0) return null;

  return (
    <section aria-labelledby="related-play" className="not-prose mt-12">
      <h2
        id="related-play"
        className="font-heading text-2xl font-bold text-stone-900 dark:text-stone-50">
        Play on Sudoku Unlimited
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-stone-300 dark:border-stone-700 dark:bg-stone-900/50 dark:hover:border-stone-600">
              <span className="font-semibold text-stone-900 dark:text-stone-100">{link.title}</span>
              <span className="mt-1 block text-sm text-stone-600 dark:text-stone-400">
                {link.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
