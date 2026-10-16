import { type KidsFaq, kidsFaqBySize, kidsHubFaqs, type KidsSizeSlug } from '@/lib/kids/content';
import { getBreadcrumbSchema, getOrganizationSchema } from '@/lib/schema/shared';
import { absoluteUrl } from '@/lib/utils';

function faqEntities(faqs: KidsFaq[]) {
  return faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }));
}

export function getKidsHubSchema() {
  const baseUrl = absoluteUrl();
  const pageUrl = absoluteUrl('/kids-sudoku');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        name: 'Kids Sudoku',
        description: 'Play free 4×4 and 6×6 Sudoku for kids, with rules and a printable option.',
        url: pageUrl,
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        ...getBreadcrumbSchema([
          { name: 'Home', url: baseUrl },
          { name: 'Kids Sudoku', url: pageUrl },
        ]),
        '@id': `${pageUrl}#breadcrumb`,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqEntities(kidsHubFaqs),
      },
      getOrganizationSchema(),
    ],
  };
}

export function getKidsSizeSchema(slug: KidsSizeSlug, name: string, description: string) {
  const baseUrl = absoluteUrl();
  const pageUrl = absoluteUrl(`/kids-sudoku/${slug}`);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        name,
        description,
        url: pageUrl,
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        ...getBreadcrumbSchema([
          { name: 'Home', url: baseUrl },
          { name: 'Kids Sudoku', url: absoluteUrl('/kids-sudoku') },
          { name, url: pageUrl },
        ]),
        '@id': `${pageUrl}#breadcrumb`,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqEntities(kidsFaqBySize[slug]),
      },
      getOrganizationSchema(),
    ],
  };
}
