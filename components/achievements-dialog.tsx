'use client';

import { Trophy } from 'lucide-react';

import { ACHIEVEMENTS } from '@/lib/achievements/definitions';
import { getUnlockedAchievementIds } from '@/lib/storage/stats-storage';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AchievementsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AchievementsDialog({ open, onOpenChange }: AchievementsDialogProps) {
  const unlockedIds = typeof window !== 'undefined' ? getUnlockedAchievementIds() : [];

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-h-[80vh] overflow-hidden flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Achievements
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="-mx-2 flex-1 overflow-y-auto px-2">
          <div className="grid gap-2">
            {ACHIEVEMENTS.map((a) => {
              const isUnlocked = unlockedIds.includes(a.id);
              return (
                <div
                  key={a.id}
                  className={`flex items-center gap-3 rounded-lg border p-3 ${
                    isUnlocked
                      ? 'border-green-700/30 bg-green-50/50 dark:border-green-600/30 dark:bg-green-950/30'
                      : 'border-gray-200 bg-gray-50/50 opacity-60 dark:border-gray-700 dark:bg-gray-900/30'
                  }`}>
                  <span
                    className={`text-2xl ${!isUnlocked ? 'grayscale opacity-70' : ''}`}>
                    {a.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium ${
                        isUnlocked
                          ? 'text-gray-900 dark:text-gray-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                      {a.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{a.description}</p>
                  </div>
                  {isUnlocked && (
                    <span className="shrink-0 text-xs font-medium text-green-600 dark:text-green-400">
                      ✓ Unlocked
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
