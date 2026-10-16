import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Difficulty } from '@/types';

import { openGraphImages, twitterImages } from '@/lib/open-graph';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { DifficultyFaqSection } from '@/components/difficulty-faq-section';
import { DifficultyPageSections } from '@/components/difficulty-page-sections';
import { DifficultySchemaScript } from '@/components/schemas';
import { SudokuGame } from '@/components/sudoku-game';

const heroCopy: Record<string, string> = {
  easy: 'More starting numbers and direct logic. Learn the rules, or settle in for a quiet solve, and start a new puzzle whenever you want one.',
  medium: 'A step up from easy: fewer clues, and room to practice pairs and hidden singles. Still a puzzle you can finish in one sitting.',
  hard: 'Fewer givens, so you hunt singles and pairs instead of filling the obvious cells. For solvers who already finish medium.',
  expert: 'Notes, X-wings, and swordfish. A harder grid for players who already keep candidates and want patterns easier puzzles never show.',
  master: 'Minimal clues and longer chains of logic. For players who have outgrown expert and want a solve they have to earn.',
  extreme: 'The sparsest puzzles we generate. Bring advanced techniques, and the patience to use them one deduction at a time.',
};

const metadataConfig: Record<string, { title: string; description: string; keywords: string[] }> = {
  easy: {
    title: 'Easy Sudoku · Free Beginner Puzzles Online',
    description:
      'Play free easy Sudoku online. More clues and straightforward logic make these puzzles ideal for learning the rules or a relaxing solve. No signup—play instantly in your browser.',
    keywords: ['easy sudoku', 'beginner sudoku', 'free sudoku online', 'simple sudoku'],
  },
  medium: {
    title: 'Medium Sudoku · Free Intermediate Puzzles Online',
    description:
      'Free medium Sudoku puzzles with a balanced challenge. Step up from easy—more strategy, same satisfying solve. Perfect for building confidence and discovering new techniques.',
    keywords: ['medium sudoku', 'intermediate sudoku', 'free sudoku', 'online sudoku'],
  },
  hard: {
    title: 'Hard Sudoku · Free Challenging Puzzles Online',
    description:
      'Free hard Sudoku for experienced solvers. Fewer clues demand hidden singles, naked pairs, and deeper logic. No app download or account required—play in your browser.',
    keywords: ['hard sudoku', 'challenging sudoku', 'difficult sudoku', 'free sudoku'],
  },
  expert: {
    title: 'Expert Sudoku · Free Advanced Puzzles Online',
    description:
      'Free expert Sudoku for advanced players. X-wings, swordfish, and complex patterns—a true test of logic and technique. Play instantly, no registration.',
    keywords: ['expert sudoku', 'advanced sudoku', 'hard sudoku', 'free sudoku online'],
  },
  master: {
    title: 'Master Sudoku · Free Elite Puzzles Online',
    description:
      'Minimal clues, maximum challenge. Master-level grids for players who’ve outgrown expert—intricate logic, deep focus, and the satisfaction of a hard-earned solve.',
    keywords: ['master sudoku', 'elite sudoku', 'hardest sudoku', 'free sudoku'],
  },
  extreme: {
    title: 'Extreme Sudoku · Free Ultra-Hard Puzzles Online',
    description:
      'Free extreme Sudoku—the pinnacle. Sparse grids, advanced techniques required. Only the sharpest solvers need apply. Play the ultimate challenge, no account needed.',
    keywords: ['extreme sudoku', 'ultra hard sudoku', 'hardest sudoku', 'free sudoku'],
  },
};

type Props = {
  params: Promise<{ difficulty: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const difficulty = (await params).difficulty?.toLowerCase() ?? '';
  const config = metadataConfig[difficulty];

  // Invalid difficulty—return minimal metadata; page will call notFound()
  if (!config) {
    return {
      title: 'Sudoku',
    };
  }

  const canonicalUrl = absoluteUrl(`/${difficulty}`);

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonicalUrl,
      images: openGraphImages,
    },
    twitter: {
      title: config.title,
      description: config.description,
      ...twitterImages,
    },
  };
}

// Create a type-safe array of valid difficulties
const validDifficulties = Object.values(Difficulty).map((d) => d.toLowerCase());

interface PageProps {
  params: Promise<{ difficulty: string }>;
}

export default async function DifficultyPage({ params }: PageProps) {
  // Convert param to lowercase for comparison
  const difficulty = (await params).difficulty.toLowerCase();

  // Check if the difficulty is valid
  if (!validDifficulties.includes(difficulty)) {
    notFound(); // This will show the 404 page
  }

  // Convert back to proper case for the enum
  const difficultyEnum = (difficulty.charAt(0).toUpperCase() + difficulty.slice(1)) as Difficulty;

  return (
    <>
      <DifficultySchemaScript difficulty={difficulty} />
      <section className="relative">
        <Image
          src="/images/hero-home.webp"
          alt="Sudoku background"
          width={1000}
          height={1000}
          unoptimized
          className="absolute inset-0 h-full w-full object-cover dark:hidden"
        />
        <Container className="relative z-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-4xl font-black dark:text-stone-50">
              Play {difficultyEnum} Sudoku Online
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400">{heroCopy[difficulty]}</p>
          </div>
          <SudokuGame initialDifficulty={difficultyEnum} />
        </Container>
      </section>

      <DifficultyPageSections difficulty={difficulty} />
      <DifficultyFaqSection difficulty={difficulty} />
    </>
  );
}

// Generate static paths at build time
export function generateStaticParams() {
  return validDifficulties.map((difficulty) => ({
    difficulty: difficulty,
  }));
}
