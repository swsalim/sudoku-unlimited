'use client';

import { useCallback, useEffect, useId, useState } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { primaryNavLinks } from '@/config/nav';
import { siteConfig } from '@/config/site';

import { TransitionLink } from '@/components/transition-link';

const panelVariants = {
  closed: { opacity: 0, y: -8, scale: 0.98 },
  open: { opacity: 1, y: 0, scale: 1 },
};

const itemVariants = {
  closed: { opacity: 0, x: 12 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.04 + i * 0.04 },
  }),
};

export function MobileNavMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const transition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 32 };

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="relative z-[60] inline-flex size-10 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-800 shadow-sm dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}>
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu backdrop"
              className="fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={close}
            />
            <motion.nav
              id={menuId}
              aria-label="Mobile"
              className="fixed left-3 right-3 top-[4.25rem] z-50 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl dark:border-stone-700 dark:bg-stone-900"
              initial="closed"
              animate="open"
              exit="closed"
              variants={panelVariants}
              transition={transition}>
              <div className="flex items-center gap-2 border-b border-stone-100 px-4 py-3 dark:border-stone-800">
                <Image
                  src="/icons/logo.webp"
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 shrink-0"
                />
                <span className="sr-only font-heading text-lg font-extrabold tracking-tight text-stone-900 dark:text-stone-50 md:not-sr-only">
                  {siteConfig.siteName}
                </span>
              </div>
              <ul className="divide-y divide-stone-100 dark:divide-stone-800">
                {primaryNavLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    custom={index}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    transition={reduceMotion ? { duration: 0 } : undefined}>
                    <TransitionLink
                      href={link.href}
                      onClick={close}
                      className="block px-4 py-3.5 text-base font-medium text-stone-800 hover:bg-stone-50 dark:text-stone-100 dark:hover:bg-stone-800/80">
                      {link.label}
                    </TransitionLink>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
