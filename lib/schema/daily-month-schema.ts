import { siteConfig } from '@/config/site';

import { formatDailyDateLabel, formatMonthYearLabel } from '@/lib/daily/format';
import { absoluteUrl } from '@/lib/utils';

import { getBreadcrumbSchema, getOrganizationSchema } from '@/lib/schema/shared';

function getWebSiteSchema() {
  const baseUrl = absoluteUrl();
  return {
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    name: siteConfig.siteName,
    url: baseUrl,
    publisher: { '@id': `${baseUrl}#organization` },
  };
}

export function getDailyMonthPageSchema(year: number, month: number, puzzleDates: string[]) {
  const baseUrl = absoluteUrl();
  const monthPath = `/daily/${year}/${String(month).padStart(2, '0')}`;
  const pageUrl = absoluteUrl(monthPath);
  const label = formatMonthYearLabel(year, month);

  const organization = {
    ...getOrganizationSchema(),
    '@id': `${baseUrl}#organization`,
  };

  const collectionPage = {
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `Daily Sudoku calendar – ${label}`,
    description: `Browse archived daily Sudoku puzzles for ${label}.`,
    isPartOf: { '@id': `${baseUrl}#website` },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
  };

  const breadcrumb = {
    ...getBreadcrumbSchema([
      { name: 'Home', url: baseUrl },
      { name: 'Daily Challenge', url: absoluteUrl('/daily') },
      { name: 'Archive', url: absoluteUrl('/daily/archive') },
      { name: label, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  };

  const itemList = {
    '@type': 'ItemList',
    '@id': `${pageUrl}#list`,
    numberOfItems: puzzleDates.length,
    itemListElement: puzzleDates.map((iso, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: formatDailyDateLabel(iso),
      url: absoluteUrl(`/daily/${iso}`),
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, getWebSiteSchema(), collectionPage, breadcrumb, itemList],
  };
}
