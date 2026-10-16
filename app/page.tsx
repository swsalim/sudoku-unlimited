import Image from 'next/image';
import Link from 'next/link';

import { Difficulty } from '@/types';
import {
  Brain,
  Calculator,
  CalendarCheck,
  ChartBar,
  DeviceMobile,
  Leaf,
  Lightning,
  Palette,
  Printer,
  Trophy,
  X,
} from '@phosphor-icons/react/ssr';

import { Container } from '@/components/container';
import { HomeFaqSection } from '@/components/home-faq-section';
import { HomeSchemaScript } from '@/components/schemas';
import { SudokuGame } from '@/components/sudoku-game';
import { Button, buttonVariants } from '@/components/ui/button';

const CLASSIC_LEVELS = [
  {
    href: '/easy',
    label: 'Easy',
    description: 'Beginner friendly, with more given numbers.',
    cardClass: 'bg-emerald-100/80 dark:bg-emerald-950/40',
    activeClass: 'border-emerald-300 border dark:border-emerald-800',
    textClass: 'text-emerald-700 dark:text-emerald-300',
    hoverClass: 'hover:bg-emerald-200/30 dark:hover:bg-emerald-900/50',
    icon: ChartBar,
  },
  {
    href: '/medium',
    label: 'Medium',
    description: 'A bit more challenging.',
    cardClass: 'bg-sky-100/80 dark:bg-sky-950/40',
    activeClass: 'border-sky-300 border dark:border-sky-800',
    textClass: 'text-sky-700 dark:text-sky-300',
    hoverClass: 'hover:bg-sky-200/30 dark:hover:bg-sky-900/50',
    icon: ChartBar,
  },
  {
    href: '/hard',
    label: 'Hard',
    description: 'Fewer givens. Test your scanning.',
    cardClass: 'bg-orange-100/80 dark:bg-orange-950/40',
    activeClass: 'border-orange-300 border dark:border-orange-800',
    textClass: 'text-orange-600 dark:text-orange-300',
    hoverClass: 'hover:bg-orange-200/30 dark:hover:bg-orange-900/50',
    icon: ChartBar,
  },
  {
    href: '/expert',
    label: 'Expert',
    description: 'For players who already keep notes.',
    cardClass: 'bg-rose-100/80 dark:bg-rose-950/40',
    activeClass: 'border-rose-300 border dark:border-rose-800',
    textClass: 'text-rose-600 dark:text-rose-300',
    hoverClass: 'hover:bg-rose-200/30 dark:hover:bg-rose-900/50',
    icon: ChartBar,
  },
  {
    href: '/master',
    label: 'Master',
    description: 'A serious challenge.',
    cardClass: 'bg-pink-100/80 dark:bg-pink-950/40',
    activeClass: 'border-pink-300 border dark:border-pink-800',
    textClass: 'text-pink-700 dark:text-pink-300',
    hoverClass: 'hover:bg-pink-200/30 dark:hover:bg-pink-900/50',
    icon: X,
  },
  {
    href: '/extreme',
    label: 'Extreme',
    description: 'Only for the brave.',
    cardClass: 'bg-violet-100/80 dark:bg-violet-950/40',
    activeClass: 'border-violet-300 border dark:border-violet-800',
    textClass: 'text-violet-700 dark:text-violet-300',
    hoverClass: 'hover:bg-violet-200/30 dark:hover:bg-violet-900/50',
    icon: ChartBar,
  },
] as const;

const FEATURES = [
  {
    title: 'Multiple Difficulties',
    description: 'From Easy to Extreme',
    icon: Lightning,
    iconClass: 'bg-orange-100 text-orange-500 dark:bg-orange-500/15 dark:text-orange-300',
  },
  {
    title: 'Track Your Progress',
    description: 'Detailed stats and streaks',
    icon: ChartBar,
    iconClass: 'bg-blue-100 text-blue-500 dark:bg-blue-500/15 dark:text-blue-300',
  },
  {
    title: 'Achievements',
    description: 'Unlock badges as you play',
    icon: Trophy,
    iconClass: 'bg-amber-100 text-amber-500 dark:bg-amber-500/15 dark:text-amber-300',
  },
  {
    title: 'Beautiful Themes',
    description: 'Choose light, dark and color themes',
    icon: Palette,
    iconClass: 'bg-violet-100 text-violet-500 dark:bg-violet-500/15 dark:text-violet-300',
  },
  {
    title: 'Zen Mode',
    description: 'A clean, distraction-free experience',
    icon: Leaf,
    iconClass: 'bg-emerald-100 text-emerald-500 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
  {
    title: 'Play Anywhere',
    description: 'Works on desktop, tablet and mobile',
    icon: DeviceMobile,
    iconClass: 'bg-teal-100 text-teal-500 dark:bg-teal-500/15 dark:text-teal-300',
  },
] as const;

const MORE_LINKS = [
  {
    href: '/daily',
    title: 'Daily Challenge',
    description: 'A new Sudoku puzzle every day for everyone.',
    cta: 'Play Today',
    icon: CalendarCheck,
    iconClass: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
    ctaClass: 'text-emerald-700 dark:text-emerald-300',
  },
  {
    href: '/sudoku-solver',
    title: 'Sudoku Solver',
    description: 'Enter a grid and get the solution, or walk through it step by step.',
    cta: 'Open the Solver',
    icon: Calculator,
    iconClass: 'bg-orange-100 text-orange-500 dark:bg-orange-500/15 dark:text-orange-300',
    ctaClass: 'text-orange-600 dark:text-orange-300',
  },
  {
    href: '/printable',
    title: 'Printable Sudoku',
    description: 'Download and print puzzles for home, school or on the go.',
    cta: 'Browse Printable',
    icon: Printer,
    iconClass: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300',
    ctaClass: 'text-blue-700 dark:text-blue-300',
  },
  {
    href: '/guides',
    title: 'Tips & Strategies',
    description: 'Learn techniques to solve puzzles faster.',
    cta: 'Read the Guide',
    icon: Brain,
    iconClass: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
    ctaClass: 'text-violet-700 dark:text-violet-300',
  },
] as const;

export default function HomePage() {
  return (
    <>
      <HomeSchemaScript />
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
              Play Free Sudoku Online
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400">
              Choose a difficulty and start playing in your browser. Enjoy unlimited Sudoku puzzles,
              track your progress, try different themes, and challenge yourself every day.
            </p>
          </div>
          <SudokuGame initialDifficulty={Difficulty.EASY} />
        </Container>
      </section>

      <section
        aria-labelledby="home-features-heading"
        className="border-y border-stone-200/80 bg-white/60 dark:border-stone-800 dark:bg-stone-900/40">
        <h2 id="home-features-heading" className="sr-only">
          Features
        </h2>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-10 sm:grid-cols-3 lg:grid-cols-6">
          {FEATURES.map(({ title, description, icon: Icon, iconClass }) => (
            <div key={title} className="flex flex-col items-center px-2 text-center">
              <span
                className={`mb-3 inline-flex size-14 items-center justify-center rounded-full ${iconClass}`}>
                <Icon weight="duotone" size={28} aria-hidden />
              </span>
              <p className="text-sm font-bold text-stone-900 dark:text-stone-50">{title}</p>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="choose-challenge-heading" className="py-14">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            Sudoku puzzles for everyone
          </p>
          <h2
            id="choose-challenge-heading"
            className="mt-2 font-heading text-4xl font-black text-stone-900 dark:text-stone-50">
            Choose Your Challenge
          </h2>
          <p className="mt-3 max-w-2xl text-base text-stone-600 dark:text-stone-400">
            Play unlimited Sudoku puzzles at different difficulty levels. Whether you&rsquo;re a
            beginner or an expert, there&rsquo;s a puzzle for you.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CLASSIC_LEVELS.map(
              ({ href, label, description, cardClass, textClass, hoverClass, icon: Icon }) => (
                <div
                  key={href}
                  className={`flex h-full flex-col rounded-2xl px-3 py-4 ${cardClass}`}>
                  <div className={`flex items-center gap-2 font-heading font-bold ${textClass}`}>
                    <Icon weight="duotone" size={18} aria-hidden />
                    {label}
                  </div>
                  <p className="mt-2 flex-1 text-sm text-stone-500 dark:text-stone-400">
                    {description}
                  </p>
                  <Link
                    href={href}
                    className={`mt-4 inline-flex w-fit rounded-md px-2.5 py-1 text-sm font-semibold transition-colors ${textClass} ${hoverClass}`}>
                    Play {label} →
                  </Link>
                </div>
              ),
            )}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col rounded-3xl bg-orange-50 px-8 py-8 dark:bg-orange-950/40">
              <h3 className="font-heading text-2xl font-bold text-orange-700 dark:text-orange-300">
                Killer Sudoku
              </h3>
              <p className="mt-2 max-w-md text-base text-stone-600 dark:text-stone-400">
                Cage sums on top of the classic rules. Six levels, from Easy to Extreme.
              </p>
              <Link
                href="/killer-sudoku"
                className="mt-6 w-fit rounded-full bg-white px-5 py-2 text-sm font-semibold text-orange-700 shadow-sm transition-colors hover:bg-orange-100 dark:bg-stone-900 dark:text-orange-300 dark:hover:bg-orange-900/50">
                Play Killer Sudoku
              </Link>
            </div>
            <div className="flex flex-col rounded-3xl bg-sky-50 px-8 py-8 dark:bg-sky-950/40">
              <h3 className="font-heading text-2xl font-bold text-sky-700 dark:text-sky-300">
                Kids Sudoku
              </h3>
              <p className="mt-2 max-w-md text-base text-stone-600 dark:text-stone-400">
                A smaller first grid. Play 4×4 and 6×6 puzzles in the browser.
              </p>
              <Link
                href="/kids-sudoku"
                className="mt-6 w-fit rounded-full bg-white px-5 py-2 text-sm font-semibold text-sky-700 shadow-sm transition-colors hover:bg-sky-100 dark:bg-stone-900 dark:text-sky-300 dark:hover:bg-sky-900/50">
                Play Kids Sudoku
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <Container className="mx-auto flex max-w-6xl flex-col items-center gap-20 px-6 text-center md:flex-row md:items-start md:justify-between">
          <div className="prose prose-stone w-full max-w-none text-start dark:prose-invert dark:bg-stone-900/50 md:w-3/5">
            <h2 className="font-heading text-2xl font-bold dark:text-stone-50">
              How to Play Sudoku
            </h2>

            <p>
              Sudoku is a popular number puzzle that challenges your logical thinking. The game
              consists of a <strong>9x9 grid</strong> divided into nine smaller{' '}
              <strong>3x3 boxes</strong>. The goal is simple: fill the grid so that every row,
              column, and 3x3 box contains the numbers <strong>1 to 9</strong> without repeating any
              number.
            </p>

            <Button asChild className={buttonVariants({ variant: 'default' })}>
              <Link href="/guides/the-complete-guide-to-how-sudoku-works">Read the full guide</Link>
            </Button>
          </div>

          <div className="w-full md:w-2/5">
            <Image
              src="/images/how-to-play.webp"
              alt="How to play Sudoku"
              width={700}
              height={700}
              unoptimized
              className="w-full"
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="more-ways-heading" className="py-14">
        <h2 id="more-ways-heading" className="sr-only">
          More ways to play
        </h2>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {MORE_LINKS.map(({ href, title, description, cta, icon: Icon, iconClass, ctaClass }) => (
            <Link
              key={href}
              href={href}
              className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <span
                className={`inline-flex size-11 items-center justify-center rounded-full ${iconClass}`}>
                <Icon weight="duotone" size={22} aria-hidden />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-stone-900 dark:text-stone-50">
                {title}
              </h3>
              <p className="mt-1 flex-1 text-sm text-stone-500 dark:text-stone-400">
                {description}
              </p>
              <span className={`mt-5 text-sm font-semibold ${ctaClass}`}>{cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      <HomeFaqSection />
      {/*
      <AlertDialog open={showGameOver}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Game Over</AlertDialogTitle>
            <AlertDialogDescription>
              You&rsquo;ve reached the maximum number of mistakes. Would you like to start a new
              game?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => startNewGame(gameState.difficulty as Difficulty)}>
              New Game
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </>
  );
}
