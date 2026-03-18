import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { BarChart2, Leaf, Paintbrush, Pause, Play, Sparkles, Trophy } from 'lucide-react';

import { selineTrack } from '@/lib/analytics';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { absoluteUrl } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
}: GameHeaderProps) {
  const router = useRouter();
  const { isMobile } = useMediaQuery();
  const validDifficulties = Object.values(Difficulty).map((d) => d.toLowerCase());

  return (
    <TooltipProvider delayDuration={150}>
      <div className="mb-5 flex flex-col flex-wrap items-center justify-between gap-3 border-b pb-4 border-[color:var(--app-surface-border)]">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {!isMobile && (
          <div className="flex items-center gap-1 rounded-xl p-1 bg-[color:var(--app-muted-bg)]">
            {validDifficulties.map((d) => (
              <Button key={d} variant="ghost" size="sm" asChild className="h-8 px-3">
                <Link
                  href={absoluteUrl(`/${d}`)}
                  className={cn(
                    'text-xs font-semibold capitalize',
                    d === difficulty
                      ? 'bg-[color:var(--app-surface-bg)] text-stone-900 shadow-sm'
                      : 'text-stone-500 hover:text-stone-700',
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
                router.push(`/${value}`);
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
              <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold bg-[color:var(--app-muted-bg)] text-[color:var(--app-accent-strong)]">
                <Leaf className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden sm:inline">Zen mode</span>
                <span className="sm:hidden">Zen</span>
              </span>
            </TooltipTrigger>
            <TooltipContent>Zen mode: No game over from mistakes.</TooltipContent>
          </Tooltip>
        ) : (
          <span className="rounded-lg px-2.5 py-3 text-xs font-semibold text-stone-600 bg-[color:var(--app-muted-bg)]">
            {mistakes}/{maxMistakes} mistakes · {score} pts
          </span>
        )}
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-1">
        <span className="font-mono text-sm font-semibold tabular-nums text-stone-600">{time}</span>
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
                className={isDailyMode ? 'text-emerald-600' : 'text-stone-500'}>
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
                className={isZenMode ? 'text-emerald-600' : 'text-stone-500'}>
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
                className="text-stone-500 hover:text-stone-900">
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
                className="text-stone-500 hover:text-stone-900">
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
                className="text-stone-500 hover:text-stone-900">
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
              className="text-stone-500 hover:text-stone-900">
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
