import { siteConfig } from '@/config/site';

import { DAILY_ARCHIVE_START_DATE } from '@/lib/daily/constants';
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

export type DailyArchiveMonthGroup = {
  year: number;
  month: number;
  dates: string[];
};

export function getDailyArchivePageSchema(monthGroups: DailyArchiveMonthGroup[]) {
  const baseUrl = absoluteUrl();
  const archiveUrl = absoluteUrl('/daily/archive');

  const organization = {
    ...getOrganizationSchema(),
    '@id': `${baseUrl}#organization`,
  };

  const collectionPage = {
    '@type': 'CollectionPage',
    '@id': `${archiveUrl}#webpage`,
    url: archiveUrl,
    name: 'Daily Sudoku archive',
    description: `Browse every official daily Sudoku puzzle since ${formatDailyDateLabel(DAILY_ARCHIVE_START_DATE)}. One shared grid per UTC calendar day.`,
    isPartOf: { '@id': `${baseUrl}#website` },
    breadcrumb: { '@id': `${archiveUrl}#breadcrumb` },
  };

  const breadcrumb = {
    ...getBreadcrumbSchema([
      { name: 'Home', url: baseUrl },
      { name: 'Daily Challenge', url: absoluteUrl('/daily') },
      { name: 'Archive', url: archiveUrl },
    ]),
    '@id': `${archiveUrl}#breadcrumb`,
  };

  const itemListElement: { '@type': 'ListItem'; position: number; name: string; url: string }[] = [];
  let position = 1;
  for (const group of monthGroups) {
    const monthUrl = absoluteUrl(
      `/daily/${group.year}/${String(group.month).padStart(2, '0')}`,
    );
    itemListElement.push({
      '@type': 'ListItem',
      position,
      name: formatMonthYearLabel(group.year, group.month),
      url: monthUrl,
    });
    position += 1;
    for (const iso of group.dates) {
      itemListElement.push({
        '@type': 'ListItem',
        position,
        name: formatDailyDateLabel(iso),
        url: absoluteUrl(`/daily/${iso}`),
      });
      position += 1;
    }
  }

  const itemList = {
    '@type': 'ItemList',
    '@id': `${archiveUrl}#list`,
    numberOfItems: itemListElement.length,
    itemListElement,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, getWebSiteSchema(), collectionPage, breadcrumb, itemList],
  };
}
