'use client';

import { BarChart2, Flame, Trophy } from 'lucide-react';

import { getStats } from '@/lib/storage/stats-storage';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface StatisticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DIFFICULTIES = ['easy', 'medium', 'hard', 'expert', 'master', 'extreme'] as const;

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export function StatisticsDialog({ open, onOpenChange }: StatisticsDialogProps) {
  const stats = typeof window !== 'undefined' ? getStats() : null;
  if (!stats) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-h-[85vh] overflow-hidden flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5" />
            Statistics
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="-mx-2 flex-1 overflow-y-auto px-2 space-y-6">
          {/* Streaks */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Flame className="h-4 w-4 text-orange-500" />
              Streaks
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-green-700/30 bg-green-50/50 p-4 dark:border-green-600/30 dark:bg-green-950/30">
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {stats.currentStreak}
                </p>
                <p className="text-sm text-muted-foreground">Current streak (days)</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-700 dark:bg-gray-900/30">
                <p className="text-2xl font-bold">{stats.longestStreak}</p>
                <p className="text-sm text-muted-foreground">Longest streak</p>
              </div>
            </div>
          </section>

          {/* Overview */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Trophy className="h-4 w-4" />
              Overview
            </h3>
            <div className="space-y-2">
              <StatRow
                label="Puzzles completed"
                value={stats.totalPuzzlesCompleted.toString()}
              />
              <StatRow
                label="Perfect solves"
                value={`${stats.perfectSolves} (0 mistakes)`}
              />
              <StatRow label="Hints used" value={stats.totalHintsUsed.toString()} />
            </div>
          </section>

          {/* By difficulty */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
              By difficulty
            </h3>
            <div className="space-y-2">
              {DIFFICULTIES.map((diff) => {
                const count = stats.puzzlesByDifficulty[diff] ?? 0;
                const bestTime = stats.bestTimeByDifficulty[diff];
                const timeSum = stats.timeSumByDifficulty[diff] ?? 0;
                const avgTime = count > 0 ? Math.round(timeSum / count) : null;
                if (count === 0 && !bestTime) return null;
                return (
                  <div
                    key={diff}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3">
                    <span className="font-medium capitalize">{diff}</span>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{count} completed</span>
                      {bestTime != null && (
                        <span>Best: {formatTime(bestTime)}</span>
                      )}
                      {avgTime != null && (
                        <span>Avg: {formatTime(avgTime)}</span>
                      )}
                    </div>
                  </div>
                );
              })}
              {DIFFICULTIES.every((d) => (stats.puzzlesByDifficulty[d] ?? 0) === 0) && (
                <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                  No puzzles completed yet. Start playing to see your stats!
                </p>
              )}
            </div>
          </section>
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

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between rounded-lg border px-3 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
