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
  /** Overrides the shared publication date for this guide only. */
  dateModified?: string;
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
      'what-are-the-rules-of-sudoku',
      'how-to-solve-sudoku-step-by-step',
      'how-do-you-play-sudoku-with-numbers',
      'easy-vs-medium-vs-hard-sudoku',
      'solve-sudoku-without-guessing',
      '5-ways-to-approach-number-puzzles-like-sudoku',
      '9-advanced-sudoku-techniques-that-experienced-solvers-use',
      'sudoku-brain-game',
      'sudoku-pencil-marks',
      'what-is-the-point-of-sudoku',
    ],
  },
  'how-do-you-play-sudoku-with-numbers': {
    filename: 'how-do-you-play-sudoku-with-numbers.md',
    dateModified: '2026-10-17',
    shortVersion: [
      'Enter a digit from 1 to 9 in an empty cell.',
      'Keep it only when that digit is missing from the cell’s row, column, and 3×3 box.',
      'Givens stay fixed. Small notes are candidates, not answers.',
    ],
    relatedPlayLinks: [PLAY.easy, PLAY.medium, PLAY.kids, PLAY.daily, PLAY.printable, PLAY.solver],
    relatedGuideSlugs: [
      'what-are-the-rules-of-sudoku',
      'how-to-solve-sudoku-step-by-step',
      'the-complete-guide-to-how-sudoku-works',
      'easy-vs-medium-vs-hard-sudoku',
      'naked-singles',
      '5-ways-to-approach-number-puzzles-like-sudoku',
    ],
  },
  'what-are-the-rules-of-sudoku': {
    filename: 'what-are-the-rules-of-sudoku.md',
    dateModified: '2026-10-19',
    shortVersion: [
      'Fill every empty cell with 1–9 so each row, column, and 3×3 box contains each digit once.',
      'Givens stay fixed. A puzzle on this site is kept to a single completion.',
      'Classic play has no sums. Killer Sudoku adds cage sums on the same grid.',
    ],
    relatedPlayLinks: [
      PLAY.easy,
      PLAY.medium,
      PLAY.kids,
      PLAY.killer,
      PLAY.daily,
      PLAY.solver,
      PLAY.printable,
    ],
    relatedGuideSlugs: [
      'the-complete-guide-to-how-sudoku-works',
      'how-do-you-play-sudoku-with-numbers',
      'how-to-solve-sudoku-step-by-step',
      'easy-vs-medium-vs-hard-sudoku',
      'solve-sudoku-without-guessing',
      '9-advanced-sudoku-techniques-that-experienced-solvers-use',
    ],
  },
  'how-to-solve-sudoku-step-by-step': {
    filename: 'how-to-solve-sudoku-step-by-step.md',
    dateModified: '2026-10-17',
    shortVersion: [
      'Start in the row, column, or box with the fewest empty cells.',
      'Name the missing digit, then check the other two units before you write it.',
      'Rescan only the units you changed. When nothing is forced, continue in the technique guides.',
    ],
    relatedPlayLinks: [PLAY.easy, PLAY.medium, PLAY.kids, PLAY.daily, PLAY.solver, PLAY.printable],
    relatedGuideSlugs: [
      'what-are-the-rules-of-sudoku',
      'how-do-you-play-sudoku-with-numbers',
      'the-complete-guide-to-how-sudoku-works',
      '5-ways-to-approach-number-puzzles-like-sudoku',
      'solve-sudoku-without-guessing',
      'naked-singles',
      'hidden-singles',
    ],
  },
  'easy-vs-medium-vs-hard-sudoku': {
    filename: 'easy-vs-medium-vs-hard-sudoku.md',
    dateModified: '2026-10-17',
    shortVersion: [
      'Easy, Medium, and Hard use the same rules. The generator’s removal target is what changes.',
      'Those targets are 30, 40, and 50 cells. A removal that would create a second solution is put back.',
      'Expert, Master, and Extreme continue the same scale at 55, 60, and 65 cells.',
    ],
    relatedPlayLinks: [
      PLAY.easy,
      PLAY.medium,
      PLAY.hard,
      PLAY.expert,
      PLAY.master,
      PLAY.extreme,
      PLAY.daily,
      PLAY.printable,
    ],
    relatedGuideSlugs: [
      'how-to-solve-sudoku-step-by-step',
      'naked-singles',
      'hidden-singles',
      'naked-pairs',
      'pointing-pairs',
      'box-line-reduction',
      'x-wing',
      'the-complete-guide-to-how-sudoku-works',
      'what-are-the-rules-of-sudoku',
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
      'how-to-solve-sudoku-step-by-step',
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
      'how-to-solve-sudoku-step-by-step',
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
  'sudoku-brain-game': {
    filename: 'sudoku-brain-game.md',
    dateModified: '2026-10-20',
    shortVersion: [
      'Place digits 1–9 once in every row, column, and 3×3 box.',
      'Start in the fullest units and use elimination before writing a number.',
      'Play free at Easy through Extreme, plus Daily, Killer Sudoku, and the Sudoku Solver.',
    ],
    relatedPlayLinks: [
      PLAY.easy,
      PLAY.medium,
      PLAY.hard,
      PLAY.expert,
      PLAY.master,
      PLAY.extreme,
      PLAY.daily,
      PLAY.killer,
      PLAY.solver,
    ],
    relatedGuideSlugs: [
      'the-complete-guide-to-how-sudoku-works',
      'what-are-the-rules-of-sudoku',
      'how-to-solve-sudoku-step-by-step',
      'easy-vs-medium-vs-hard-sudoku',
      'sudoku-pencil-marks',
    ],
  },
  'sudoku-pencil-marks': {
    filename: 'sudoku-pencil-marks.md',
    dateModified: '2026-10-20',
    shortVersion: [
      'Write a candidate only after the cell passes its row, column, and 3×3 box checks.',
      'Keep every legal number as a possibility, not a guess.',
      'After each placement, erase that digit from related notes and scan again.',
    ],
    relatedPlayLinks: [PLAY.easy, PLAY.medium, PLAY.hard, PLAY.solver, PLAY.daily],
    relatedGuideSlugs: [
      'the-complete-guide-to-how-sudoku-works',
      'what-are-the-rules-of-sudoku',
      'naked-singles',
      'hidden-singles',
      'naked-pairs',
      'how-to-solve-sudoku-step-by-step',
    ],
  },
  'what-is-the-point-of-sudoku': {
    filename: 'what-is-the-point-of-sudoku.md',
    dateModified: '2026-10-20',
    shortVersion: [
      'Sudoku is a logic puzzle built around rows, columns, and 3×3 boxes.',
      'The goal is a valid solution reached through deduction, not fast arithmetic.',
      'Treat long-term brain claims cautiously; play for the reasoning challenge.',
    ],
    relatedPlayLinks: [
      PLAY.easy,
      PLAY.medium,
      PLAY.hard,
      PLAY.expert,
      PLAY.daily,
      PLAY.killer,
    ],
    relatedGuideSlugs: [
      'the-complete-guide-to-how-sudoku-works',
      'what-are-the-rules-of-sudoku',
      'how-to-solve-sudoku-step-by-step',
      'solve-sudoku-without-guessing',
      'sudoku-brain-game',
      'easy-vs-medium-vs-hard-sudoku',
    ],
  },
};

export const guideSlugs = Object.keys(guideRegistry);
