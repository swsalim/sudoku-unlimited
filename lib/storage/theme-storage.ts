import type { GameStats } from '@/lib/storage/stats-storage';
import {
  getPlayerLevel,
  getThemeById,
  SUDOKU_THEMES,
  type ThemeId,
  type ThemeMode,
} from '@/lib/themes/themes';

const THEME_ID_KEY = 'sudoku-theme-id';
const COLOR_MODE_KEY = 'sudoku-color-mode';
const UNLOCKED_THEMES_KEY = 'sudoku-themes-unlocked';

export type ColorModePreference = 'system' | ThemeMode;

const DEFAULT_THEME_ID: ThemeId = 'classic';
const DEFAULT_COLOR_MODE: ColorModePreference = 'system';

export function getSelectedThemeId(): ThemeId {
  if (typeof window === 'undefined') return DEFAULT_THEME_ID;
  try {
    const raw = localStorage.getItem(THEME_ID_KEY);
    if (!raw) return DEFAULT_THEME_ID;
    return (SUDOKU_THEMES.some((t) => t.id === raw) ? raw : DEFAULT_THEME_ID) as ThemeId;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

export function setSelectedThemeId(id: ThemeId): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_ID_KEY, id);
}

export function getColorModePreference(): ColorModePreference {
  if (typeof window === 'undefined') return DEFAULT_COLOR_MODE;
  try {
    const raw = localStorage.getItem(COLOR_MODE_KEY);
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
    return DEFAULT_COLOR_MODE;
  } catch {
    return DEFAULT_COLOR_MODE;
  }
}

export function setColorModePreference(pref: ColorModePreference): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COLOR_MODE_KEY, pref);
}

export function getUnlockedThemeIds(): ThemeId[] {
  if (typeof window === 'undefined') return ['classic'];
  try {
    const raw = localStorage.getItem(UNLOCKED_THEMES_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    const ids = Array.isArray(parsed) ? parsed : [];
    const valid = ids.filter((id): id is ThemeId => SUDOKU_THEMES.some((t) => t.id === id));
    if (!valid.includes('classic')) valid.unshift('classic');
    return valid;
  } catch {
    return ['classic'];
  }
}

export function unlockTheme(id: ThemeId): void {
  if (typeof window === 'undefined') return;
  const current = getUnlockedThemeIds();
  if (current.includes(id)) return;
  localStorage.setItem(UNLOCKED_THEMES_KEY, JSON.stringify([...current, id]));
}

export function getUnlockableThemeIds(params: {
  stats: GameStats;
  unlockedAchievementIds: string[];
}): ThemeId[] {
  const level = getPlayerLevel(params.stats);
  const unlockedAch = new Set(params.unlockedAchievementIds);
  const unlockable: ThemeId[] = [];

  for (const theme of SUDOKU_THEMES) {
    const rule = theme.unlock;
    if (rule.type === 'free') {
      unlockable.push(theme.id);
      continue;
    }
    if (rule.type === 'level') {
      if (level >= rule.level) unlockable.push(theme.id);
      continue;
    }
    if (rule.type === 'achievement') {
      if (unlockedAch.has(rule.achievementId)) unlockable.push(theme.id);
    }
  }
  return unlockable;
}

export function applyThemeToDocument(options?: {
  themeId?: ThemeId;
  colorModePreference?: ColorModePreference;
}): void {
  if (typeof window === 'undefined') return;

  const themeId = options?.themeId ?? getSelectedThemeId();
  const pref = options?.colorModePreference ?? getColorModePreference();
  const resolvedMode: ThemeMode =
    pref === 'system'
      ? window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
        ? 'dark'
        : 'light'
      : pref;

  const theme = getThemeById(themeId);
  const tokens = theme.tokens[resolvedMode];

  const root = document.documentElement;
  root.classList.toggle('dark', resolvedMode === 'dark');

  // Sudoku-specific tokens
  root.style.setProperty('--sudoku-board-bg', tokens.boardBg);
  root.style.setProperty('--sudoku-board-border', tokens.boardBorder);
  root.style.setProperty('--sudoku-cell-bg', tokens.cellBg);
  root.style.setProperty('--sudoku-cell-border', tokens.cellBorder);
  root.style.setProperty('--sudoku-cell-selected-bg', tokens.cellSelectedBg);
  root.style.setProperty('--sudoku-cell-highlighted-bg', tokens.cellHighlightedBg);
  root.style.setProperty('--sudoku-cell-same-number-bg', tokens.cellSameNumberBg);
  root.style.setProperty('--sudoku-cell-error-bg', tokens.cellErrorBg);
  root.style.setProperty('--sudoku-cell-error-text', tokens.cellErrorText);
  root.style.setProperty('--sudoku-cell-notes-text', tokens.cellNotesText);
  root.style.setProperty('--sudoku-cell-text', tokens.cellText);
  root.style.setProperty('--sudoku-cell-initial-text', tokens.cellInitialText);
  root.style.setProperty('--sudoku-cell-radius', tokens.cellRadius);
  root.style.setProperty('--sudoku-board-font', tokens.boardFont);

  // Optional: nudge global accent without breaking existing design system
  root.style.setProperty('--sudoku-accent', tokens.accent);

  // App-level styling (make theme feel global)
  root.style.setProperty('--app-page-bg', `${tokens.boardBg}`);
  root.style.setProperty('--app-surface-bg', tokens.cellBg);
  root.style.setProperty('--app-surface-border', tokens.boardBorder);
  root.style.setProperty('--app-muted-bg', tokens.cellHighlightedBg);
  root.style.setProperty('--app-accent', tokens.accent);
  root.style.setProperty('--app-accent-strong', tokens.accent);
}
