'use client';

import { useEffect, useState } from 'react';

interface ComboToastProps {
  combo: number;
  onDismiss: () => void;
  duration?: number;
}

export function ComboToast({ combo, onDismiss, duration = 800 }: ComboToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  if (combo < 2) return null;

  return (
    <div
      className={`pointer-events-none fixed left-1/2 top-24 z-50 -translate-x-1/2 transform transition-all duration-200 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      }`}
      role="status"
      aria-live="polite">
      <div className="rounded-xl border border-amber-400/60 bg-amber-50 px-6 py-2 shadow-lg">
        <span className="font-heading text-xl font-bold text-amber-800">
          {combo}× Combo!
        </span>
      </div>
    </div>
  );
}
