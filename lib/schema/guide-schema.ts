import { siteConfig } from '@/config/site';

import type { Guide } from '@/lib/guides/types';
import { getAllGuides } from '@/lib/guides/load-guide';
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

export function getGuidesIndexSchema() {
  const baseUrl = absoluteUrl();
  const guidesUrl = absoluteUrl('/guides');
  const guides = getAllGuides();

  const organization = {
    ...getOrganizationSchema(),
    '@id': `${baseUrl}#organization`,
  };

  const collectionPage = {
    '@type': 'CollectionPage',
    '@id': `${guidesUrl}#webpage`,
    url: guidesUrl,
    name: 'Sudoku Guides',
    description:
      'In-depth Sudoku guides covering rules, beginner approaches, and advanced solving techniques.',
    isPartOf: { '@id': `${baseUrl}#website` },
    breadcrumb: { '@id': `${guidesUrl}#breadcrumb` },
  };

  const breadcrumb = {
    ...getBreadcrumbSchema([
      { name: 'Home', url: baseUrl },
      { name: 'Guides', url: guidesUrl },
    ]),
    '@id': `${guidesUrl}#breadcrumb`,
  };

  const itemList = {
    '@type': 'ItemList',
    '@id': `${guidesUrl}#list`,
    numberOfItems: guides.length,
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title,
      url: absoluteUrl(`/guides/${guide.slug}`),
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, getWebSiteSchema(), collectionPage, breadcrumb, itemList],
  };
}

export function getGuideArticleSchema(guide: Guide) {
  const baseUrl = absoluteUrl();
  const pageUrl = absoluteUrl(`/guides/${guide.slug}`);

  const organization = {
    ...getOrganizationSchema(),
    '@id': `${baseUrl}#organization`,
  };

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: guide.meta_title,
    description: guide.meta_description,
    dateModified: guide.dateModified,
    isPartOf: { '@id': `${baseUrl}#website` },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
  };

  const article = {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: guide.title,
    description: guide.meta_description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
    author: { '@id': `${baseUrl}#organization` },
    publisher: { '@id': `${baseUrl}#organization` },
    image: [absoluteUrl(siteConfig.openGraph.image)],
  };

  const breadcrumb = {
    ...getBreadcrumbSchema([
      { name: 'Home', url: baseUrl },
      { name: 'Guides', url: absoluteUrl('/guides') },
      { name: guide.title, url: pageUrl },
    ]),
    '@id': `${pageUrl}#breadcrumb`,
  };

  const graph: Record<string, unknown>[] = [
    organization,
    getWebSiteSchema(),
    webPage,
    article,
    breadcrumb,
  ];

  if (guide.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: guide.faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
