import { Difficulty } from '@/types';

export const PRINTABLE_DIFFICULTIES = ['easy', 'medium', 'hard', 'expert'] as const;

export type PrintableDifficulty = (typeof PRINTABLE_DIFFICULTIES)[number];

export type PrintableFaq = {
  question: string;
  answer: string;
};

export type PrintableLevel = {
  slug: PrintableDifficulty;
  difficulty: Difficulty;
  title: string;
  h1: string;
  description: string;
  intro: string[];
  playHref: string;
};

export const printableLevels: PrintableLevel[] = [
  {
    slug: 'easy',
    difficulty: Difficulty.EASY,
    title: 'Printable Easy Sudoku',
    h1: 'Printable Easy Sudoku',
    description:
      'Print free easy Sudoku sheets with a solution page. Four puzzles from the same generator as online Easy mode, ready to print or save as a PDF.',
    intro: [
      'These easy sheets use the same puzzle generator as Easy mode on Sudoku Unlimited. Each grid is a standard 9×9 Sudoku: digits 1–9 once in every row, column, and 3×3 box.',
      'Easy puzzles keep more digits filled in, so they suit a first printout, a classroom warm-up, or a solve away from the screen. The sheet has four puzzles. Solutions start on the next printed page.',
    ],
    playHref: '/easy',
  },
  {
    slug: 'medium',
    difficulty: Difficulty.MEDIUM,
    title: 'Printable Medium Sudoku',
    h1: 'Printable Medium Sudoku',
    description:
      'Print free medium Sudoku sheets with solutions. Four puzzles from the online Medium generator, laid out for paper or a saved PDF.',
    intro: [
      'Medium printable puzzles come from the same generator as Medium mode online. Fewer givens than Easy, still one solution, and the same row, column, and box rules.',
      'Print four puzzles on one sheet. The solution page follows, so you can fold it back or hand it out separately.',
    ],
    playHref: '/medium',
  },
  {
    slug: 'hard',
    difficulty: Difficulty.HARD,
    title: 'Printable Hard Sudoku',
    h1: 'Printable Hard Sudoku',
    description:
      'Print free hard Sudoku puzzles with a separate solution page. Generated with the same logic as online Hard mode.',
    intro: [
      'Hard sheets leave fewer givens than Medium. They are built by the site’s Hard generator and still have a single solution.',
      'Use them when you want a paper solve that needs candidate notes. Four puzzles print together, with solutions on the following page.',
    ],
    playHref: '/hard',
  },
  {
    slug: 'expert',
    difficulty: Difficulty.EXPERT,
    title: 'Printable Expert Sudoku',
    h1: 'Printable Expert Sudoku',
    description:
      'Print free expert Sudoku sheets and their solutions. Sparse grids from the same generator as online Expert mode.',
    intro: [
      'Expert printouts are the sparsest sheets on this page. They use the Expert generator: the same removal target and unique-solution check as Expert play online.',
      'Expect a longer solve on paper. The sheet prints four puzzles, then a solution page.',
    ],
    playHref: '/expert',
  },
];

export function getPrintableLevel(slug: string): PrintableLevel | undefined {
  return printableLevels.find((level) => level.slug === slug);
}

export const printableHubFaqs: PrintableFaq[] = [
  {
    question: 'Are these printable Sudoku puzzles free?',
    answer:
      'Yes. Every printable sheet on Sudoku Unlimited is free. You can print it or save it as a PDF from the browser. No account is required.',
  },
  {
    question: 'Where do the puzzles come from?',
    answer:
      'Each sheet is created with the same generator used for online play at that difficulty. The generator fills a valid grid, then removes givens while keeping a single solution.',
  },
  {
    question: 'Do the sheets include answers?',
    answer:
      'Yes. Solutions are on the page under the puzzles and print on their own page after the puzzles. You can also download a PDF that contains both.',
  },
  {
    question: 'Can I get a new set of puzzles?',
    answer:
      'Use New puzzles on a difficulty page to build another sheet at that level. Printing or downloading uses the puzzles currently on the page.',
  },
  {
    question: 'Can I play the same levels online?',
    answer:
      'Yes. Easy, Medium, Hard, and Expert each have an online game. The printable pages link to those games.',
  },
];

export const printableFaqByDifficulty: Record<PrintableDifficulty, PrintableFaq[]> = {
  easy: [
    {
      question: 'What is on an easy printable Sudoku sheet?',
      answer:
        'Four easy 9×9 puzzles and a solution page. The puzzles use the Easy generator, which leaves more digits filled in than Medium, Hard, or Expert.',
    },
    {
      question: 'How do I print the easy sheet?',
      answer:
        'Choose Print or save as PDF to open the browser print dialog, or Download PDF to save a two-page file: puzzles, then solutions.',
    },
    {
      question: 'Are easy printable puzzles the same rules as online Easy?',
      answer:
        'Yes. Fill every row, column, and 3×3 box with the digits 1–9 exactly once. Givens stay fixed.',
    },
    {
      question: 'Can I practice easy Sudoku on the screen instead?',
      answer: 'Yes. Open Easy Sudoku to play in the browser with the same style of puzzle.',
    },
  ],
  medium: [
    {
      question: 'How is a medium printable sheet different from easy?',
      answer:
        'Medium uses the Medium generator, which removes more givens than Easy while still keeping one solution. The sheet layout is the same: four puzzles and a solution page.',
    },
    {
      question: 'Does the medium PDF include answers?',
      answer:
        'Yes. The downloaded PDF has the four puzzles on the first page and the four solutions on the second page.',
    },
    {
      question: 'Can I print only the puzzles?',
      answer:
        'The print dialog includes both pages. In the dialog you can choose a page range if you want the puzzle page without the solutions.',
    },
    {
      question: 'Where can I play medium Sudoku online?',
      answer: 'Medium Sudoku on this site is the matching online game.',
    },
  ],
  hard: [
    {
      question: 'What should I expect from printable hard Sudoku?',
      answer:
        'Hard sheets have fewer givens than Medium. They are generated the same way as online Hard puzzles, including the unique-solution check.',
    },
    {
      question: 'Should I use pencil marks on a hard printout?',
      answer:
        'The empty cells are blank on purpose so you can write candidates. Hard grids usually need notes before a digit is certain.',
    },
    {
      question: 'Are the hard solutions on a separate page?',
      answer:
        'Yes. Printing places the solutions after a page break. The PDF download does the same.',
    },
    {
      question: 'Can I play hard Sudoku online after printing?',
      answer: 'Yes. Hard Sudoku is the online version of this difficulty.',
    },
  ],
  expert: [
    {
      question: 'What is printable expert Sudoku?',
      answer:
        'A sheet of four expert 9×9 puzzles from the Expert generator, plus a solution page. Expert is the sparsest of the printable levels on this site.',
    },
    {
      question: 'Do expert printouts still have one solution?',
      answer:
        'Yes. The generator puts a removed digit back when deleting it would leave more than one solution.',
    },
    {
      question: 'How do I save an expert sheet as a PDF?',
      answer:
        'Use Download PDF for a file generated from the puzzles on the page, or Print or save as PDF and choose Save as PDF in the browser dialog.',
    },
    {
      question: 'Is there an online expert game?',
      answer: 'Yes. Expert Sudoku is the playable version of this level.',
    },
  ],
};
