import { Eraser, HelpCircle, Pencil, RotateCcw } from 'lucide-react';

import { selineTrack } from '@/lib/analytics';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

interface ControlsProps {
  onUndo: () => void;
  onErase: () => void;
  onToggleNotes: () => void;
  onHint: () => void;
  isNotesMode: boolean;
  onNumberClick: (num: number) => void;
  onNewGame: () => void;
  onReset: () => void;
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
}: ControlsProps) {
  return (
    <div className="flex flex-grow flex-col gap-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            selineTrack('controls_undo_click');
            onUndo();
          }}
          className="h-12 w-full md:h-14"
          title="Undo last move">
          <RotateCcw className="md:!size-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            selineTrack('controls_erase_click');
            onErase();
          }}
          className="h-12 w-full md:h-14"
          title="Clear selected cell">
          <Eraser className="md:!size-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            selineTrack('controls_toggle_notes_click', { isNotesMode: !isNotesMode });
            onToggleNotes();
          }}
          data-state={isNotesMode ? 'on' : 'off'}
          title={
            isNotesMode
              ? 'Notes mode on – tap a number to add or remove it as a possibility'
              : 'Notes mode off – tap to switch and add small numbers to track possibilities'
          }
          className={cn(
            'relative h-12 w-full md:h-14',
            isNotesMode && 'border-emerald-400 bg-emerald-50 text-emerald-700',
          )}>
          <Pencil className="md:!size-6" />
          <span
            className={cn(
              'absolute -bottom-1 -right-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold',
              isNotesMode ? 'bg-emerald-500 text-white' : 'bg-stone-200 text-stone-600',
            )}>
            {isNotesMode ? 'ON' : 'OFF'}
          </span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            selineTrack('controls_hint_click');
            onHint();
          }}
          className="h-12 w-full md:h-14"
          title="Show possible numbers for the selected cell">
          <HelpCircle className="md:!size-6" />
        </Button>
      </div>

      <div className="flex flex-row flex-wrap gap-1 md:grid md:grid-cols-3 md:gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="outline"
            className="h-11 w-11 text-xl font-semibold md:h-16 md:w-full md:text-2xl"
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
          className="flex-1 bg-emerald-600 font-semibold text-white hover:bg-emerald-700"
          onClick={() => {
            selineTrack('controls_new_game_click');
            onNewGame();
          }}>
          New Game
        </Button>
        <Button
          variant="outline"
          className="flex-1 font-semibold"
          onClick={() => {
            selineTrack('controls_reset_click');
            onReset();
          }}
          title="Reset current puzzle — clear all entries and start over with the same grid">
          Reset
        </Button>
      </div>
    </div>
  );
}
