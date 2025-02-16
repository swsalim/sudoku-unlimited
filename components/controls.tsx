import { Eraser, HelpCircle, Pencil, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ControlsProps {
  onUndo: () => void;
  onErase: () => void;
  onToggleNotes: () => void;
  onHint: () => void;
  isNotesMode: boolean;
  onNumberClick: (num: number) => void;
  onNewGame: () => void;
}

export function Controls({
  onUndo,
  onErase,
  onToggleNotes,
  onHint,
  isNotesMode,
  onNumberClick,
  onNewGame,
}: ControlsProps) {
  return (
    <div className="flex flex-grow flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={onUndo} className="h-14 w-full">
          <RotateCcw className="!size-6" />
        </Button>
        <Button variant="outline" size="icon" onClick={onErase} className="h-14 w-full">
          <Eraser className="!size-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleNotes}
          data-state={isNotesMode ? 'on' : 'off'}
          className="relative h-14 w-full">
          <Pencil className="!size-6" />
          <span className="absolute -right-4 -top-4 rounded-full bg-gray-100 p-2 text-xs text-gray-700">
            {isNotesMode ? 'ON' : 'OFF'}
          </span>
        </Button>
        <Button variant="outline" size="icon" onClick={onHint} className="h-14 w-full">
          <HelpCircle className="!size-6" />
        </Button>
      </div>

      <div className="flex flex-row flex-wrap gap-1 sm:grid sm:grid-cols-3 sm:gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="outline"
            className="h-9 w-9 text-xl font-medium sm:h-16 sm:w-full"
            onClick={() => onNumberClick(num)}>
            {num}
          </Button>
        ))}
      </div>

      <Button className="w-full" onClick={onNewGame}>
        New Game
      </Button>
    </div>
  );
}
