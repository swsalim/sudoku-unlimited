import {
  type PrintableDifficulty,
  type PrintableFaq,
  printableFaqByDifficulty,
  printableHubFaqs,
} from '@/lib/printable/content';
import { getBreadcrumbSchema, getOrganizationSchema } from '@/lib/schema/shared';
import { absoluteUrl } from '@/lib/utils';

function faqEntities(faqs: PrintableFaq[]) {
  return faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }));
}

export function getPrintableHubSchema() {
  const baseUrl = absoluteUrl();
  const pageUrl = absoluteUrl('/printable');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        name: 'Printable Sudoku',
        description:
          'Free printable Sudoku sheets for Easy, Medium, Hard, and Expert, each with a solution page.',
        url: pageUrl,
        isPartOf: { '@id': `${baseUrl}#website` },
        about: { '@id': `${baseUrl}#organization` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        ...getBreadcrumbSchema([
          { name: 'Home', url: baseUrl },
          { name: 'Printable Sudoku', url: pageUrl },
        ]),
        '@id': `${pageUrl}#breadcrumb`,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqEntities(printableHubFaqs),
      },
      { ...getOrganizationSchema(), '@id': `${baseUrl}#organization` },
    ],
  };
}

export function getPrintableDifficultySchema(slug: PrintableDifficulty, description: string) {
  const baseUrl = absoluteUrl();
  const pageUrl = absoluteUrl(`/printable/${slug}`);
  const name = `${slug.charAt(0).toUpperCase()}${slug.slice(1)} printable Sudoku`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        name,
        description,
        url: pageUrl,
        isPartOf: { '@id': `${baseUrl}#website` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        ...getBreadcrumbSchema([
          { name: 'Home', url: baseUrl },
          { name: 'Printable Sudoku', url: absoluteUrl('/printable') },
          { name, url: pageUrl },
        ]),
        '@id': `${pageUrl}#breadcrumb`,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqEntities(printableFaqByDifficulty[slug]),
      },
      getOrganizationSchema(),
    ],
  };
}
