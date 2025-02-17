import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Pause, Play } from 'lucide-react';

import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { absoluteUrl } from '@/lib/utils';

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

import { Difficulty } from '../types';

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
  const router = useRouter();
  const { isMobile } = useMediaQuery();
  const validDifficulties = Object.values(Difficulty).map((d) => d.toLowerCase());

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        {!isMobile && (
          <span className="flex flex-row items-center gap-2 text-sm font-medium text-muted-foreground">
            Difficulty:
            <div className="flex">
              {validDifficulties.map((d) => (
                <Button key={d} variant="ghost" asChild>
                  <Link
                    href={absoluteUrl(`/${d}`)}
                    className={cn(d === difficulty && 'font-black text-gray-900', 'capitalize')}>
                    {d}
                  </Link>
                </Button>
              ))}
            </div>
          </span>
        )}
        {isMobile && (
          <div className="flex flex-row items-center text-sm text-muted-foreground">
            <Select defaultValue={difficulty} onValueChange={(value) => router.push(`/${value}`)}>
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
        <span className="text-sm font-semibold text-muted-foreground">
          Mistakes:{' '}
          <span className="font-black text-foreground">
            {mistakes}/{maxMistakes}
          </span>
        </span>
        <span className="text-sm font-semibold text-muted-foreground">
          Score: <span className="font-black text-foreground">{score}</span>
        </span>
      </div>
      <div className="flex items-center gap-0 md:gap-2">
        <span className="font-mono text-sm">{time}</span>
        <Button variant="ghost" size="icon" onClick={onPauseToggle}>
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
