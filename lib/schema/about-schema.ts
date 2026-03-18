import { absoluteUrl } from '@/lib/utils';
import {
  getBreadcrumbSchema,
  getOrganizationSchema,
} from '@/lib/schema/shared';

export function getAboutSchema() {
  const baseUrl = absoluteUrl();
  const aboutUrl = absoluteUrl('/about');

  const webPageSchema = {
    '@type': 'WebPage',
    name: 'About Sudoku Unlimited',
    description:
      'Sudoku Unlimited is a free online Sudoku game that you can play directly in your browser—no signup required. Choose from multiple difficulty levels, from Easy to Extreme, and challenge yourself with new puzzles whenever you like.',
    url: aboutUrl,
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'About', url: aboutUrl },
  ]);

  const personSchema = {
    '@type': 'Person',
    name: 'Yuyu',
    jobTitle: 'Front-end Developer',
    url: 'https://www.yuurrific.com',
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageSchema,
      breadcrumbSchema,
      personSchema,
      getOrganizationSchema(),
    ],
  };
}
