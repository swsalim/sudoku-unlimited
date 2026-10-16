export const OPEN_ACHIEVEMENTS_EVENT = 'sudoku:open-achievements';

export function openAchievementsDialog() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_ACHIEVEMENTS_EVENT));
}
