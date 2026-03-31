import { absoluteUrl } from '@/lib/utils';
import {
  getBreadcrumbSchema,
  getOrganizationSchema,
  getSoftwareApplicationSchema,
} from '@/lib/schema/shared';

export type KillerFaq = {
  question: string;
  answer: string;
};

export const killerFaqByDifficulty: Record<string, KillerFaq[]> = {
  easy: [
    {
      question: 'What is easy Killer Sudoku?',
      answer:
        'Easy Killer Sudoku uses simpler cage layouts so you can practice cage sums and standard Sudoku logic together.',
    },
    {
      question: 'How should beginners solve easy Killer Sudoku?',
      answer:
        'Start with cages that have low sums and few cells, then combine those deductions with row, column, and box elimination.',
    },
    {
      question: 'Is easy Killer Sudoku free to play online?',
      answer:
        'Yes. You can play easy Killer Sudoku online for free on Sudoku Unlimited without signup.',
    },
    {
      question: 'What should I focus on in easy Killer Sudoku?',
      answer:
        'Focus on small cages first, especially 2-cell cages with distinctive totals. Then combine cage deductions with standard row, column, and box checks.',
    },
    {
      question: 'How long does easy Killer Sudoku usually take?',
      answer:
        'Easy Killer Sudoku often takes around 10 to 20 minutes, depending on how familiar you are with common cage sum combinations.',
    },
  ],
  medium: [
    {
      question: 'What is medium Killer Sudoku?',
      answer:
        'Medium Killer Sudoku balances accessibility and challenge with tighter cage interactions and fewer direct placements.',
    },
    {
      question: 'What techniques help on medium Killer Sudoku?',
      answer:
        'Use cage sum combinations, candidate notes, and cross-checking between cage constraints and row/column limits.',
    },
    {
      question: 'Can I play medium Killer Sudoku on mobile?',
      answer: 'Yes. Medium Killer Sudoku is playable in-browser on mobile, tablet, and desktop.',
    },
    {
      question: 'What is a common mistake in medium Killer Sudoku?',
      answer:
        'A common mistake is treating cage math separately from Sudoku constraints. Strong solves come from checking cage sums and row/column limits together.',
    },
    {
      question: 'Should I use candidate notes on medium Killer Sudoku?',
      answer:
        'Yes. Candidate notes are important because cage totals create many indirect eliminations that are hard to track mentally.',
    },
  ],
  hard: [
    {
      question: 'Why is hard Killer Sudoku difficult?',
      answer:
        'Hard Killer Sudoku has fewer clues and tighter cages, so progress depends on chaining multiple logical constraints.',
    },
    {
      question: 'Do cage rules replace normal Sudoku rules?',
      answer:
        'No. You must satisfy both: standard Sudoku row/column/box rules and cage sum/no-repeat rules.',
    },
    {
      question: 'Is hard Killer Sudoku good for advanced players?',
      answer:
        'Yes. Hard Killer Sudoku is ideal if you already solve medium puzzles consistently and want deeper logic challenges.',
    },
    {
      question: 'How do I progress on hard Killer Sudoku when no cells are obvious?',
      answer:
        'Audit overlapping cages and list valid combinations for each total. Then remove impossible candidates through row, column, and box interactions.',
    },
    {
      question: 'How long does hard Killer Sudoku take?',
      answer:
        'Hard Killer Sudoku commonly takes 25 to 50 minutes, though some puzzles can run longer when deductions depend on multi-step cage interactions.',
    },
  ],
  expert: [
    {
      question: 'What is expert Killer Sudoku?',
      answer:
        'Expert Killer Sudoku is an advanced cage-sum variant with minimal direct moves and complex deduction chains.',
    },
    {
      question: 'How do I improve at expert Killer Sudoku?',
      answer:
        'Track candidate combinations per cage, avoid premature guesses, and systematically propagate eliminations across intersecting regions.',
    },
    {
      question: 'Can I play expert Killer Sudoku online for free?',
      answer: 'Yes. Expert Killer Sudoku is available to play online for free on Sudoku Unlimited.',
    },
    {
      question: 'Do expert Killer Sudoku puzzles require guessing?',
      answer:
        'They are intended to be solved logically. If you feel stuck, refining cage candidate combinations usually reveals the next deduction path.',
    },
    {
      question: 'What is the best expert Killer Sudoku workflow?',
      answer:
        'Rotate between cage-combination updates and classic Sudoku elimination. Revisit high-impact cages often because one change can unlock multiple placements.',
    },
  ],
  master: [
    {
      question: 'What defines master Killer Sudoku?',
      answer:
        'Master Killer Sudoku uses dense interactions between cages and classic regions, requiring sustained high-precision logic.',
    },
    {
      question: 'What mistakes should I avoid in master Killer Sudoku?',
      answer:
        'Avoid overcommitting early candidates. Re-check cage arithmetic and no-repeat assumptions before each placement.',
    },
    {
      question: 'Is master Killer Sudoku harder than expert?',
      answer:
        'Typically yes. Master grids usually demand longer reasoning chains and stricter candidate discipline.',
    },
    {
      question: 'What should I avoid in master Killer Sudoku?',
      answer:
        'Avoid committing to one cage interpretation too early. Keep alternatives open until another constraint confirms the correct path.',
    },
    {
      question: 'How long can master Killer Sudoku take?',
      answer:
        'Master puzzles frequently take 45 minutes to over an hour, especially when progress relies on chained cage and region deductions.',
    },
  ],
  extreme: [
    {
      question: 'What is extreme Killer Sudoku?',
      answer:
        'Extreme Killer Sudoku is an ultra-hard variant designed for experienced solvers who enjoy deep logic and minimal givens.',
    },
    {
      question: 'How long do extreme Killer Sudoku puzzles take?',
      answer:
        'Solve times vary widely, but extreme puzzles can take significantly longer because each move can depend on multiple cage interactions.',
    },
    {
      question: 'Who should attempt extreme Killer Sudoku?',
      answer:
        'Extreme mode is best for players comfortable with advanced Sudoku logic and cage-sum deduction.',
    },
    {
      question: 'Can extreme Killer Sudoku be solved without trial-and-error?',
      answer:
        'Top-quality extreme puzzles are designed to be logically solvable, but they often require very deep candidate and cage-combination analysis.',
    },
    {
      question: 'How should I train for extreme Killer Sudoku?',
      answer:
        'Strengthen speed and accuracy on expert and master first, then practice systematic cage-combination tracking and contradiction checking.',
    },
  ],
};

const killerDescriptionByDifficulty: Record<string, string> = {
  easy: 'Play easy Killer Sudoku online for free. Learn cage sums and no-repeat cage logic with beginner-friendly puzzles.',
  medium:
    'Play medium Killer Sudoku online for a balanced cage-sum challenge with classic Sudoku constraints.',
  hard: 'Play hard Killer Sudoku online with fewer clues and tighter cage constraints.',
  expert: 'Play expert Killer Sudoku online for advanced cage-based logic challenges.',
  master: 'Play master Killer Sudoku online and test deep logic with strict cage sums.',
  extreme: 'Play extreme Killer Sudoku online with ultra-hard cage-sum puzzle challenges.',
};

export function getKillerSchema(difficulty: string = 'easy') {
  const baseUrl = absoluteUrl();
  const normalizedDifficulty = difficulty.toLowerCase();
  const pageUrl = absoluteUrl(`/killer-sudoku/${normalizedDifficulty}`);
  const faqs = killerFaqByDifficulty[normalizedDifficulty] ?? killerFaqByDifficulty.easy;
  const description =
    killerDescriptionByDifficulty[normalizedDifficulty] ?? killerDescriptionByDifficulty.easy;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: `${normalizedDifficulty.charAt(0).toUpperCase()}${normalizedDifficulty.slice(1)} Killer Sudoku`,
        description,
        url: pageUrl,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
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
        name: 'How to play Killer Sudoku',
        step: [
          { '@type': 'HowToStep', text: 'Fill every row with numbers 1-9 without repetition.' },
          { '@type': 'HowToStep', text: 'Fill every column with numbers 1-9 without repetition.' },
          { '@type': 'HowToStep', text: 'Fill every 3x3 box with numbers 1-9 without repetition.' },
          {
            '@type': 'HowToStep',
            text: 'For each cage, numbers must add up to the cage sum and cannot repeat in that cage.',
          },
        ],
      },
      getBreadcrumbSchema([
        { name: 'Home', url: baseUrl },
        { name: 'Killer Sudoku', url: pageUrl },
      ]),
      getOrganizationSchema(),
      getSoftwareApplicationSchema(),
    ],
  };
}
