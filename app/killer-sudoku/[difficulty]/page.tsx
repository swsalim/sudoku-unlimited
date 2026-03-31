import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Difficulty, GameVariant } from '@/types';

import { absoluteUrl } from '@/lib/utils';

import { KillerFaqSection } from '@/components/killer-faq-section';
import { KillerSchemaScript } from '@/components/schemas';
import { SudokuGame } from '@/components/sudoku-game';

const metadataConfig: Record<string, { title: string; description: string; keywords: string[] }> = {
  easy: {
    title: 'Easy Killer Sudoku · Play Free Online',
    description:
      'Play easy Killer Sudoku online. Learn cage sums and no-repeat cage logic with beginner-friendly free puzzles.',
    keywords: ['easy killer sudoku', 'killer sudoku online', 'free killer sudoku'],
  },
  medium: {
    title: 'Medium Killer Sudoku · Play Free Online',
    description:
      'Play medium Killer Sudoku online for a balanced challenge with cage-sum logic and classic Sudoku rules.',
    keywords: ['medium killer sudoku', 'killer sudoku puzzle', 'play killer sudoku'],
  },
  hard: {
    title: 'Hard Killer Sudoku · Play Free Online',
    description:
      'Play hard Killer Sudoku online with fewer clues and tighter cage constraints. No signup required.',
    keywords: ['hard killer sudoku', 'difficult killer sudoku', 'killer sudoku free'],
  },
  expert: {
    title: 'Expert Killer Sudoku · Play Free Online',
    description: 'Play expert Killer Sudoku online for advanced cage-based logic challenges.',
    keywords: ['expert killer sudoku', 'advanced killer sudoku', 'killer sudoku game'],
  },
  master: {
    title: 'Master Killer Sudoku · Play Free Online',
    description: 'Play master Killer Sudoku online and test deep logic with strict cage sums.',
    keywords: ['master killer sudoku', 'challenging killer sudoku', 'killer sudoku'],
  },
  extreme: {
    title: 'Extreme Killer Sudoku · Play Free Online',
    description:
      'Play extreme Killer Sudoku online. Ultra-hard cage-sum Sudoku for experienced solvers.',
    keywords: ['extreme killer sudoku', 'ultra hard killer sudoku', 'killer sudoku online'],
  },
};

const validDifficulties = Object.values(Difficulty).map((d) => d.toLowerCase());
type DifficultyCopy = {
  heading: string;
  intro: string;
  overview: string;
  strategyHeading: string;
  strategy: string;
  tips: string[];
  mistakesHeading: string;
  mistakes: string;
  whoForHeading: string;
  whoFor: string;
};

const difficultyCopy: Record<string, DifficultyCopy> = {
  easy: {
    heading: 'Easy Killer Sudoku',
    intro:
      'Easy Killer Sudoku is ideal for learning cage arithmetic and no-repeat cage logic. Start with low-sum cages and combine those clues with standard Sudoku elimination.',
    overview:
      'This level gives you a gentle way to understand how cage totals guide placements. You still follow classic Sudoku rules, but cage sums create extra signals that help beginners see patterns faster.',
    strategyHeading: 'Best strategy for easy Killer Sudoku',
    strategy:
      'Begin with tiny cages and obvious sums, then verify each move against row, column, and 3x3 box constraints. Most easy puzzles can be solved with simple arithmetic, candidate notes, and consistent scanning.',
    tips: [
      'Prioritize cages with 1-2 cells; they often reveal immediate placements.',
      'Keep notes for cage combinations and update them after every confirmed value.',
      'Use row/column checks to eliminate cage candidates quickly.',
    ],
    mistakesHeading: 'Common beginner mistakes',
    mistakes:
      'A frequent mistake is solving cages in isolation. Always cross-check with classic Sudoku constraints before committing. Another common error is forgetting that numbers cannot repeat inside the same cage.',
    whoForHeading: 'Who should play easy mode?',
    whoFor:
      'Easy mode is perfect for first-time Killer Sudoku players, classic Sudoku beginners, and anyone who wants a relaxing logic puzzle with clear progress.',
  },
  medium: {
    heading: 'Medium Killer Sudoku',
    intro:
      'Medium Killer Sudoku adds denser cage interactions. You need to blend cage totals with row, column, and box restrictions to keep progress steady.',
    overview:
      'At medium difficulty, cage sums start interacting across multiple regions, which creates richer deduction chains. You will rely more on candidate management than direct placement.',
    strategyHeading: 'Best strategy for medium Killer Sudoku',
    strategy:
      'Map cage combinations early, then revisit them whenever a row or column gets tighter. Medium puzzles reward disciplined note-taking and careful elimination rather than trial and error.',
    tips: [
      'Track cage pair and triple combinations that fit each target sum.',
      'When a cage intersects multiple regions, propagate eliminations both ways.',
      'Avoid guessing: medium grids usually crack with consistent candidate pruning.',
    ],
    mistakesHeading: 'Common medium-level mistakes',
    mistakes:
      'Players often keep stale notes after placing a number elsewhere. Refresh candidates frequently. Also avoid forcing a cage sum without checking box constraints, which can create hidden contradictions.',
    whoForHeading: 'Who should play medium mode?',
    whoFor:
      'Medium is ideal for players comfortable with easy Killer Sudoku and classic medium Sudoku who want deeper logic without extreme complexity.',
  },
  hard: {
    heading: 'Hard Killer Sudoku',
    intro:
      'Hard Killer Sudoku has tighter constraints and fewer direct moves. Solve by chaining deductions from cage math into classical Sudoku structures.',
    overview:
      'Hard puzzles reduce obvious moves and require multi-step reasoning. Progress often comes from combining several partial constraints rather than finding immediate single-cell answers.',
    strategyHeading: 'Best strategy for hard Killer Sudoku',
    strategy:
      'Treat each cage as part of a larger system. Build short deduction chains, validate them, and then expand. Focus on high-impact regions where one update affects multiple cages and lines.',
    tips: [
      'Treat each cage as a constraint system, not a standalone clue.',
      'Re-validate no-repeat cage assumptions whenever a region narrows.',
      'Use contradiction checks sparingly to confirm difficult branches.',
    ],
    mistakesHeading: 'Common hard-level mistakes',
    mistakes:
      'A common issue is jumping to advanced patterns too early. Hard puzzles still reward fundamentals. Another issue is arithmetic drift in larger cages; verify totals before locking candidates.',
    whoForHeading: 'Who should play hard mode?',
    whoFor:
      'Hard mode is for experienced solvers who consistently finish medium Killer Sudoku and want a meaningful jump in analytical depth.',
  },
  expert: {
    heading: 'Expert Killer Sudoku',
    intro:
      'Expert Killer Sudoku is built for advanced solvers. Progress depends on deep candidate tracking across overlapping cage and grid constraints.',
    overview:
      'Expert puzzles are designed to test precision and endurance. You will often need layered eliminations where one logical thread unlocks multiple regions later in the solve.',
    strategyHeading: 'Best strategy for expert Killer Sudoku',
    strategy:
      'Use structured passes: cage sums first, then row/column/box constraints, then consistency checks. Repeat until new candidates collapse. Keep notes minimal but exact.',
    tips: [
      'Maintain clean notes; precision is more important than speed at this level.',
      'Resolve high-impact cages first where many rows/columns intersect.',
      'Double-check arithmetic after each chain of eliminations.',
    ],
    mistakesHeading: 'Common expert-level mistakes',
    mistakes:
      'The biggest risk is overcomplicating simple constraints. Recheck basic no-repeat and cage sum interactions before trying advanced assumptions. Small arithmetic slips can derail long solve chains.',
    whoForHeading: 'Who should play expert mode?',
    whoFor:
      'Expert mode fits advanced logic puzzle players who enjoy slow, methodical solving and can manage dense candidate interactions.',
  },
  master: {
    heading: 'Master Killer Sudoku',
    intro:
      'Master Killer Sudoku demands disciplined logic and careful bookkeeping. Subtle cage interactions can define the entire solve path.',
    overview:
      'Master puzzles are built for high-level consistency. Many placements depend on cumulative constraints across distant areas of the grid, so maintaining clean logic is critical.',
    strategyHeading: 'Best strategy for master Killer Sudoku',
    strategy:
      'Break solves into checkpoints. At each checkpoint, verify cage totals, no-repeat rules, and region candidates before continuing. This prevents chain errors and preserves momentum.',
    tips: [
      'Look for cages that can force values in multiple regions simultaneously.',
      'Keep sum combinations explicit to avoid silent candidate drift.',
      'Break long chains into checkpoints and verify consistency often.',
    ],
    mistakesHeading: 'Common master-level mistakes',
    mistakes:
      'The most common problem is carrying hidden assumptions too far. If progress stalls, rewind to the last confirmed state and rebuild deductions with stricter verification.',
    whoForHeading: 'Who should play master mode?',
    whoFor:
      'Master mode is for expert-level players who want long-form, high-difficulty logic puzzles and are comfortable with deliberate, detail-heavy solving.',
  },
  extreme: {
    heading: 'Extreme Killer Sudoku',
    intro:
      'Extreme Killer Sudoku is an ultra-hard logic challenge. You will need long-form deduction chains and rigorous candidate control.',
    overview:
      'Extreme difficulty is intended for top-tier solvers. These grids minimize straightforward progress and require sustained logical discipline from start to finish.',
    strategyHeading: 'Best strategy for extreme Killer Sudoku',
    strategy:
      'Solve in cycles. Build a candidate baseline, apply cage and region eliminations, then audit every assumption before the next cycle. Precision outperforms speed in extreme mode.',
    tips: [
      'Start by mapping all plausible combinations for larger cages.',
      'Use elimination waves: update cages, then rows/columns/boxes, and repeat.',
      'Take deliberate passes through the board to reduce error risk.',
    ],
    mistakesHeading: 'Common extreme-level mistakes',
    mistakes:
      'Rushing is the main failure mode. Extreme puzzles punish unchecked assumptions. If a chain feels uncertain, pause and re-validate arithmetic and no-repeat constraints before proceeding.',
    whoForHeading: 'Who should play extreme mode?',
    whoFor:
      'Extreme mode is for highly experienced Killer Sudoku players seeking maximum challenge and deep, technical deduction.',
  },
};

type Props = {
  params: Promise<{ difficulty: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const difficulty = (await params).difficulty?.toLowerCase() ?? '';
  const config = metadataConfig[difficulty];
  if (!config) return { title: 'Killer Sudoku' };

  const canonicalUrl = absoluteUrl(`/killer-sudoku/${difficulty}`);
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonicalUrl,
    },
    twitter: {
      title: config.title,
      description: config.description,
    },
  };
}

export default async function KillerDifficultyPage({ params }: Props) {
  const difficulty = (await params).difficulty.toLowerCase();
  if (!validDifficulties.includes(difficulty)) notFound();
  const difficultyEnum = (difficulty.charAt(0).toUpperCase() + difficulty.slice(1)) as Difficulty;
  const copy = difficultyCopy[difficulty] ?? difficultyCopy.easy;

  return (
    <>
      <KillerSchemaScript difficulty={difficulty} />
      <SudokuGame initialDifficulty={difficultyEnum} variant={GameVariant.KILLER} />
      <section className="prose mt-12 max-w-none dark:prose-invert dark:bg-stone-900/50">
        <div className="mx-auto max-w-4xl px-4 py-20">
          <h1 className="font-heading text-4xl font-bold">{copy.heading}</h1>
          <p>{copy.intro}</p>
          <p>{copy.overview}</p>
          <h2 className="font-heading text-2xl font-bold">{copy.strategyHeading}</h2>
          <p>{copy.strategy}</p>
          <h3 className="font-heading text-xl font-bold">
            How to solve {difficulty} Killer Sudoku faster
          </h3>
          <ul>
            {copy.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <h3 className="font-heading text-xl font-bold">{copy.mistakesHeading}</h3>
          <p>{copy.mistakes}</p>
          <h3 className="font-heading text-xl font-bold">{copy.whoForHeading}</h3>
          <p>{copy.whoFor}</p>
          <p>
            Looking for classic puzzles too? Try <Link href="/easy">Easy Sudoku</Link> or explore
            all <Link href="/">Sudoku levels</Link>.
          </p>
        </div>
      </section>
      <KillerFaqSection difficulty={difficulty} />
    </>
  );
}

export function generateStaticParams() {
  return validDifficulties.map((difficulty) => ({ difficulty }));
}
