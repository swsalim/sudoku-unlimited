'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

interface ComboToastProps {
  combo: number;
  onDismiss: () => void;
  duration?: number;
}

export function ComboToast({ combo, onDismiss, duration = 800 }: ComboToastProps) {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  if (combo < 2) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none fixed left-1/2 top-24 z-50 -translate-x-1/2"
          role="status"
          aria-live="polite"
          initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}>
          <div className="rounded-xl border border-amber-400/60 bg-amber-50 px-6 py-2 shadow-lg">
            <span className="font-heading text-xl font-bold text-amber-800">
              {combo}× Combo!
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
