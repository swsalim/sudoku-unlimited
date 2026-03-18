import type { GameStats } from '@/lib/storage/stats-storage';

export type ThemeUnlock =
  | { type: 'free' }
  | { type: 'level'; level: number }
  | { type: 'achievement'; achievementId: string };

export type ThemeId = 'classic' | 'ocean' | 'parchment' | 'midnight' | 'neon';

export type ThemeMode = 'light' | 'dark';

export interface SudokuThemeTokens {
  boardBg: string;
  boardBorder: string;
  cellBg: string;
  cellBorder: string;
  cellSelectedBg: string;
  cellHighlightedBg: string;
  cellSameNumberBg: string;
  cellErrorBg: string;
  cellErrorText: string;
  cellNotesText: string;
  cellText: string;
  cellInitialText: string;
  cellRadius: string;
  boardFont: string;
  accent: string;
}

export interface SudokuTheme {
  id: ThemeId;
  name: string;
  description: string;
  unlock: ThemeUnlock;
  tokens: Record<ThemeMode, SudokuThemeTokens>;
}

export function getPlayerLevel(stats: GameStats): number {
  // Simple, transparent leveling: +1 level per 5 completed puzzles.
  // Level 1: 0-4, Level 2: 5-9, etc.
  return 1 + Math.floor((stats.totalPuzzlesCompleted ?? 0) / 5);
}

export const SUDOKU_THEMES: readonly SudokuTheme[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Clean, familiar, and easy on the eyes.',
    unlock: { type: 'free' },
    tokens: {
      light: {
        boardBg: '#fafaf9',
        boardBorder: '#e7e5e4',
        cellBg: '#ffffff',
        cellBorder: '#d6d3d1',
        cellSelectedBg: '#a7f3d0',
        cellHighlightedBg: '#f5f5f4',
        cellSameNumberBg: '#fffbeb',
        cellErrorBg: '#fef2f2',
        cellErrorText: '#dc2626',
        cellNotesText: '#78716c',
        cellText: '#1c1917',
        cellInitialText: '#0c0a09',
        cellRadius: '0.0rem',
        boardFont: 'var(--font-figtree)',
        accent: 'hsl(142 71% 45%)',
      },
      dark: {
        boardBg: '#0c0a09',
        boardBorder: '#292524',
        cellBg: '#0f0d0c',
        cellBorder: '#44403c',
        cellSelectedBg: '#064e3b',
        cellHighlightedBg: '#1c1917',
        cellSameNumberBg: '#3f2d0b',
        cellErrorBg: '#2b0b0b',
        cellErrorText: '#fb7185',
        cellNotesText: '#a8a29e',
        cellText: '#fafaf9',
        cellInitialText: '#ffffff',
        cellRadius: '0.0rem',
        boardFont: 'var(--font-figtree)',
        accent: 'hsl(142 71% 45%)',
      },
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool blues with a crisp accent.',
    unlock: { type: 'level', level: 3 },
    tokens: {
      light: {
        boardBg: '#f0f9ff',
        boardBorder: '#bae6fd',
        cellBg: '#ffffff',
        cellBorder: '#7dd3fc',
        cellSelectedBg: '#bfdbfe',
        cellHighlightedBg: '#e0f2fe',
        cellSameNumberBg: '#ecfeff',
        cellErrorBg: '#fff1f2',
        cellErrorText: '#e11d48',
        cellNotesText: '#0369a1',
        cellText: '#0c4a6e',
        cellInitialText: '#082f49',
        cellRadius: '0.0rem',
        boardFont: 'var(--font-figtree)',
        accent: 'hsl(199 89% 48%)',
      },
      dark: {
        boardBg: '#071827',
        boardBorder: '#0b3550',
        cellBg: '#061a2b',
        cellBorder: '#155e75',
        cellSelectedBg: '#0b3a57',
        cellHighlightedBg: '#0b2438',
        cellSameNumberBg: '#083344',
        cellErrorBg: '#2a0d17',
        cellErrorText: '#fb7185',
        cellNotesText: '#67e8f9',
        cellText: '#e0f2fe',
        cellInitialText: '#ffffff',
        cellRadius: '0.0rem',
        boardFont: 'var(--font-figtree)',
        accent: 'hsl(199 89% 48%)',
      },
    },
  },
  {
    id: 'parchment',
    name: 'Parchment',
    description: 'Warm paper tones and a serif feel.',
    unlock: { type: 'achievement', achievementId: 'perfect-any' },
    tokens: {
      light: {
        boardBg: '#fbf4e7',
        boardBorder: '#e7d3b6',
        cellBg: '#fffaf1',
        cellBorder: '#d6b98c',
        cellSelectedBg: '#fde68a',
        cellHighlightedBg: '#fef3c7',
        cellSameNumberBg: '#fff7ed',
        cellErrorBg: '#fff1f2',
        cellErrorText: '#be123c',
        cellNotesText: '#92400e',
        cellText: '#3f2d1d',
        cellInitialText: '#1f140c',
        cellRadius: '0.25rem',
        boardFont: 'var(--font-petrona)',
        accent: 'hsl(24 95% 53%)',
      },
      dark: {
        boardBg: '#1a120a',
        boardBorder: '#3b2a18',
        cellBg: '#20160c',
        cellBorder: '#6b4f2b',
        cellSelectedBg: '#6b4f2b',
        cellHighlightedBg: '#2a1c10',
        cellSameNumberBg: '#2f1d0a',
        cellErrorBg: '#2a0d17',
        cellErrorText: '#fb7185',
        cellNotesText: '#fdba74',
        cellText: '#ffedd5',
        cellInitialText: '#ffffff',
        cellRadius: '0.25rem',
        boardFont: 'var(--font-petrona)',
        accent: 'hsl(24 95% 53%)',
      },
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'High-contrast focus mode for late-night solves.',
    unlock: { type: 'level', level: 8 },
    tokens: {
      light: {
        boardBg: '#0b1020',
        boardBorder: '#1f2a44',
        cellBg: '#0c1428',
        cellBorder: '#2b3a5f',
        cellSelectedBg: '#1d4ed8',
        cellHighlightedBg: '#0f1b35',
        cellSameNumberBg: '#1f2937',
        cellErrorBg: '#3b0820',
        cellErrorText: '#fb7185',
        cellNotesText: '#93c5fd',
        cellText: '#e5e7eb',
        cellInitialText: '#ffffff',
        cellRadius: '0.0rem',
        boardFont: 'var(--font-figtree)',
        accent: 'hsl(217 91% 60%)',
      },
      dark: {
        boardBg: '#0b1020',
        boardBorder: '#1f2a44',
        cellBg: '#0c1428',
        cellBorder: '#2b3a5f',
        cellSelectedBg: '#1d4ed8',
        cellHighlightedBg: '#0f1b35',
        cellSameNumberBg: '#1f2937',
        cellErrorBg: '#3b0820',
        cellErrorText: '#fb7185',
        cellNotesText: '#93c5fd',
        cellText: '#e5e7eb',
        cellInitialText: '#ffffff',
        cellRadius: '0.0rem',
        boardFont: 'var(--font-figtree)',
        accent: 'hsl(217 91% 60%)',
      },
    },
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Bold synthwave vibes (for the brave).',
    unlock: { type: 'achievement', achievementId: 'no-hints' },
    tokens: {
      light: {
        boardBg: '#faf5ff',
        boardBorder: '#c4b5fd',
        cellBg: '#ffffff',
        cellBorder: '#a78bfa',
        cellSelectedBg: '#fbcfe8',
        cellHighlightedBg: '#f3e8ff',
        cellSameNumberBg: '#ecfeff',
        cellErrorBg: '#fff1f2',
        cellErrorText: '#be123c',
        cellNotesText: '#6d28d9',
        cellText: '#2e1065',
        cellInitialText: '#1f083a',
        cellRadius: '0.35rem',
        boardFont: 'var(--font-figtree)',
        accent: 'hsl(292 84% 61%)',
      },
      dark: {
        boardBg: '#0b0620',
        boardBorder: '#4c1d95',
        cellBg: '#0f0a2a',
        cellBorder: '#7c3aed',
        cellSelectedBg: '#ec4899',
        cellHighlightedBg: '#1a103f',
        cellSameNumberBg: '#164e63',
        cellErrorBg: '#2b0b0b',
        cellErrorText: '#fb7185',
        cellNotesText: '#22d3ee',
        cellText: '#e9d5ff',
        cellInitialText: '#ffffff',
        cellRadius: '0.35rem',
        boardFont: 'var(--font-figtree)',
        accent: 'hsl(292 84% 61%)',
      },
    },
  },
] as const;

export function getThemeById(id: ThemeId): SudokuTheme {
  return (SUDOKU_THEMES.find((t) => t.id === id) ?? SUDOKU_THEMES[0]) as SudokuTheme;
}

