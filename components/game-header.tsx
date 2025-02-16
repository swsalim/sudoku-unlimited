import Link from 'next/link';

import { Difficulty } from '@/types';
import { Pause, Play } from 'lucide-react';

import { cn } from '@/lib/utils';

import { absoluteUrl } from '@/utils/helpers';

import { Button } from '@/components/ui/button';

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
  const validDifficulties = Object.values(Difficulty).map((d) => d.toLowerCase());

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-start gap-4">
        <span className="text-sm text-muted-foreground">
          Difficulty:
          <div className="mt-2 flex">
            {validDifficulties.map((d) => (
              <Button key={d} variant="ghost" asChild>
                <Link
                  href={absoluteUrl(`/${d}`)}
                  className={cn(d === difficulty.toLowerCase() && 'font-bold', 'capitalize')}>
                  {d}
                </Link>
              </Button>
            ))}
          </div>
        </span>
        <span className="text-sm text-muted-foreground">
          Mistakes: {mistakes}/{maxMistakes}
        </span>
        <span className="text-sm text-muted-foreground">Score: {score}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm">{time}</span>
        <Button variant="ghost" size="icon" onClick={onPauseToggle}>
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
