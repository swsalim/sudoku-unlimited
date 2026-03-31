import { absoluteUrl } from '@/lib/utils';

import {
  getBreadcrumbSchema,
  getOrganizationSchema,
  getSoftwareApplicationSchema,
} from '@/lib/schema/shared';

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqByDifficulty: Record<string, FaqItem[]> = {
  easy: [
    {
      question: 'What is easy Sudoku?',
      answer:
        'Easy Sudoku puzzles have more given numbers on the grid, making them ideal for beginners. They help you learn the rules, spot patterns, and build confidence. Every row, column, and 3×3 box must contain 1–9 without repetition.',
    },
    {
      question: 'How do I solve easy Sudoku?',
      answer:
        'Start by scanning for obvious placements—look for rows, columns, or boxes missing only one or two numbers. Use pencil marks to note possible candidates and the elimination method: if a number already appears in a row, column, or box, it cannot go there.',
    },
    {
      question: 'Is easy Sudoku free to play online?',
      answer:
        'Yes. Easy Sudoku puzzles on Sudoku Unlimited are free to play online with no signup or download required. Play on your phone, tablet, or computer.',
    },
    {
      question: 'How long does an easy Sudoku puzzle usually take?',
      answer:
        'Most easy puzzles take around 5 to 15 minutes, depending on your experience and whether you use notes.',
    },
    {
      question: 'What is the most common beginner mistake in easy Sudoku?',
      answer:
        'The most common mistake is placing a number too quickly without checking the full row, column, and 3x3 box. Slow, consistent scanning prevents early errors.',
    },
  ],
  medium: [
    {
      question: 'What is medium Sudoku?',
      answer:
        'Medium Sudoku offers a balanced challenge with fewer starting numbers than easy puzzles. It requires more logical reasoning and pattern recognition. Techniques like naked pairs and hidden singles become important as you improve.',
    },
    {
      question: 'What techniques work for medium Sudoku?',
      answer:
        'Combine scanning and elimination with naked pairs (two cells sharing only the same two possible numbers) and hidden singles (a number that can only go in one cell within a row, column, or box). Stay patient and methodical.',
    },
    {
      question: 'When should I move from easy to medium Sudoku?',
      answer:
        'Move to medium when easy puzzles feel quick to solve. Medium Sudoku is the natural step between beginner and advanced levels—perfect for building confidence and discovering new techniques.',
    },
    {
      question: 'How long does medium Sudoku usually take?',
      answer:
        'Many players finish medium puzzles in 10 to 25 minutes. Times vary based on how comfortable you are with candidate elimination and pair techniques.',
    },
    {
      question: 'Should I use notes on medium Sudoku?',
      answer:
        'Yes. Notes become very useful on medium because many cells have multiple candidates. Keeping candidates clean helps you spot hidden singles and pairs faster.',
    },
  ],
  hard: [
    {
      question: 'What makes hard Sudoku challenging?',
      answer:
        'Hard Sudoku has fewer clues, requiring more than simple scanning. You must analyze possibilities, spot patterns, and think several moves ahead. Techniques like pointing pairs and box-line reduction are essential.',
    },
    {
      question: 'What are pointing pairs and box-line reduction?',
      answer:
        'Pointing pairs: when a number appears in only two cells within a box and both align with the same row or column—eliminate that number from other cells in that row or column. Box-line reduction works similarly when a number is confined to one row or column within a box.',
    },
    {
      question: 'Is hard Sudoku suitable for beginners?',
      answer:
        'Hard Sudoku is best for experienced players who have mastered easy and medium levels. Start with easier puzzles if you are new to the game.',
    },
    {
      question: 'How do I get unstuck on hard Sudoku without guessing?',
      answer:
        'Re-check your candidate notes box by box, then look for interactions between rows, columns, and boxes. Hidden eliminations often appear after cleaning up old notes.',
    },
    {
      question: 'How long does a hard Sudoku puzzle take?',
      answer:
        'Hard Sudoku commonly takes 20 to 45 minutes, though some grids can take longer if they require several advanced deductions.',
    },
  ],
  expert: [
    {
      question: 'What is expert Sudoku?',
      answer:
        'Expert Sudoku has minimal given numbers and demands strong logic and attention to detail. You need advanced techniques like X-Wing and Swordfish, plus the ability to identify subtle patterns and make educated guesses in difficult sections.',
    },
    {
      question: 'What are X-Wing and Swordfish techniques?',
      answer:
        'X-Wing applies when the same number appears in only two possible positions in two rows (or columns), forming a rectangle—you can remove that number from other cells in those columns (or rows). Swordfish extends this logic across three rows or columns.',
    },
    {
      question: 'How do I prepare for expert Sudoku?',
      answer:
        'Master hard Sudoku first. At expert level, clear pencil marks and consistent candidate elimination are essential. Take your time and avoid rushing.',
    },
    {
      question: 'Do expert Sudoku puzzles require guessing?',
      answer:
        'A well-constructed expert puzzle can be solved logically. It may feel like guessing if candidates are incomplete, so accurate notes are critical.',
    },
    {
      question: 'What is a good expert Sudoku strategy?',
      answer:
        'Cycle between candidate cleanup and advanced pattern checks. Look for X-Wing/Swordfish opportunities only after simpler eliminations are exhausted.',
    },
  ],
  master: [
    {
      question: 'What is master Sudoku?',
      answer:
        'Master Sudoku is for the most dedicated solvers, with many numbers removed from the grid. It demands careful planning and advanced techniques like XY-Wing and W-Wing. Complex patterns appear frequently, requiring intricate logic and deep focus.',
    },
    {
      question: 'What are XY-Wing and W-Wing?',
      answer:
        'XY-Wing uses three cells with a specific set of possibilities to eliminate numbers from surrounding cells. W-Wing helps spot pairs of numbers that force a chain of eliminations. Both require patience, precision, and systematic pencil marking.',
    },
    {
      question: 'Is master Sudoku harder than expert?',
      answer:
        'Yes. Master Sudoku is designed for players who have outgrown expert. Solving one is a rewarding achievement for dedicated Sudoku enthusiasts.',
    },
    {
      question: 'How long can a master Sudoku puzzle take?',
      answer:
        'Master puzzles often take 40 minutes to well over an hour, depending on puzzle structure and how efficiently you track candidate chains.',
    },
    {
      question: 'What should I do after making a mistake in master Sudoku?',
      answer:
        'Undo to the last confirmed logical step, then rebuild candidates in affected areas. Recovering methodically is faster than trying to patch uncertain placements.',
    },
  ],
  extreme: [
    {
      question: 'What is extreme Sudoku?',
      answer:
        'Extreme Sudoku is for the sharpest solvers. With very few clues, standard techniques are not enough—you need deep pattern recognition and high-level methods like Forcing Chains and Nishio. These are among the toughest logic challenges you can face.',
    },
    {
      question: 'What are Forcing Chains and Nishio?',
      answer:
        'Forcing Chains track multiple possibilities in a chain—if one path leads to a contradiction, you can eliminate it. Nishio is trial-and-error: assume a number placement and follow the logic; if it results in a contradiction, the assumption was wrong.',
    },
    {
      question: 'Who should attempt extreme Sudoku?',
      answer:
        'Extreme Sudoku is for true Sudoku experts who have mastered all other levels. Solving one is a badge of honor and one of the most satisfying achievements in the game.',
    },
    {
      question: 'Can extreme Sudoku be solved purely with logic?',
      answer:
        'High-quality extreme puzzles are intended to be logically solvable, but they require deep chains, advanced pattern recognition, and disciplined candidate tracking.',
    },
    {
      question: 'How should I practice for extreme Sudoku?',
      answer:
        'Build consistency on expert and master first, then practice advanced techniques one at a time. Reviewing finished grids helps you understand missed deduction paths.',
    },
  ],
};

const difficultyLabels: Record<string, string> = {
  easy: 'Easy Sudoku',
  medium: 'Medium Sudoku',
  hard: 'Hard Sudoku',
  expert: 'Expert Sudoku',
  master: 'Master Sudoku',
  extreme: 'Extreme Sudoku',
};

const difficultyDescriptions: Record<string, string> = {
  easy: 'Play free easy Sudoku online. More clues and straightforward logic make these puzzles ideal for learning the rules or a relaxing solve. No signup—play instantly in your browser.',
  medium: 'Free medium Sudoku puzzles with a balanced challenge. Step up from easy—more strategy, same satisfying solve. Perfect for building confidence and discovering new techniques.',
  hard: 'Free hard Sudoku for experienced solvers. Fewer clues demand hidden singles, naked pairs, and deeper logic. No app download or account required—play in your browser.',
  expert: 'Free expert Sudoku for advanced players. X-wings, swordfish, and complex patterns—a true test of logic and technique. Play instantly, no registration.',
  master: 'Minimal clues, maximum challenge. Master-level grids for players who\'ve outgrown expert—intricate logic, deep focus, and the satisfaction of a hard-earned solve.',
  extreme: 'Free extreme Sudoku—the pinnacle. Sparse grids, advanced techniques required. Only the sharpest solvers need apply. Play the ultimate challenge, no account needed.',
};

export function getDifficultySchema(difficulty: string) {
  const faqs = faqByDifficulty[difficulty];
  const label = difficultyLabels[difficulty] ?? difficulty;
  const description = difficultyDescriptions[difficulty] ?? '';
  const baseUrl = absoluteUrl();
  const pageUrl = absoluteUrl(`/${difficulty}`);

  if (!faqs) return null;

  const webPageSchema = {
    '@type': 'WebPage',
    name: label,
    description,
    url: pageUrl,
  };

  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: label, url: pageUrl },
  ]);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPageSchema,
      faqSchema,
      breadcrumbSchema,
      getOrganizationSchema(),
      getSoftwareApplicationSchema(),
    ],
  };
}
