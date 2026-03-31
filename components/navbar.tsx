'use client';

import Link from 'next/link';

import { siteConfig } from '@/config/site';

import useScroll from '@/lib/hooks/use-scroll';

import { Container } from '@/components/container';

export default function Navbar() {
  const scrolled = useScroll(50);

  return (
    <>
      <div
        className={`sticky top-[-1px] w-full ${
          scrolled ? 'border-b border-stone-200/80 bg-white/70 backdrop-blur-xl' : 'bg-transparent'
        } z-30 transition-all`}>
        <Container className="flex h-16 items-center justify-between py-0">
          <Link href="/" className="flex items-center gap-x-2">
            <span className="font-heading text-2xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 md:text-xl">
              {siteConfig.siteName}
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/killer-sudoku"
              className="text-sm font-medium text-stone-600 underline-offset-4 hover:text-stone-900 hover:underline dark:text-stone-400 dark:hover:text-stone-300">
              Killer Sudoku
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-stone-600 underline-offset-4 hover:text-stone-900 hover:underline dark:text-stone-400 dark:hover:text-stone-300">
              About
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
