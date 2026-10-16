export const KIDS_SIZES = ['4x4', '6x6'] as const;

export type KidsSizeSlug = (typeof KIDS_SIZES)[number];

export type KidsFaq = {
  question: string;
  answer: string;
};

export type KidsLevel = {
  slug: KidsSizeSlug;
  size: 4 | 6;
  title: string;
  h1: string;
  description: string;
  digits: string;
  boxLabel: string;
  intro: string[];
};

export const kidsLevels: KidsLevel[] = [
  {
    slug: '4x4',
    size: 4,
    title: '4×4 Sudoku for Kids',
    h1: '4×4 Sudoku for Kids',
    description:
      'Play free 4×4 Sudoku for kids. Digits 1–4, four 2×2 boxes, and a printable puzzle with a solution page.',
    digits: '1–4',
    boxLabel: '2×2 box',
    intro: [
      'A 4×4 Sudoku is a small grid for a first puzzle. Use the digits 1, 2, 3, and 4. Each row, each column, and each 2×2 box needs every digit once.',
      'Some numbers are already filled in. Those stay put. The rest of the cells are yours. When the grid follows the rules and matches the puzzle’s single solution, it is done.',
    ],
  },
  {
    slug: '6x6',
    size: 6,
    title: '6×6 Sudoku for Kids',
    h1: '6×6 Sudoku for Kids',
    description:
      'Play free 6×6 Sudoku for kids. Digits 1–6, six 2×3 boxes, and a printable puzzle with solutions.',
    digits: '1–6',
    boxLabel: '2×3 box',
    intro: [
      'A 6×6 Sudoku sits between the 4×4 grid and a full 9×9 puzzle. Use the digits 1 through 6. Each row and each column needs every digit once.',
      'The grid is split into six boxes of 2 rows by 3 columns. Each of those boxes also uses 1–6 once. Givens stay fixed, and the puzzle has one solution.',
    ],
  },
];

export function getKidsLevel(slug: string): KidsLevel | undefined {
  return kidsLevels.find((level) => level.slug === slug);
}

export const kidsHubFaqs: KidsFaq[] = [
  {
    question: 'What is kids Sudoku on this site?',
    answer:
      'Kids Sudoku is a smaller playable grid: 4×4 with digits 1–4, or 6×6 with digits 1–6. The idea matches classic Sudoku: no repeated digit in a row, column, or box.',
  },
  {
    question: 'Do I need an account?',
    answer: 'No. The puzzles run in the browser. There is nothing to download or sign up for.',
  },
  {
    question: 'Can we print a kids puzzle?',
    answer:
      'Yes. On the 4×4 and 6×6 pages, Print this puzzle sends the current grid to the printer, with the solution on the next page.',
  },
  {
    question: 'How is a 4×4 grid different from 6×6?',
    answer:
      '4×4 uses digits 1–4 and 2×2 boxes. 6×6 uses digits 1–6 and boxes that are 2 rows by 3 columns. Both still ask for one of each digit in every row, column, and box.',
  },
  {
    question: 'When should we try a full Sudoku?',
    answer:
      'After 6×6 feels comfortable, Easy Sudoku is the 9×9 game with digits 1–9 and 3×3 boxes. The rules page explains that grid.',
  },
];

export const kidsFaqBySize: Record<KidsSizeSlug, KidsFaq[]> = {
  '4x4': [
    {
      question: 'What are the rules of 4×4 Sudoku?',
      answer:
        'Place 1, 2, 3, and 4 so each row, each column, and each 2×2 box contains each digit once. Numbers already printed cannot be changed.',
    },
    {
      question: 'How can a parent help without solving it?',
      answer:
        'Ask which digits are missing in one row, then in that cell’s column and 2×2 box. If only one digit is left, that is the placement. The check button marks digits that break a rule or do not match the solution.',
    },
    {
      question: 'Can I print the 4×4 puzzle?',
      answer:
        'Yes. Print this puzzle prints the grid on the page. The solution is included on the following printed page.',
    },
    {
      question: 'Is there a larger kids grid?',
      answer: 'Yes. 6×6 Sudoku uses digits 1–6 and 2×3 boxes.',
    },
  ],
  '6x6': [
    {
      question: 'What are the rules of 6×6 Sudoku?',
      answer:
        'Place 1 through 6 so each row, each column, and each 2×3 box contains each digit once. Given numbers stay fixed.',
    },
    {
      question: 'Why are the boxes 2 by 3 instead of square?',
      answer:
        'A 6×6 grid does not split into equal square boxes the way a 4×4 or 9×9 grid does. The usual kids layout uses six rectangles of 2 rows and 3 columns.',
    },
    {
      question: 'Can I print a 6×6 puzzle and its answer?',
      answer:
        'Yes. Print this puzzle prints the current puzzle, then the solution on the next page. Show solution also reveals the answer on screen.',
    },
    {
      question: 'What comes after 6×6?',
      answer:
        'Classic Easy Sudoku is a 9×9 grid with digits 1–9. Printable easy sheets are available if you want that size on paper.',
    },
  ],
};

export const kidsRulesForKids = [
  'Look at a row. Which digits are missing?',
  'The same digit cannot sit twice in that row, in that column, or in that box.',
  'If a cell has only one digit that fits, write it in.',
  'Given numbers are clues. Leave them where they are.',
];

export const kidsRulesForParents = [
  'Start with one row or one box, not the whole grid.',
  'Ask “what is missing?” before suggesting a digit.',
  'A wrong digit that repeats a neighbor breaks a rule. A digit that does not repeat can still be the wrong one for this puzzle — that is what Check puzzle is for.',
  'Show solution is there when you want the answer key. Printing puts that key on the next page.',
];
