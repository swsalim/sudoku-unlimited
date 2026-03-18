const ZEN_MODE_KEY = 'sudoku-zen-mode';

export function getZenMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(ZEN_MODE_KEY);
    if (raw === null) return false;
    return JSON.parse(raw) === true;
  } catch {
    return false;
  }
}

export function setZenMode(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ZEN_MODE_KEY, JSON.stringify(enabled));
}
