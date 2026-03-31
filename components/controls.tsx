import { Eraser, HelpCircle, Pencil, RotateCcw } from 'lucide-react';

import { selineTrack } from '@/lib/analytics';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ControlsProps {
  onUndo: () => void;
  onErase: () => void;
  onToggleNotes: () => void;
  onHint: () => void;
  isNotesMode: boolean;
  onNumberClick: (num: number) => void;
  onNewGame: () => void;
  onReset: () => void;
  hintsAvailable?: number;
  hintRefreshMessage?: string;
}

export function Controls({
  onUndo,
  onErase,
  onToggleNotes,
  onHint,
  isNotesMode,
  onNumberClick,
  onNewGame,
  onReset,
  hintsAvailable = Infinity,
  hintRefreshMessage = '',
}: ControlsProps) {
  const hasHints = hintsAvailable > 0;
  const hintTooltip = hasHints
    ? 'Show possible numbers for the selected cell'
    : hintRefreshMessage || 'No hints left. Complete puzzles to earn more.';

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-grow flex-col gap-4">
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  selineTrack('controls_undo_click');
                  onUndo();
                }}
                className="h-12 w-full border-[color:var(--app-surface-border)] bg-[color:var(--app-surface-bg)] hover:bg-[color:var(--app-muted-bg)] md:h-14">
                <RotateCcw className="md:!size-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo last move</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  selineTrack('controls_erase_click');
                  onErase();
                }}
                className="h-12 w-full border-[color:var(--app-surface-border)] bg-[color:var(--app-surface-bg)] hover:bg-[color:var(--app-muted-bg)] md:h-14">
                <Eraser className="md:!size-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear selected cell</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  selineTrack('controls_toggle_notes_click', { isNotesMode: !isNotesMode });
                  onToggleNotes();
                }}
                data-state={isNotesMode ? 'on' : 'off'}
                className={cn(
                  'relative h-12 w-full border-[color:var(--app-surface-border)] bg-[color:var(--app-surface-bg)] hover:bg-[color:var(--app-muted-bg)] md:h-14',
                  isNotesMode &&
                    'border-[color:var(--app-accent)] bg-[color:var(--app-muted-bg)] text-[color:var(--app-accent-strong)]',
                )}>
                <Pencil className="md:!size-6" />
                <span
                  className={cn(
                    'absolute -bottom-1 -right-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                    isNotesMode
                      ? 'bg-[color:var(--app-accent)] text-white'
                      : 'bg-[color:var(--app-muted-bg)] text-stone-600 dark:text-stone-400',
                  )}>
                  {isNotesMode ? 'ON' : 'OFF'}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isNotesMode
                ? 'Notes mode on — tap a number to add/remove it'
                : 'Notes mode off — track possibilities with small numbers'}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <span className="w-full">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (!hasHints) return;
                    selineTrack('controls_hint_click');
                    onHint();
                  }}
                  disabled={!hasHints}
                  className={cn(
                    'relative h-12 w-full border-[color:var(--app-surface-border)] bg-[color:var(--app-surface-bg)] hover:bg-[color:var(--app-muted-bg)] md:h-14',
                    !hasHints && 'cursor-not-allowed opacity-60',
                  )}>
                  <HelpCircle className="md:!size-6" />
                  {hintsAvailable < Infinity && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-700 px-1 text-[10px] font-bold text-white">
                      {hintsAvailable}
                    </span>
                  )}
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>{hintTooltip}</TooltipContent>
          </Tooltip>
        </div>
        {!hasHints && hintRefreshMessage && (
          <p className="text-center text-xs text-stone-500">{hintRefreshMessage}</p>
        )}

        <div className="flex flex-row flex-wrap gap-1 md:grid md:grid-cols-3 md:gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="h-11 w-11 border-[color:var(--app-surface-border)] bg-[color:var(--app-surface-bg)] text-xl font-semibold hover:bg-[color:var(--app-muted-bg)] md:h-16 md:w-full md:text-2xl"
              onClick={() => {
                selineTrack('controls_number_click', { value: num });
                onNumberClick(num);
              }}>
              {num}
            </Button>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            className="flex-1 bg-[color:var(--app-accent)] font-semibold text-white hover:opacity-95"
            onClick={() => {
              selineTrack('controls_new_game_click');
              onNewGame();
            }}>
            New Game
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 border-[color:var(--app-surface-border)] bg-[color:var(--app-surface-bg)] font-semibold hover:bg-[color:var(--app-muted-bg)]"
                onClick={() => {
                  selineTrack('controls_reset_click');
                  onReset();
                }}>
                Reset
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Reset current puzzle — clear all entries and start over with the same grid
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
