import { absoluteUrl } from '@/lib/utils';
import {
  getBreadcrumbSchema,
  getOrganizationSchema,
  getSoftwareApplicationSchema,
} from '@/lib/schema/shared';

export type SolverFaqItem = {
  question: string;
  answer: string;
};

export const sudokuSolverFaqs: SolverFaqItem[] = [
  {
    question: 'How do I solve this Sudoku puzzle?',
    answer:
      'Type the known digits into the 9x9 grid, leave unknown cells blank, and click Solve. The tool fills the remaining cells using Sudoku rules.',
  },
  {
    question: 'Can this Sudoku solver detect invalid puzzles?',
    answer:
      'Yes. If your entries break Sudoku rules with duplicates in a row, column, or 3x3 box, the page shows an error before solving.',
  },
  {
    question: 'Why does my Sudoku have no solution?',
    answer:
      'Most unsolvable puzzles contain a mistaken clue or conflicting entries. Re-check the given numbers and remove any conflicting values.',
  },
  {
    question: 'Can I use this for hard or expert Sudoku?',
    answer:
      'Yes. The solver works for easy, medium, hard, expert, and other valid classic Sudoku puzzles as long as the input follows standard 9x9 rules.',
  },
  {
    question: 'Can I see step-by-step Sudoku explanations?',
    answer:
      'Yes. Use Explain Next Step to apply one logical move at a time, or Show All Steps to generate a sequence of explainable moves.',
  },
  {
    question: 'Is this Sudoku solver free?',
    answer:
      'Yes. You can use the Sudoku solver online for free on Sudoku Unlimited with no signup required.',
  },
  {
    question: 'Can I solve Sudoku puzzles from newspapers or apps?',
    answer:
      'Yes. Copy the visible clues from your newspaper, book, or app into the grid, then click Solve to get the completed puzzle.',
  },
];

export function getSudokuSolverSchema() {
  const baseUrl = absoluteUrl();
  const pageUrl = absoluteUrl('/sudoku-solver');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'Sudoku Solver',
        description:
          'Solve this Sudoku puzzle online instantly. Enter your grid and get a complete solution with conflict validation.',
        url: pageUrl,
      },
      {
        '@type': 'FAQPage',
        mainEntity: sudokuSolverFaqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'HowTo',
        name: 'How to use the Sudoku solver',
        step: [
          { '@type': 'HowToStep', text: 'Enter known digits in the 9x9 Sudoku grid.' },
          { '@type': 'HowToStep', text: 'Leave unknown cells blank.' },
          { '@type': 'HowToStep', text: 'Check for conflicts and correct any invalid entries.' },
          {
            '@type': 'HowToStep',
            text: 'Click Explain Next Step for guided logic, or click Solve to fill the remaining cells instantly.',
          },
        ],
      },
      getBreadcrumbSchema([
        { name: 'Home', url: baseUrl },
        { name: 'Sudoku Solver', url: pageUrl },
      ]),
      getOrganizationSchema(),
      getSoftwareApplicationSchema(),
    ],
  };
}
