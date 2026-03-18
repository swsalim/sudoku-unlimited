import { ACHIEVEMENTS } from '@/lib/achievements/definitions';
import {
  getUnlockedAchievementIds,
  unlockAchievement,
  updateStats,
} from '@/lib/storage/stats-storage';

/**
 * Records a completed game, updates stats, and returns newly unlocked achievement IDs.
 * Call this when the player wins (victory, not game over).
 */
export function recordGameAndCheckAchievements(params: {
  difficulty: string;
  timeSeconds: number;
  mistakes: number;
  hintsUsed: number;
  usedNotes: boolean;
}): string[] {
  const stats = updateStats({
    difficulty: params.difficulty,
    timeSeconds: params.timeSeconds,
    mistakes: params.mistakes,
    hintsUsed: params.hintsUsed,
    usedNotes: params.usedNotes,
  });

  const unlockedIds = getUnlockedAchievementIds();
  const newlyUnlocked: string[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (unlockedIds.includes(achievement.id)) continue;
    if (achievement.check(stats)) {
      unlockAchievement(achievement.id);
      newlyUnlocked.push(achievement.id);
    }
  }

  return newlyUnlocked;
}

export function getAchievementById(id: string) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
