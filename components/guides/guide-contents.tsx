'use client';

import { useReducedMotion } from 'motion/react';
import { type MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';

import type { GuideHeading } from '@/lib/guides/types';
import { smoothScrollToId } from '@/lib/scroll/smooth-scroll-to-id';

type GuideContentsProps = {
  headings: GuideHeading[];
};

export function GuideContents({ headings }: GuideContentsProps) {
  const topLevel = useMemo(() => headings.filter((h) => h.level === 2), [headings]);
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  const onTocClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      smoothScrollToId(id, Boolean(reduceMotion));
      setActiveId(id);
    },
    [reduceMotion],
  );

  useEffect(() => {
    if (topLevel.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    for (const heading of topLevel) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [topLevel, headings]);

  if (topLevel.length === 0) return null;

  return (
    <nav
      aria-label="Guide contents"
      className="rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-900/60">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
        On this page
      </p>
      <ol className="space-y-2 text-sm">
        {topLevel.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(event) => onTocClick(event, heading.id)}
                className={`block rounded-md px-2 py-1 transition-colors ${
                  isActive
                    ? 'bg-stone-200/80 font-medium text-stone-900 dark:bg-stone-700 dark:text-stone-50'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100'
                }`}>
                {heading.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
