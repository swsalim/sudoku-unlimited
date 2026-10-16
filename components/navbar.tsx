'use client';

import { motion, useReducedMotion } from 'motion/react';

import { primaryNavLinks } from '@/config/nav';
import { siteConfig } from '@/config/site';

import useScroll from '@/lib/hooks/use-scroll';

import { Container } from '@/components/container';
import { MobileNavMenu } from '@/components/nav/mobile-nav-menu';
import { TransitionLink } from '@/components/transition-link';

const navLinkClassName =
  'text-sm font-medium text-stone-600 underline-offset-4 hover:text-stone-900 hover:underline dark:text-stone-400 dark:hover:text-stone-300';

export default function Navbar() {
  const scrolled = useScroll(50);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`site-navbar sticky top-[-1px] z-30 w-full print:hidden ${
        scrolled
          ? 'border-b border-stone-200/80 bg-white/70 backdrop-blur-xl dark:border-stone-800/80 dark:bg-stone-900/70'
          : 'bg-transparent'
      }`}
      initial={false}
      animate={
        reduceMotion
          ? undefined
          : {
              boxShadow: scrolled ? '0 1px 0 0 rgba(0,0,0,0.04)' : '0 0 0 0 rgba(0,0,0,0)',
            }
      }
      transition={{ duration: 0.2 }}
    >
      <Container className="flex h-16 items-center justify-between py-0">
        <TransitionLink href="/" className="flex items-center gap-x-2">
          <span className="font-heading text-2xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 md:text-xl">
            {siteConfig.siteName}
          </span>
        </TransitionLink>

        <div className="hidden items-center gap-4 md:flex">
          {primaryNavLinks.map((link) => (
            <TransitionLink key={link.href} href={link.href} className={navLinkClassName}>
              {link.label}
            </TransitionLink>
          ))}
        </div>

        <MobileNavMenu />
      </Container>
    </motion.div>
  );
}
