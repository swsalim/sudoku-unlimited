import type { GuideHeading } from '@/lib/guides/types';

type GuideContentsProps = {
  headings: GuideHeading[];
};

export function GuideContents({ headings }: GuideContentsProps) {
  const topLevel = headings.filter((h) => h.level === 2);
  if (topLevel.length === 0) return null;

  return (
    <nav aria-label="Guide contents" className="rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-900/60">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
        On this page
      </p>
      <ol className="space-y-2 text-sm">
        {topLevel.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
