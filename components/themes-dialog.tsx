'use client';

import { useEffect, useMemo, useState } from 'react';

import { Palette, Lock } from 'lucide-react';

import {
  getPlayerLevel,
  getThemeById,
  SUDOKU_THEMES,
  type ThemeId,
} from '@/lib/themes/themes';
import { getStats, getUnlockedAchievementIds } from '@/lib/storage/stats-storage';
import {
  applyThemeToDocument,
  getColorModePreference,
  getSelectedThemeId,
  getUnlockableThemeIds,
  getUnlockedThemeIds,
  setColorModePreference,
  setSelectedThemeId,
  unlockTheme,
  type ColorModePreference,
} from '@/lib/storage/theme-storage';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ThemesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function unlockLabel(themeId: ThemeId, level: number, unlockedAchievementIds: string[]): string {
  const theme = getThemeById(themeId);
  const rule = theme.unlock;
  if (rule.type === 'free') return 'Free';
  if (rule.type === 'level') return `Unlock at level ${rule.level} (you’re level ${level})`;
  if (rule.type === 'achievement') {
    const has = unlockedAchievementIds.includes(rule.achievementId);
    return has ? 'Unlocked by achievement' : `Unlock by achievement: ${rule.achievementId}`;
  }
  return 'Locked';
}

export function ThemesDialog({ open, onOpenChange }: ThemesDialogProps) {
  const [selectedThemeId, setSelectedThemeIdState] = useState<ThemeId>('classic');
  const [colorMode, setColorMode] = useState<ColorModePreference>('system');
  const [unlocked, setUnlocked] = useState<ThemeId[]>(['classic']);
  const [stats, setStats] = useState(() => (typeof window !== 'undefined' ? getStats() : null));
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<string[]>(() =>
    typeof window !== 'undefined' ? getUnlockedAchievementIds() : [],
  );

  const level = stats ? getPlayerLevel(stats) : 1;
  const unlockable = useMemo(() => {
    return stats ? getUnlockableThemeIds({ stats, unlockedAchievementIds }) : (['classic'] as ThemeId[]);
  }, [stats, unlockedAchievementIds]);

  useEffect(() => {
    if (!open) return;
    const currentTheme = getSelectedThemeId();
    const currentMode = getColorModePreference();
    setSelectedThemeIdState(currentTheme);
    setColorMode(currentMode);

    const nextStats = getStats();
    const nextAchievementIds = getUnlockedAchievementIds();
    setStats(nextStats);
    setUnlockedAchievementIds(nextAchievementIds);

    // Sync unlocks in case stats/achievements existed before this feature.
    const nextUnlockable = nextStats
      ? getUnlockableThemeIds({ stats: nextStats, unlockedAchievementIds: nextAchievementIds })
      : (['classic'] as ThemeId[]);
    for (const id of nextUnlockable) unlockTheme(id);
    setUnlocked(getUnlockedThemeIds());
  }, [open]);

  const handleSelectTheme = (id: ThemeId) => {
    if (!unlocked.includes(id) && !unlockable.includes(id)) return;
    setSelectedThemeId(id);
    setSelectedThemeIdState(id);
    applyThemeToDocument({ themeId: id, colorModePreference: colorMode });
  };

  const handleSetMode = (pref: ColorModePreference) => {
    setColorModePreference(pref);
    setColorMode(pref);
    applyThemeToDocument({ themeId: selectedThemeId, colorModePreference: pref });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-h-[85vh] overflow-hidden flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Themes
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="-mx-2 flex-1 overflow-y-auto px-2 space-y-5">
          <section className="rounded-lg border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">Appearance</p>
                <p className="text-xs text-muted-foreground">Set light/dark mode and pick a theme.</p>
              </div>
              <div className="text-xs text-muted-foreground">Level {level}</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(['system', 'light', 'dark'] as const).map((m) => (
                <Button
                  key={m}
                  variant={colorMode === m ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSetMode(m)}>
                  {m === 'system' ? 'System' : m === 'light' ? 'Light' : 'Dark'}
                </Button>
              ))}
            </div>
          </section>

          <section className="grid gap-2">
            {SUDOKU_THEMES.map((t) => {
              const isUnlocked = unlocked.includes(t.id) || unlockable.includes(t.id);
              const isSelected = selectedThemeId === t.id;
              const preview = t.tokens.light;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTheme(t.id)}
                  className={[
                    'w-full rounded-lg border p-3 text-left transition-colors',
                    isSelected ? 'border-emerald-600/40 bg-emerald-50/40' : 'hover:bg-muted/40',
                    !isUnlocked ? 'opacity-60' : '',
                  ].join(' ')}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span
                        className="inline-block h-5 w-5 rounded-md border"
                        style={{
                          background: preview.cellSelectedBg,
                          borderColor: preview.cellBorder,
                        }}
                        aria-hidden
                      />
                      <span
                        className="inline-block h-5 w-5 rounded-md border"
                        style={{
                          background: preview.cellHighlightedBg,
                          borderColor: preview.cellBorder,
                        }}
                        aria-hidden
                      />
                      <span
                        className="inline-block h-5 w-5 rounded-md border"
                        style={{
                          background: preview.cellSameNumberBg,
                          borderColor: preview.cellBorder,
                        }}
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold">{t.name}</p>
                        {!isUnlocked ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600 dark:bg-stone-900 dark:text-stone-300">
                            <Lock className="h-3 w-3" />
                            Locked
                          </span>
                        ) : isSelected ? (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                            Selected
                          </span>
                        ) : (
                          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600 dark:bg-stone-900 dark:text-stone-300">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{t.description}</p>
                      {!isUnlocked && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {unlockLabel(t.id, level, unlockedAchievementIds)}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </section>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

