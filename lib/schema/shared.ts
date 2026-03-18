import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

export function getOrganizationSchema() {
  const baseUrl = absoluteUrl();
  return {
    '@type': 'Organization',
    name: siteConfig.siteName,
    url: baseUrl,
    description: siteConfig.description,
    sameAs: ['https://www.yuurrific.com'],
  };
}

export function getSoftwareApplicationSchema() {
  const baseUrl = absoluteUrl();
  return {
    '@type': 'SoftwareApplication',
    name: siteConfig.siteName,
    applicationCategory: 'Game',
    operatingSystem: 'Web',
    description: siteConfig.description,
    url: baseUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
