import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowCounterClockwise,
  ArrowRight,
  BookOpen,
  CalendarBlank,
  GameController,
  Lightbulb,
  ListChecks,
  Notebook,
  Printer,
  ShieldCheck,
  Sparkle,
} from '@phosphor-icons/react/ssr';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { SudokuSolverSchemaScript } from '@/components/schemas';
import { SudokuSolver } from '@/components/sudoku-solver';
import { SudokuSolverFaqSection } from '@/components/sudoku-solver-faq-section';

const SOLVER_FEATURES = [
  {
    title: 'Instant Solve',
    description: 'Fill a valid grid in seconds',
    icon: Sparkle,
    iconClass: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
  {
    title: 'Explain Next Step',
    description: 'See the logic for one move',
    icon: Lightbulb,
    iconClass: 'bg-amber-100 text-amber-500 dark:bg-amber-500/15 dark:text-amber-300',
  },
  {
    title: 'Show All Steps',
    description: 'Walk through the full solution',
    icon: ListChecks,
    iconClass: 'bg-blue-100 text-blue-500 dark:bg-blue-500/15 dark:text-blue-300',
  },
  {
    title: 'Example Puzzle',
    description: 'Load a sample grid to try',
    icon: Notebook,
    iconClass: 'bg-orange-100 text-orange-500 dark:bg-orange-500/15 dark:text-orange-300',
  },
  {
    title: 'Undo and Clear',
    description: 'Fix a cell or start over',
    icon: ArrowCounterClockwise,
    iconClass: 'bg-violet-100 text-violet-500 dark:bg-violet-500/15 dark:text-violet-300',
  },
  {
    title: 'Conflict Check',
    description: 'Repeated digits are highlighted',
    icon: ShieldCheck,
    iconClass: 'bg-teal-100 text-teal-500 dark:bg-teal-500/15 dark:text-teal-300',
  },
] as const;

const HOW_TO_ENTER_YOUR_PUZZLE = [
  {
    title: 'Enter the given numbers',
    description: 'Copy only the known numbers from your puzzle.',
    cardClass: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeClass: 'bg-emerald-500',
    visual: 'given',
  },
  {
    title: 'Leave other cells empty',
    description: "Don't fill in unknown cells. Keep them blank.",
    cardClass: 'bg-sky-50 dark:bg-sky-950/40',
    badgeClass: 'bg-sky-500',
    visual: 'empty',
  },
  {
    title: 'Use digits 1-9',
    description: 'Enter one number per cell using the keypad or keyboard.',
    cardClass: 'bg-amber-50 dark:bg-amber-950/40',
    badgeClass: 'bg-amber-500',
    visual: 'digits',
  },
  {
    title: 'Click Solve',
    description: 'Get the completed grid instantly.',
    cardClass: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeClass: 'bg-emerald-500',
    visual: 'solve',
  },
] as const;

const MORE_SUDOKU_TOOLS = [
  {
    href: '/',
    title: 'Play Sudoku',
    description: 'Try randomly generated puzzles at all difficulty levels.',
    icon: GameController,
    iconClass: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
  {
    href: '/daily',
    title: 'Daily Challenge',
    description: 'A new puzzle every day for everyone.',
    icon: CalendarBlank,
    iconClass: 'bg-orange-100 text-orange-500 dark:bg-orange-500/15 dark:text-orange-300',
  },
  {
    href: '/printable',
    title: 'Printable Puzzles',
    description: 'Download and print Sudoku puzzles.',
    icon: Printer,
    iconClass: 'bg-violet-100 text-violet-500 dark:bg-violet-500/15 dark:text-violet-300',
  },
  {
    href: '/guides',
    title: 'Learn Sudoku',
    description: 'Guides, tips and strategies to improve your skills.',
    icon: BookOpen,
    iconClass: 'bg-sky-100 text-sky-500 dark:bg-sky-500/15 dark:text-sky-300',
  },
] as const;

const title = 'Sudoku Solver - Solve This Sudoku Puzzle Online';
const description =
  'Use this free Sudoku solver to solve this Sudoku puzzle instantly or with step-by-step explanations. Enter your 9x9 grid, validate conflicts, and get the full solution online.';
const canonicalUrl = absoluteUrl('/sudoku-solver');

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'solve this sudoku',
    'sudoku solver',
    'solve sudoku online',
    'sudoku puzzle solver',
    'free sudoku solver',
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
  },
  twitter: {
    title,
    description,
  },
};

export default function SudokuSolverPage() {
  return (
    <>
      <SudokuSolverSchemaScript />
      <section className="relative">
        <Image
          src="/images/hero-home.webp"
          alt="Sudoku background"
          width={1000}
          height={1000}
          unoptimized
          className="absolute inset-0 h-full w-full object-cover"
        />
        <Container className="relative z-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-4xl font-black dark:text-stone-50">
              Solve This Sudoku Puzzle Online
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400">
              Enter your puzzle digits and solve it instantly. Use 1-9 for known values and leave
              other cells blank.
            </p>
          </div>
          <SudokuSolver />
        </Container>
      </section>

      <section
        aria-labelledby="solver-features-heading"
        className="border-y border-stone-200/80 bg-white/60 dark:border-stone-800 dark:bg-stone-900/40">
        <h2 id="solver-features-heading" className="sr-only">
          Solver features
        </h2>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-10 sm:grid-cols-3 lg:grid-cols-6">
          {SOLVER_FEATURES.map(
            ({ title: featureTitle, description: featureDescription, icon: Icon, iconClass }) => (
              <div key={featureTitle} className="flex flex-col items-center px-2 text-center">
                <span
                  className={`mb-3 inline-flex size-14 items-center justify-center rounded-full ${iconClass}`}>
                  <Icon weight="duotone" size={28} aria-hidden />
                </span>
                <p className="text-sm font-bold text-stone-900 dark:text-stone-50">
                  {featureTitle}
                </p>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {featureDescription}
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="prose mt-8 max-w-none dark:prose-invert">
        <Container className="max-w-6xl">
          <h2 className="font-heading text-3xl font-black dark:text-stone-50">
            How to Solve This Sudoku Quickly
          </h2>
          <p>
            If you are stuck and searching for how to solve this Sudoku, enter your known digits
            into the grid above and press <strong>Solve</strong>. The solver applies standard Sudoku
            rules (rows, columns, and 3x3 boxes) and fills the board in seconds.
          </p>
          <p>
            Want to learn instead of jumping to the final answer? Use{' '}
            <strong>Explain Next Step</strong> for guided logic or <strong>Show All Steps</strong>{' '}
            to view a full sequence of explainable moves.
          </p>

          <h2 className="font-heading text-3xl font-black dark:text-stone-50">
            How to Enter Your Puzzle
          </h2>
          <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_TO_ENTER_YOUR_PUZZLE.map((step, index) => (
              <div key={step.title} className={`rounded-2xl px-4 py-5 ${step.cardClass}`}>
                <div className="relative flex h-44 items-center justify-center">
                  <span
                    className={`absolute left-0 top-1 flex size-7 items-center justify-center rounded-full text-sm font-bold text-white ${step.badgeClass}`}>
                    {index + 1}
                  </span>
                  <Image
                    src={`/images/how-to-play-step-${index + 1}.webp`}
                    alt={step.title}
                    width={400}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-base font-bold text-stone-900 dark:text-stone-50">
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-3xl font-black dark:text-stone-50">More Sudoku Tools</h2>
          <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MORE_SUDOKU_TOOLS.map(({ href, title: toolTitle, description: toolDescription, icon: Icon, iconClass }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4 no-underline shadow-sm transition-colors hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:hover:bg-stone-800">
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full ${iconClass}`}>
                  <Icon weight="duotone" size={22} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-stone-900 dark:text-stone-50">
                    {toolTitle}
                  </span>
                  <span className="mt-0.5 block text-sm text-stone-500 dark:text-stone-400">
                    {toolDescription}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-stone-400" aria-hidden />
              </Link>
            ))}
          </div>

          <h3 className="font-heading text-2xl font-bold dark:text-stone-50">
            Practice on New Puzzles
          </h3>
          <p>
            After checking your answer, practice with playable boards on our{' '}
            <Link href="/">classic Sudoku page</Link> or try a variant on{' '}
            <Link href="/killer-sudoku">Killer Sudoku</Link>.
          </p>
        </Container>
      </section>

      <SudokuSolverFaqSection />
    </>
  );
}
