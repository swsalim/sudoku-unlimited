import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { BarChart2, Leaf, Paintbrush, Pause, Play, Sparkles, Trophy } from 'lucide-react';

import { selineTrack } from '@/lib/analytics';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Difficulty } from '../types';

interface GameHeaderProps {
  difficulty: string;
  mistakes: number;
  maxMistakes: number;
  score: number;
  time: string;
  isPaused: boolean;
  isZenMode?: boolean;
  isDailyMode?: boolean;
  onPauseToggle: () => void;
  onOpenAchievements?: () => void;
  onOpenStats?: () => void;
  onOpenThemes?: () => void;
  onZenModeToggle?: () => void;
  onDailyToggle?: () => void;
  routeBase?: string;
}

export function GameHeader({
  difficulty,
  mistakes,
  maxMistakes,
  score,
  time,
  isPaused,
  isZenMode = false,
  isDailyMode = false,
  onPauseToggle,
  onOpenAchievements,
  onOpenStats,
  onOpenThemes,
  onZenModeToggle,
  onDailyToggle,
  routeBase = '',
}: GameHeaderProps) {
  const router = useRouter();
  const { isMobile } = useMediaQuery();
  const validDifficulties = Object.values(Difficulty).map((d) => d.toLowerCase());

  return (
    <TooltipProvider delayDuration={150}>
      <div className="mb-5 flex flex-col flex-wrap items-center justify-between gap-3 border-b border-[color:var(--app-surface-border)] pb-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {!isMobile && (
            <div className="flex items-center gap-1 rounded-xl bg-[color:var(--app-muted-bg)] p-1">
              {validDifficulties.map((d) => (
                <Button key={d} variant="ghost" size="sm" asChild className="h-8 px-3">
                  <Link
                    href={`${routeBase}/${d}`.replace('//', '/')}
                    className={cn(
                      'text-sm font-semibold capitalize',
                      d === difficulty
                        ? 'bg-[color:var(--app-surface-bg)] text-stone-900 shadow-sm dark:text-stone-50'
                        : 'text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-300',
                    )}>
                    {d}
                  </Link>
                </Button>
              ))}
            </div>
          )}
          {isMobile && (
            <div className="flex flex-row items-center text-sm text-muted-foreground">
              <Select
                defaultValue={difficulty}
                onValueChange={(value) => {
                  selineTrack('header_difficulty_change', { from: difficulty, to: value });
                  router.push(`${routeBase}/${value}`.replace('//', '/'));
                }}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                    {validDifficulties.map((d) => (
                      <SelectItem key={d} value={d}>
                        <span className="capitalize">{d}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          {isZenMode ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center gap-1.5 rounded-full bg-[color:var(--app-muted-bg)] px-2.5 py-1 text-sm font-semibold text-[color:var(--app-accent-strong)]">
                  <Leaf className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden sm:inline">Zen mode</span>
                  <span className="sm:hidden">Zen</span>
                </span>
              </TooltipTrigger>
              <TooltipContent>Zen mode: No game over from mistakes.</TooltipContent>
            </Tooltip>
          ) : (
            <span className="rounded-lg bg-[color:var(--app-muted-bg)] px-2.5 py-3 text-sm font-semibold text-stone-600 dark:text-stone-400">
              {mistakes}/{maxMistakes} mistakes · {score} pts
            </span>
          )}
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-1">
          <span className="font-mono text-sm font-semibold tabular-nums text-stone-600 dark:text-stone-400">
            {time}
          </span>
          <span className="h-4 w-px bg-stone-200" aria-hidden />
          {onDailyToggle && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    selineTrack('header_daily_toggle', { isDailyMode: !isDailyMode });
                    onDailyToggle();
                  }}
                  className={
                    isDailyMode
                      ? 'text-emerald-600'
                      : 'text-stone-500 dark:text-stone-400 dark:hover:text-stone-300'
                  }>
                  <Sparkles className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isDailyMode
                  ? 'Daily challenge is on. You are playing today’s fixed puzzle.'
                  : 'Switch to the seeded daily challenge. Same puzzle for everyone today.'}
              </TooltipContent>
            </Tooltip>
          )}
          {onZenModeToggle && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    selineTrack('header_zen_toggle', { isZenMode: !isZenMode });
                    onZenModeToggle();
                  }}
                  className={
                    isZenMode
                      ? 'text-emerald-600'
                      : 'text-stone-500 dark:text-stone-400 dark:hover:text-stone-300'
                  }>
                  <Leaf className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isZenMode
                  ? 'Zen mode is on. No game over from mistakes.'
                  : 'Zen mode: Play without game over. Mistakes won’t end your game.'}
              </TooltipContent>
            </Tooltip>
          )}
          {onOpenStats && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    selineTrack('header_stats_click');
                    onOpenStats();
                  }}
                  className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300">
                  <BarChart2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Statistics</TooltipContent>
            </Tooltip>
          )}
          {onOpenThemes && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    selineTrack('header_themes_click');
                    onOpenThemes();
                  }}
                  className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300">
                  <Paintbrush className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Themes</TooltipContent>
            </Tooltip>
          )}
          {onOpenAchievements && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    selineTrack('header_achievements_click');
                    onOpenAchievements();
                  }}
                  className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300">
                  <Trophy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Achievements</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  selineTrack('header_pause_toggle', { isPaused: !isPaused });
                  onPauseToggle();
                }}
                className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300">
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isPaused ? 'Resume' : 'Pause'}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
