import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/utils';
import {
  getBreadcrumbSchema,
  getOrganizationSchema,
  getSoftwareApplicationSchema,
} from '@/lib/schema/shared';

export const homeFaqs = [
  {
    question: 'What is Sudoku?',
    answer:
      'Sudoku is a popular number puzzle that challenges your logical thinking. The game consists of a 9×9 grid divided into nine smaller 3×3 boxes. The goal is to fill the grid so that every row, column, and 3×3 box contains the numbers 1 to 9 without repeating any number.',
  },
  {
    question: 'What are the basic rules of Sudoku?',
    answer:
      'Each row must contain the numbers 1 to 9 with no duplicates. Each column must also contain 1 to 9 with no repetitions. Each 3×3 box (subgrid) must have all numbers from 1 to 9 exactly once. You can only use logic—no guessing.',
  },
  {
    question: 'How do I solve Sudoku?',
    answer:
      'Start with easy numbers and use the elimination method: check which numbers are missing in each row, column, and box. Use pencil marks to track possibilities. Look for single possibilities where only one number can fit. Stay patient and logical.',
  },
  {
    question: 'Is Sudoku free to play online?',
    answer:
      'Yes. Sudoku Unlimited offers free Sudoku puzzles from Easy to Extreme level. Play in your browser with no signup or download required.',
  },
];

export function getHomeSchema() {
  const baseUrl = absoluteUrl();

  const organizationSchema = getOrganizationSchema();
  const webSiteSchema = {
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: baseUrl,
    description: siteConfig.description,
    publisher: organizationSchema,
  };

  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  const howToSchema = {
    '@type': 'HowTo',
    name: 'How to Play Sudoku',
    description:
      'Learn to solve Sudoku puzzles with these five essential strategies: start with easy numbers, use elimination, try pencil marks, look for single possibilities, and stay patient.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Start with Easy Numbers',
        text: 'Look for numbers that appear frequently in the grid. If a number is already placed in two or more sections, it might be easier to determine where it should go next.',
      },
      {
        '@type': 'HowToStep',
        name: 'Use the Elimination Method',
        text: "Check each row, column, and box to see which numbers are missing. If a number is already present in a row or column, it can't go in that section again.",
      },
      {
        '@type': 'HowToStep',
        name: 'Try the Pencil Mark Technique',
        text: 'Write down possible numbers in empty cells as small notes. This helps track possibilities without committing to a number too soon.',
      },
      {
        '@type': 'HowToStep',
        name: 'Look for Single Possibilities',
        text: 'Sometimes, only one number can fit in a specific cell. Identifying these easy placements early will make solving the puzzle much faster.',
      },
      {
        '@type': 'HowToStep',
        name: 'Stay Patient and Logical',
        text: "Sudoku is a game of logic, not guessing. If you're stuck, take a step back, double-check your work, and look for new patterns.",
      },
    ],
  };

  const breadcrumbSchema = getBreadcrumbSchema([{ name: 'Home', url: baseUrl }]);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      webSiteSchema,
      faqSchema,
      getOrganizationSchema(),
      getSoftwareApplicationSchema(),
      breadcrumbSchema,
      howToSchema,
    ],
  };
}
