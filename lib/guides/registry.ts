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
  printable: {
    href: '/printable',
    title: 'Printable Sudoku',
    description: 'Four-puzzle sheets for Easy through Expert, with solutions.',
  },
  kids: {
    href: '/kids-sudoku',
    title: 'Kids Sudoku',
    description: 'Playable 4×4 and 6×6 grids with a printable option.',
  },
} satisfies Record<string, GuidePlayLink>;

export type GuideRegistryEntry = {
  filename: string;
  featured?: boolean;
  group?: 'techniques';
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
      PLAY.printable,
      PLAY.kids,
    ],
    relatedGuideSlugs: [
      'solve-sudoku-without-guessing',
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
    relatedPlayLinks: [PLAY.easy, PLAY.medium, PLAY.hard, PLAY.solver, PLAY.printable, PLAY.kids],
    relatedGuideSlugs: [
      'the-complete-guide-to-how-sudoku-works',
      'solve-sudoku-without-guessing',
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
      'solve-sudoku-without-guessing',
      'naked-singles',
      'hidden-singles',
      'naked-pairs',
      'hidden-pairs',
      'naked-triples',
      'pointing-pairs',
      'box-line-reduction',
      'x-wing',
      'swordfish',
      'xy-wing',
    ],
  },
  'solve-sudoku-without-guessing': {
    filename: 'solve-sudoku-without-guessing.md',
    shortVersion: [
      'Scan rows, columns, and boxes for forced digits before you write a full set of pencil marks.',
      'Place naked and hidden singles, then use pairs, triples, pointing, and claiming to delete candidates.',
      'Move on to fish and short chains only after the simpler eliminations in the same units are done.',
    ],
    relatedPlayLinks: [
      PLAY.easy,
      PLAY.medium,
      PLAY.hard,
      PLAY.expert,
      PLAY.daily,
      PLAY.solver,
      PLAY.printable,
      PLAY.kids,
    ],
    relatedGuideSlugs: [
      'the-complete-guide-to-how-sudoku-works',
      '9-advanced-sudoku-techniques-that-experienced-solvers-use',
      'naked-singles',
      'hidden-singles',
      'x-wing',
      'xy-wing',
    ],
  },
  'naked-singles': {
    filename: 'naked-singles.md',
    group: 'techniques',
    shortVersion: [
      'A naked single is an empty cell whose pencil marks have shrunk to one digit.',
      'Place that digit, then delete it from the rest of its row, column, and box.',
      'If a second candidate was missed, the cell is not a single yet.',
    ],
    relatedPlayLinks: [PLAY.easy, PLAY.medium, PLAY.daily, PLAY.solver],
    relatedGuideSlugs: [
      'hidden-singles',
      'naked-pairs',
      'solve-sudoku-without-guessing',
      'the-complete-guide-to-how-sudoku-works',
    ],
  },
  'hidden-singles': {
    filename: 'hidden-singles.md',
    group: 'techniques',
    shortVersion: [
      'A hidden single is a digit that has only one legal cell left inside a row, column, or box.',
      'That cell may still show other pencil marks; the digit is hidden among them.',
      'Place the digit and clear every other candidate from that cell.',
    ],
    relatedPlayLinks: [PLAY.easy, PLAY.medium, PLAY.hard, PLAY.solver],
    relatedGuideSlugs: [
      'naked-singles',
      'pointing-pairs',
      'solve-sudoku-without-guessing',
      '5-ways-to-approach-number-puzzles-like-sudoku',
    ],
  },
  'naked-pairs': {
    filename: 'naked-pairs.md',
    group: 'techniques',
    shortVersion: [
      'A naked pair is two cells in one unit that contain the same two candidates and nothing else.',
      'Those two digits are locked to those two cells, in unknown order.',
      'Delete both digits from every other cell in that shared unit.',
    ],
    relatedPlayLinks: [PLAY.medium, PLAY.hard, PLAY.solver],
    relatedGuideSlugs: [
      'hidden-pairs',
      'naked-triples',
      'naked-singles',
      'solve-sudoku-without-guessing',
    ],
  },
  'hidden-pairs': {
    filename: 'hidden-pairs.md',
    group: 'techniques',
    shortVersion: [
      'A hidden pair is two digits that appear in only two cells of one unit.',
      'Those cells may carry extra candidates; the pair is hidden inside them.',
      'Delete every candidate except the two pair digits from those two cells.',
    ],
    relatedPlayLinks: [PLAY.medium, PLAY.hard, PLAY.expert, PLAY.solver],
    relatedGuideSlugs: [
      'naked-pairs',
      'hidden-singles',
      'naked-triples',
      'solve-sudoku-without-guessing',
    ],
  },
  'naked-triples': {
    filename: 'naked-triples.md',
    group: 'techniques',
    shortVersion: [
      'A naked triple is three cells in one unit whose candidates use only three digits.',
      'Each cell holds two or three of those digits; no cell needs to hold all three.',
      'Delete the three digits from the other cells in the same unit.',
    ],
    relatedPlayLinks: [PLAY.medium, PLAY.hard, PLAY.expert, PLAY.solver],
    relatedGuideSlugs: [
      'naked-pairs',
      'hidden-pairs',
      'pointing-pairs',
      'solve-sudoku-without-guessing',
    ],
  },
  'pointing-pairs': {
    filename: 'pointing-pairs.md',
    group: 'techniques',
    shortVersion: [
      'A pointing pair or triple locks one candidate to a single row or column inside one box.',
      'That row or column must hold the digit inside the box.',
      'Delete the candidate from the same row or column outside the box.',
    ],
    relatedPlayLinks: [PLAY.medium, PLAY.hard, PLAY.solver],
    relatedGuideSlugs: [
      'box-line-reduction',
      'hidden-singles',
      'x-wing',
      'solve-sudoku-without-guessing',
    ],
  },
  'box-line-reduction': {
    filename: 'box-line-reduction.md',
    group: 'techniques',
    shortVersion: [
      'Box-line reduction, or claiming, locks a candidate on one line into a single box.',
      'The digit on that line must sit inside that box.',
      'Delete the candidate from the rest of the box, off the line.',
    ],
    relatedPlayLinks: [PLAY.medium, PLAY.hard, PLAY.expert, PLAY.solver],
    relatedGuideSlugs: [
      'pointing-pairs',
      'hidden-singles',
      'naked-pairs',
      'solve-sudoku-without-guessing',
    ],
  },
  'x-wing': {
    filename: 'x-wing.md',
    group: 'techniques',
    shortVersion: [
      'An X-Wing locks one candidate to the same two columns in two rows, or the same two rows in two columns.',
      'The four corners form a rectangle, and each base unit has the candidate in only those cover units.',
      'Delete the candidate from the cover units outside the base rows or columns.',
    ],
    relatedPlayLinks: [PLAY.hard, PLAY.expert, PLAY.master, PLAY.solver],
    relatedGuideSlugs: [
      'swordfish',
      'pointing-pairs',
      'xy-wing',
      '9-advanced-sudoku-techniques-that-experienced-solvers-use',
    ],
  },
  swordfish: {
    filename: 'swordfish.md',
    group: 'techniques',
    shortVersion: [
      'A Swordfish locks one candidate to the same three columns across three rows, or three rows across three columns.',
      'Each base unit uses two or three of those cover units and no others.',
      'Delete the candidate from the cover units outside the three base units.',
    ],
    relatedPlayLinks: [PLAY.expert, PLAY.master, PLAY.extreme, PLAY.solver],
    relatedGuideSlugs: [
      'x-wing',
      'xy-wing',
      'pointing-pairs',
      '9-advanced-sudoku-techniques-that-experienced-solvers-use',
    ],
  },
  'xy-wing': {
    filename: 'xy-wing.md',
    group: 'techniques',
    shortVersion: [
      'An XY-Wing uses three bivalue cells: a pivot {X, Y} and wings {X, Z} and {Y, Z}.',
      'The pivot sees both wings, so one wing must be Z.',
      'Delete Z from any other cell that sees both wings.',
    ],
    relatedPlayLinks: [PLAY.hard, PLAY.expert, PLAY.master, PLAY.solver],
    relatedGuideSlugs: [
      'x-wing',
      'naked-pairs',
      'swordfish',
      '9-advanced-sudoku-techniques-that-experienced-solvers-use',
    ],
  },
};

export const guideSlugs = Object.keys(guideRegistry);
