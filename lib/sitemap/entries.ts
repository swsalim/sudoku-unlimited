import type { MetadataRoute } from 'next';

import { getAllGuides } from '@/lib/guides/load-guide';
import { getStaticDailyDates, getTodayDailyIso } from '@/lib/daily/puzzle-store';
import { absoluteUrl } from '@/lib/utils';
import { Difficulty } from '@/types';

const CLASSIC_DIFFICULTIES = [
  Difficulty.EASY,
  Difficulty.MEDIUM,
  Difficulty.HARD,
  Difficulty.EXPERT,
  Difficulty.MASTER,
  Difficulty.EXTREME,
] as const;

const PRINTABLE_DIFFICULTIES = [
  Difficulty.EASY,
  Difficulty.MEDIUM,
  Difficulty.HARD,
  Difficulty.EXPERT,
] as const;

const KIDS_SIZES = ['4x4', '6x6'] as const;

const DEFAULT_PRIORITY = 0.7;

function entry(
  path: string,
  options?: { lastModified?: string | Date; changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'] },
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: options?.lastModified ?? new Date(),
    changeFrequency: options?.changeFrequency ?? 'daily',
    priority: DEFAULT_PRIORITY,
  };
}

/** Published daily puzzle, archive, and month URLs (evaluated at request time). */
export function getDailySitemapEntries(): MetadataRoute.Sitemap {
  const publishedDailyDates = getStaticDailyDates();
  const today = getTodayDailyIso();
  const entries: MetadataRoute.Sitemap = [
    entry('/daily'),
    entry('/daily/archive'),
  ];

  const monthKeys = new Set(publishedDailyDates.map((d) => d.slice(0, 7)));
  for (const ym of monthKeys) {
    const [y, m] = ym.split('-');
    entries.push(
      entry(`/daily/${y}/${m}`, {
        lastModified: `${today}T00:00:00.000Z`,
      }),
    );
  }

  for (const iso of publishedDailyDates) {
    entries.push(
      entry(`/daily/${iso}`, {
        lastModified: `${iso}T00:00:00.000Z`,
        changeFrequency: 'never',
      }),
    );
  }

  return entries;
}

/** Static site routes plus guides; daily URLs come from {@link getDailySitemapEntries}. */
export function getStaticSitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    entry('/'),
    entry('/about'),
    entry('/guides'),
    entry('/kids-sudoku'),
    entry('/killer-sudoku'),
    entry('/printable'),
    entry('/sudoku-solver'),
  ];

  for (const difficulty of CLASSIC_DIFFICULTIES) {
    entries.push(entry(`/${difficulty.toLowerCase()}`));
  }

  for (const difficulty of CLASSIC_DIFFICULTIES) {
    entries.push(entry(`/killer-sudoku/${difficulty.toLowerCase()}`));
  }

  for (const difficulty of PRINTABLE_DIFFICULTIES) {
    entries.push(entry(`/printable/${difficulty.toLowerCase()}`));
  }

  for (const size of KIDS_SIZES) {
    entries.push(entry(`/kids-sudoku/${size}`));
  }

  for (const guide of getAllGuides()) {
    entries.push(
      entry(`/guides/${guide.slug}`, {
        lastModified: guide.dateModified,
      }),
    );
  }

  return entries;
}

export function getFullSitemapEntries(): MetadataRoute.Sitemap {
  return [...getStaticSitemapEntries(), ...getDailySitemapEntries()];
}
