import { siteConfig } from '@/config/site';

import { DAILY_CHALLENGE_TIMEZONE_POLICY } from '@/lib/daily-challenge';
import { formatDailyPageTitle } from '@/lib/daily/format';
import type { DailyPuzzleRecord } from '@/lib/daily/types';
import { absoluteUrl } from '@/lib/utils';

import { getBreadcrumbSchema, getOrganizationSchema } from '@/lib/schema/shared';

import type { Difficulty } from '@/types';

export function getDailyPuzzlePageSchema(
  isoDate: string,
  record: DailyPuzzleRecord,
  options?: { includeArchiveBreadcrumb?: boolean },
) {
  const baseUrl = absoluteUrl();
  const pageUrl = absoluteUrl(`/daily/${isoDate}`);
  const title = formatDailyPageTitle(isoDate, record.difficulty as Difficulty);

  const organization = {
    ...getOrganizationSchema(),
    '@id': `${baseUrl}#organization`,
  };

  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: 'Daily Challenge', url: absoluteUrl('/daily') },
  ];
  if (options?.includeArchiveBreadcrumb) {
    breadcrumbItems.push({ name: 'Archive', url: absoluteUrl('/daily/archive') });
  }
  breadcrumbItems.push({ name: formatDailyPageTitle(isoDate, record.difficulty as Difficulty), url: pageUrl });

  const breadcrumb = {
    ...getBreadcrumbSchema(breadcrumbItems),
    '@id': `${pageUrl}#breadcrumb`,
  };

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description: `Play the ${record.difficulty} daily Sudoku for ${isoDate} (${DAILY_CHALLENGE_TIMEZONE_POLICY}). ${record.clueCount} givens, same grid for every player.`,
    datePublished: `${isoDate}T00:00:00.000Z`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      name: siteConfig.siteName,
      url: baseUrl,
    },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
  };

  const game = {
    '@type': 'Game',
    '@id': `${pageUrl}#game`,
    name: title,
    description: `Classic 9×9 Sudoku daily puzzle (${record.difficulty}, ${record.clueCount} clues).`,
    gamePlatform: 'Web browser',
    genre: 'Puzzle',
    isAccessibleForFree: true,
    datePublished: `${isoDate}T00:00:00.000Z`,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, webPage, breadcrumb, game],
  };
}
