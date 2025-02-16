import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { Difficulty } from '@/types';

import { absoluteUrl } from '@/utils/helpers';

import { SudokuGame } from '@/components/sudoku-game';

const SudokuEasy = dynamic(() => import('../../components/content/easy'));
const SudokuMedium = dynamic(() => import('../../components/content/medium'));
const SudokuHard = dynamic(() => import('../../components/content/hard'));
const SudokuExpert = dynamic(() => import('../../components/content/expert'));
const SudokuMaster = dynamic(() => import('../../components/content/master'));
const SudokuExtreme = dynamic(() => import('../../components/content/extreme'));

const metadataConfig = {
  easy: {
    title: 'Easy Sudoku | Beginner-Friendly Puzzles to Get Started',
    description:
      'Start your Sudoku journey with easy-level puzzles. Perfect for beginners, these grids help you build logic skills while having fun.',
  },
  medium: {
    title: 'Medium Sudoku | A Balanced Challenge for Puzzle Enthusiasts',
    description:
      'Take your Sudoku skills to the next level with medium-difficulty puzzles. Test your logic and strategy with a moderate challenge.',
  },
  hard: {
    title: 'Hard Sudoku | Push Your Logical Thinking to the Limit',
    description:
      'Challenge yourself with hard Sudoku puzzles. Less clues and deeper strategies make this difficulty level perfect for experienced players.',
  },
  expert: {
    title: 'Expert Sudoku | A True Test for Seasoned Players',
    description:
      'Expert-level Sudoku puzzles for advanced solvers. Tackle difficult grids with complex strategies and refined logic skills.',
  },
  master: {
    title: 'Master Sudoku | The Ultimate Brain Challenge',
    description:
      'Master-level Sudoku is designed for elite solvers. Minimal clues and intricate logic patterns make these puzzles the toughest yet.',
  },
  extreme: {
    title: 'Extreme Sudoku | The Hardest Puzzles for Sudoku Pros',
    description:
      'Extreme Sudoku is not for the faint-hearted. Only the most skilled players can conquer these ultra-challenging puzzles. Are you up for it?',
  },
};

type Props = {
  params: Promise<{ difficulty: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const difficulty = (await params).difficulty;

  return {
    title: metadataConfig[difficulty as keyof typeof metadataConfig].title,
    description: metadataConfig[difficulty as keyof typeof metadataConfig].description,
    alternates: {
      canonical: absoluteUrl(`/${difficulty}`),
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
      <SudokuGame initialDifficulty={difficultyEnum} />
      <Content />
    </>
  );
}

// Generate static paths at build time
export function generateStaticParams() {
  return validDifficulties.map((difficulty) => ({
    difficulty: difficulty,
  }));
}
