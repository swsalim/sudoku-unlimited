'use client';

import { useEffect } from 'react';

import { applyThemeToDocument, getColorModePreference } from '@/lib/storage/theme-storage';

export function ThemeProvider() {
  useEffect(() => {
    applyThemeToDocument();

    const mql = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mql) return;

    const onChange = () => {
      if (getColorModePreference() === 'system') {
        applyThemeToDocument();
      }
    };

    // Safari < 14 fallback
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyMql = mql as any;
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
    if (typeof anyMql.addListener === 'function') {
      anyMql.addListener(onChange);
      return () => anyMql.removeListener(onChange);
    }
  }, []);

  return null;
}

