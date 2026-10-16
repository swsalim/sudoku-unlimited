import type { GuidePlayLink } from '@/lib/guides/types';

export const GUIDE_PUBLICATION_DATE = '2026-10-16';

const PLAY = {
  easy: {
    href: '/easy',
    title: 'Easy Sudoku',
    description: 'Beginner-friendly grids with more givens.',
  },
  medium: {
    href: '/medium',
    title: 'Medium Sudoku',
    description: 'Balanced puzzles for building candidate skills.',
  },
  hard: {
    href: '/hard',
    title: 'Hard Sudoku',
    description: 'Fewer clues and deeper unit interactions.',
  },
  expert: {
    href: '/expert',
    title: 'Expert Sudoku',
    description: 'Longer deduction chains for experienced solvers.',
  },
  master: {
    href: '/master',
    title: 'Master Sudoku',
    description: 'Demanding grids when Expert feels routine.',
  },
  extreme: {
    href: '/extreme',
    title: 'Extreme Sudoku',
    description: 'Maximum challenge on the classic grid.',
  },
  daily: {
    href: '/daily',
    title: 'Daily Challenge',
    description: 'One shared puzzle per UTC day.',
  },
  solver: {
    href: '/sudoku-solver',
    title: 'Sudoku Solver',
    description: 'Check placements or step through a grid.',
  },
  killer: {
    href: '/killer-sudoku',
    title: 'Killer Sudoku',
    description: 'Cage-sum Sudoku with an extra arithmetic layer.',
  },
} satisfies Record<string, GuidePlayLink>;

export type GuideRegistryEntry = {
  filename: string;
  featured?: boolean;
  shortVersion: string[];
  relatedPlayLinks: GuidePlayLink[];
  relatedGuideSlugs: string[];
};

export const guideRegistry: Record<string, GuideRegistryEntry> = {
  'the-complete-guide-to-how-sudoku-works': {
    filename: 'the-complete-guide-to-how-sudoku-works.md',
    featured: true,
    shortVersion: [
      'Fill every empty cell with digits 1–9; no repeats in any row, column, or 3×3 box.',
      'Scan for singles, track pencil-mark candidates, and update notes after each placement.',
      'Choose Easy or Medium online levels until row, column, and box checks feel automatic.',
    ],
    relatedPlayLinks: [
      PLAY.easy,
      PLAY.medium,
      PLAY.hard,
      PLAY.expert,
      PLAY.daily,
      PLAY.solver,
    ],
    relatedGuideSlugs: [
      '5-ways-to-approach-number-puzzles-like-sudoku',
      '9-advanced-sudoku-techniques-that-experienced-solvers-use',
    ],
  },
  '5-ways-to-approach-number-puzzles-like-sudoku': {
    filename: '5-ways-to-approach-number-puzzles-like-sudoku.md',
    shortVersion: [
      'Check row, column, and box before every placement.',
      'Scan for naked and hidden singles, then maintain candidate lists.',
      'Use pairs and box-line cuts before testing a single marked assumption.',
    ],
    relatedPlayLinks: [PLAY.easy, PLAY.medium, PLAY.hard, PLAY.solver],
    relatedGuideSlugs: [
      'the-complete-guide-to-how-sudoku-works',
      '9-advanced-sudoku-techniques-that-experienced-solvers-use',
    ],
  },
  '9-advanced-sudoku-techniques-that-experienced-solvers-use': {
    filename: '9-advanced-sudoku-techniques-that-experienced-solvers-use.md',
    shortVersion: [
      'Fish patterns (X-Wing, Swordfish, Jellyfish) eliminate candidates locked across units.',
      'Wings, unique rectangles, coloring, and chains prove eliminations without guessing.',
      'Refresh singles after every deduction before hunting the next advanced pattern.',
    ],
    relatedPlayLinks: [PLAY.expert, PLAY.master, PLAY.extreme, PLAY.solver, PLAY.killer],
    relatedGuideSlugs: [
      'the-complete-guide-to-how-sudoku-works',
      '5-ways-to-approach-number-puzzles-like-sudoku',
    ],
  },
};

export const guideSlugs = Object.keys(guideRegistry);
