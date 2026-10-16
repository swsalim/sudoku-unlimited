import { siteConfig } from '@/config/site';

import { DAILY_CHALLENGE_TIMEZONE_POLICY } from '@/lib/daily-challenge';
import { absoluteUrl } from '@/lib/utils';

import { getBreadcrumbSchema, getOrganizationSchema } from '@/lib/schema/shared';

export function getDailyPageSchema() {
  const baseUrl = absoluteUrl();
  const dailyUrl = absoluteUrl('/daily');

  const organization = {
    ...getOrganizationSchema(),
    '@id': `${baseUrl}#organization`,
  };

  const webPage = {
    '@type': 'WebPage',
    '@id': `${dailyUrl}#webpage`,
    url: dailyUrl,
    name: "Today's Sudoku Daily Challenge",
    description:
      'Free daily Sudoku puzzle shared by every player. One grid per UTC calendar day; difficulty follows a fixed date-based rotation across Easy through Extreme.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}#website`,
      name: siteConfig.siteName,
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: 'Sudoku daily challenge',
      description: `Classic 9×9 Sudoku with one official puzzle per calendar day (${DAILY_CHALLENGE_TIMEZONE_POLICY}). Difficulty cycles through six levels based on the date.`,
    },
    breadcrumb: { '@id': `${dailyUrl}#breadcrumb` },
  };

  const breadcrumb = {
    ...getBreadcrumbSchema([
      { name: 'Home', url: baseUrl },
      { name: 'Daily Challenge', url: dailyUrl },
    ]),
    '@id': `${dailyUrl}#breadcrumb`,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, webPage, breadcrumb],
  };
}
