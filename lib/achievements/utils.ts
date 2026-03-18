import { ACHIEVEMENTS } from '@/lib/achievements/definitions';
import { grantEarnedHints } from '@/lib/storage/hint-storage';
import { getUnlockableThemeIds, getUnlockedThemeIds, unlockTheme } from '@/lib/storage/theme-storage';
import {
  getUnlockedAchievementIds,
  unlockAchievement,
  updateStats,
} from '@/lib/storage/stats-storage';

const ACHIEVEMENTS_THAT_GRANT_HINTS = ['no-hints', 'perfect-easy', 'perfect-any'];

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
}): { achievementIds: string[]; themeIds: string[] } {
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
      if (ACHIEVEMENTS_THAT_GRANT_HINTS.includes(achievement.id)) {
        grantEarnedHints(1);
      }
    }
  }

  // Theme unlocks: derived from achievements + level (based on stats)
  const unlockableThemeIds = getUnlockableThemeIds({
    stats,
    unlockedAchievementIds: [...getUnlockedAchievementIds(), ...newlyUnlocked],
  });
  const alreadyUnlocked = new Set(getUnlockedThemeIds());
  const newlyUnlockedThemes: string[] = [];
  for (const id of unlockableThemeIds) {
    if (alreadyUnlocked.has(id)) continue;
    unlockTheme(id);
    newlyUnlockedThemes.push(id);
  }

  return { achievementIds: newlyUnlocked, themeIds: newlyUnlockedThemes };
}

export function getAchievementById(id: string) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
