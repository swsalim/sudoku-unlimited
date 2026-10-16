import Image from 'next/image';
import Link from 'next/link';

import {
  BookOpen,
  Brain,
  Calculator,
  CalendarCheck,
  ChartBar,
  Printer,
  X,
} from '@phosphor-icons/react/ssr';

import { cn } from '@/lib/utils';

import { OpenAchievementsButton } from '@/components/open-achievements-button';

const LEVELS = [
  {
    slug: 'easy',
    label: 'Easy',
    description: 'Beginner friendly, with more given numbers.',
    cardClass: 'bg-emerald-100/80 dark:bg-emerald-950/40',
    activeClass: 'border-emerald-300 border dark:border-emerald-800',
    textClass: 'text-emerald-700 dark:text-emerald-300',
    hoverClass: 'hover:bg-emerald-200/30 dark:hover:bg-emerald-900/50',
    icon: ChartBar,
  },
  {
    slug: 'medium',
    label: 'Medium',
    description: 'A bit more challenging.',
    cardClass: 'bg-sky-100/80 dark:bg-sky-950/40',
    activeClass: 'border-sky-300 border dark:border-sky-800',
    textClass: 'text-sky-700 dark:text-sky-300',
    hoverClass: 'hover:bg-sky-200/30 dark:hover:bg-sky-900/50',
    icon: ChartBar,
  },
  {
    slug: 'hard',
    label: 'Hard',
    description: 'Fewer givens. Test your scanning.',
    cardClass: 'bg-orange-100/80 dark:bg-orange-950/40',
    activeClass: 'border-orange-300 border dark:border-orange-800',
    textClass: 'text-orange-600 dark:text-orange-300',
    hoverClass: 'hover:bg-orange-200/30 dark:hover:bg-orange-900/50',
    icon: ChartBar,
  },
  {
    slug: 'expert',
    label: 'Expert',
    description: 'For players who already keep notes.',
    cardClass: 'bg-rose-100/80 dark:bg-rose-950/40',
    activeClass: 'border-rose-300 border dark:border-rose-800',
    textClass: 'text-rose-600 dark:text-rose-300',
    hoverClass: 'hover:bg-rose-200/30 dark:hover:bg-rose-900/50',
    icon: ChartBar,
  },
  {
    slug: 'master',
    label: 'Master',
    description: 'A serious challenge.',
    cardClass: 'bg-pink-100/80 dark:bg-pink-950/40',
    activeClass: 'border-pink-300 border dark:border-pink-800',
    textClass: 'text-pink-700 dark:text-pink-300',
    hoverClass: 'hover:bg-pink-200/30 dark:hover:bg-pink-900/50',
    icon: X,
  },
  {
    slug: 'extreme',
    label: 'Extreme',
    description: 'Only for the brave.',
    cardClass: 'bg-violet-100/80 dark:bg-violet-950/40',
    activeClass: 'border-violet-300 border dark:border-violet-800',
    textClass: 'text-violet-700 dark:text-violet-300',
    hoverClass: 'hover:bg-violet-200/30 dark:hover:bg-violet-900/50',
    icon: ChartBar,
  },
] as const;

export function DifficultyLevelCards({
  current,
  hrefFor = (slug) => `/${slug}`,
  action = 'Play',
  slugs,
  className,
}: {
  current?: string;
  hrefFor?: (slug: string) => string;
  action?: string;
  slugs?: readonly string[];
  className?: string;
}) {
  const levels = slugs ? LEVELS.filter((level) => slugs.includes(level.slug)) : LEVELS;

  return (
    <div
      className={cn(
        'not-prose grid grid-cols-2 gap-3 sm:grid-cols-3',
        levels.length > 4 ? 'lg:grid-cols-6' : 'lg:grid-cols-4',
        className,
      )}>
      {levels.map(
        ({
          slug,
          label,
          description,
          cardClass,
          textClass,
          hoverClass,
          activeClass,
          icon: Icon,
        }) => {
          const isCurrent = slug === current;
          return (
            <div
              key={slug}
              className={cn(
                'flex h-full flex-col rounded-2xl px-3 py-4',
                cardClass,
                isCurrent && activeClass,
              )}>
              <div className={`flex items-center gap-2 font-heading font-bold ${textClass}`}>
                <Icon weight="duotone" size={18} aria-hidden />
                {label}
              </div>
              <p className="mt-2 flex-1 text-sm text-stone-500 dark:text-stone-400">
                {description}
              </p>
              <Link
                href={hrefFor(slug)}
                className={`mt-4 inline-flex w-fit rounded-md px-2.5 py-1 text-sm font-semibold transition-colors ${textClass} ${hoverClass}`}>
                {action} {label} →
              </Link>
            </div>
          );
        },
      )}
    </div>
  );
}

const HOW_TO: Record<string, { intro: string; steps: string[]; guideHref: string }> = {
  easy: {
    intro:
      'Easy Sudoku uses the same rules as every other level: each row, column, and 3×3 box holds the digits 1–9 once. You start with more numbers, so the next placement is usually in plain sight.',
    steps: [
      'Scan the given numbers in one row, column, or box.',
      'Place a digit when only one cell can take it.',
      'Check that 1–9 appears once in that row, column, and box.',
      'Add notes only when a cell still has more than one candidate.',
      'Finish the grid. When easy feels quick, step up to medium.',
    ],
    guideHref: '/guides/the-complete-guide-to-how-sudoku-works',
  },
  medium: {
    intro:
      'Medium Sudoku follows the same rules, with fewer givens than easy. Scanning still helps, then pairs and hidden singles finish the grid in one sitting.',
    steps: [
      'Clear the obvious singles first, the same way you do on easy.',
      'When two cells in a unit share only the same two digits, those digits cannot go elsewhere in that unit.',
      'Find a hidden single: a digit that fits only one cell in a row, column, or box.',
      'Update your notes after every placement.',
      'If you stall, follow one number across the board before you guess.',
    ],
    guideHref: '/guides/5-ways-to-approach-number-puzzles-like-sudoku',
  },
  hard: {
    intro:
      'Hard Sudoku leaves fewer givens, so the obvious cells run out early. Hidden singles and naked pairs do most of the work.',
    steps: [
      'Place the last easy singles before you mark the rest of the grid.',
      'Write candidates in the open cells of one box.',
      'Clear a naked pair: two cells that allow only the same two digits.',
      'Hunt a hidden single inside a row, column, or box.',
      'Do not guess. Recheck one digit you have not placed yet.',
    ],
    guideHref: '/guides/solve-sudoku-without-guessing',
  },
  expert: {
    intro:
      'Expert Sudoku asks you to keep candidates and spot patterns that never show up on easy grids, including X-wings and swordfish.',
    steps: [
      'Keep notes current. A stale candidate hides the pattern.',
      'Clear singles and pairs before you look for anything larger.',
      'Find an X-wing: the same digit locked to two rows and two columns.',
      'Use a swordfish when that digit is locked across three rows and three columns.',
      'Place only what the pattern proves, then erase the notes it removes.',
    ],
    guideHref: '/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use',
  },
  master: {
    intro:
      'Master Sudoku strips the grid down. You chain several techniques before a digit is safe to place.',
    steps: [
      'Build a full candidate grid before you commit to a number.',
      'Clear singles, pairs, and pointing pairs first.',
      'Follow one digit across the rows until a pattern removes candidates.',
      'Place a number only when every other cell in its unit is ruled out.',
      'Expect a longer solve. The result is a grid you earned.',
    ],
    guideHref: '/guides/9-advanced-sudoku-techniques-that-experienced-solvers-use',
  },
  extreme: {
    intro:
      'Extreme Sudoku is the sparsest classic grid we generate. Advanced techniques are required from the start, and progress comes one deduction at a time.',
    steps: [
      'Expect a slow start. The first placement can take several passes.',
      'Keep every candidate honest. One wrong note wastes the rest of the solve.',
      'Stack techniques: singles, then pairs, then fish patterns.',
      'When the board looks stuck, switch digits instead of guessing.',
      'Place only what logic proves. That is the whole puzzle.',
    ],
    guideHref: '/guides/swordfish',
  },
};

const TOOLS = [
  {
    href: '/daily',
    title: 'Daily Challenge',
    description: 'A new puzzle every day for everyone.',
    cta: 'Play Today',
    icon: CalendarCheck,
    iconClass: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
    ctaClass: 'text-emerald-700 dark:text-emerald-300',
  },
  {
    href: '/printable',
    title: 'Printable Sudoku',
    description: 'Download and print puzzles for offline play.',
    cta: 'Browse Printable',
    icon: Printer,
    iconClass: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
    ctaClass: 'text-violet-700 dark:text-violet-300',
  },
  {
    href: '/sudoku-solver',
    title: 'Sudoku Solver',
    description: 'Enter a puzzle and get the solution instantly.',
    cta: 'Try the Solver',
    icon: Calculator,
    iconClass: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300',
    ctaClass: 'text-rose-700 dark:text-rose-300',
  },
  {
    href: '/guides',
    title: 'Guides & Tips',
    description: 'Learn strategies and improve your skills.',
    cta: 'Read the Guides',
    icon: Brain,
    iconClass: 'bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300',
    ctaClass: 'text-sky-700 dark:text-sky-300',
  },
] as const;

export function DifficultyPageSections({ difficulty }: { difficulty: string }) {
  const howTo = HOW_TO[difficulty] ?? HOW_TO.easy;
  const label = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  return (
    <>
      <section aria-labelledby="more-levels-heading" className="py-14">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="more-levels-heading"
            className="font-heading text-3xl font-black text-stone-900 dark:text-stone-50">
            More Difficulty Levels
          </h2>
          <p className="mt-2 max-w-2xl text-stone-600 dark:text-stone-400">
            Try a harder challenge as you improve, or drop to an easier puzzle if you are just
            getting started.
          </p>
          <DifficultyLevelCards current={difficulty} className="mt-8" />
        </div>
      </section>

      <section aria-labelledby="how-to-play-level-heading" className="py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div>
            <h2
              id="how-to-play-level-heading"
              className="font-heading text-3xl font-black text-stone-900 dark:text-stone-50">
              How to Play {label} Sudoku
            </h2>
            <p className="mt-3 text-stone-600 dark:text-stone-400">{howTo.intro}</p>
            <ol className="mt-6 space-y-3">
              {howTo.steps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-stone-700 dark:text-stone-300">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <Link
              href={howTo.guideHref}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-stone-900 dark:text-emerald-300">
              <BookOpen weight="duotone" size={18} aria-hidden />
              Read the Full Guide →
            </Link>
          </div>
          <Image
            src="/images/play-sudoku.webp"
            alt="Illustrated Sudoku grid with a pencil"
            width={700}
            height={700}
            unoptimized
            className="w-full"
          />
        </div>
      </section>

      <section aria-labelledby="track-progress-heading" className="py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-violet-50 px-6 py-8 dark:bg-violet-950/30 sm:flex-row sm:px-10">
            <Image
              src="/images/achievement.webp"
              alt="Trophy for Sudoku achievements"
              width={220}
              height={180}
              unoptimized
              className="h-auto w-full shrink-0 sm:w-48"
            />
            <div>
              <h2
                id="track-progress-heading"
                className="font-heading text-2xl font-black text-stone-900 dark:text-stone-50">
                Track Your Progress
              </h2>
              <p className="mt-2 max-w-xl text-stone-600 dark:text-stone-400">
                Solve puzzles, build streaks, and unlock achievements as you play. Stay with it and
                see how you improve over time.
              </p>
              <OpenAchievementsButton />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="more-tools-heading" className="py-14">
        <div className="mx-auto max-w-6xl px-6">
          <h2
            id="more-tools-heading"
            className="font-heading text-3xl font-black text-stone-900 dark:text-stone-50">
            More Sudoku Tools
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map(({ href, title, description, cta, icon: Icon, iconClass, ctaClass }) => (
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
        </div>
      </section>
    </>
  );
}
