import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { Difficulty } from '@/types';

import { absoluteUrl } from '@/lib/utils';

import { DifficultyFaqSection } from '@/components/difficulty-faq-section';
import { DifficultySchemaScript } from '@/components/schemas';
import { SudokuGame } from '@/components/sudoku-game';

const SudokuEasy = dynamic(() => import('../../components/content/easy'));
const SudokuMedium = dynamic(() => import('../../components/content/medium'));
const SudokuHard = dynamic(() => import('../../components/content/hard'));
const SudokuExpert = dynamic(() => import('../../components/content/expert'));
const SudokuMaster = dynamic(() => import('../../components/content/master'));
const SudokuExtreme = dynamic(() => import('../../components/content/extreme'));

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
    },
    twitter: {
      title: config.title,
      description: config.description,
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

  let Content;

  switch (difficulty) {
    case 'easy':
      Content = SudokuEasy;
      break;
    case 'medium':
      Content = SudokuMedium;
      break;
    case 'hard':
      Content = SudokuHard;
      break;
    case 'expert':
      Content = SudokuExpert;
      break;
    case 'master':
      Content = SudokuMaster;
      break;
    case 'extreme':
      Content = SudokuExtreme;
      break;
    default:
      Content = SudokuEasy;
      break;
  }

  return (
    <>
      <DifficultySchemaScript difficulty={difficulty} />
      <SudokuGame initialDifficulty={difficultyEnum} />
      <Content />
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
