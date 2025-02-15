import { Button } from '@/components/ui/button';
import { Pause, Play } from 'lucide-react';

interface GameHeaderProps {
  difficulty: string;
  mistakes: number;
  maxMistakes: number;
  score: number;
  time: string;
  isPaused: boolean;
  onPauseToggle: () => void;
}

export function GameHeader({
  difficulty,
  mistakes,
  maxMistakes,
  score,
  time,
  isPaused,
  onPauseToggle,
}: GameHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Difficulty: {difficulty}
        </span>
        <span className="text-sm text-muted-foreground">
          Mistakes: {mistakes}/{maxMistakes}
        </span>
        <span className="text-sm text-muted-foreground">Score: {score}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono">{time}</span>
        <Button variant="ghost" size="icon" onClick={onPauseToggle}>
          {isPaused ? (
            <Play className="h-4 w-4" />
          ) : (
            <Pause className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
