'use client';

import { useReducedMotion } from 'motion/react';
import { type MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { pickActiveGuideHeading } from '@/lib/guides/active-guide-heading';
import type { GuideHeading } from '@/lib/guides/types';
import { smoothScrollToId } from '@/lib/scroll/smooth-scroll-to-id';

type GuideContentsProps = {
  headings: GuideHeading[];
};

/** Extra pixels below scroll-margin-top so subpixel resting positions still count. */
const ACTIVATION_SLACK_PX = 8;
const SCROLL_END_SLACK_PX = 2;

function activationLine(heading: HTMLElement): number {
  const margin = Number.parseFloat(getComputedStyle(heading).scrollMarginTop);
  const base = Number.isFinite(margin) ? margin : 96;
  return base + ACTIVATION_SLACK_PX;
}

function measureActiveId(ids: string[]): string | null {
  const nodes = ids
    .map((id) => document.getElementById(id))
    .filter((node): node is HTMLElement => node !== null);
  if (nodes.length === 0) return null;

  const doc = document.documentElement;
  const maxScroll = doc.scrollHeight - window.innerHeight;
  const atBottom = maxScroll > SCROLL_END_SLACK_PX && window.scrollY >= maxScroll - SCROLL_END_SLACK_PX;

  return pickActiveGuideHeading(
    nodes.map((node) => ({ id: node.id, top: node.getBoundingClientRect().top })),
    activationLine(nodes[0]),
    atBottom,
  );
}

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
    const ids = topLevel.map((heading) => heading.id);

    let frame = 0;
    const update = () => {
      frame = 0;
      const next = measureActiveId(ids);
      setActiveId((current) => (current === next ? current : next));
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [topLevel]);

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
                aria-current={isActive ? 'location' : undefined}
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
