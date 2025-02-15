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
        <Button variant="outline" size="icon" onClick={onUndo} className="size-12">
          <RotateCcw className="!size-6" />
        </Button>
        <Button variant="outline" size="icon" onClick={onErase} className="size-12">
          <Eraser className="size-8" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleNotes}
          data-state={isNotesMode ? 'on' : 'off'}
          className="relative size-12">
          <Pencil className="size-8" />
          <span className="absolute -right-4 -top-4 rounded-full bg-gray-100 p-2 text-xs text-gray-700">
            {isNotesMode ? 'ON' : 'OFF'}
          </span>
        </Button>
        <Button variant="outline" size="icon" onClick={onHint} className="size-12">
          <HelpCircle className="size-8" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="outline"
            className="h-12 w-12 text-lg"
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
