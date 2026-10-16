import type { ComponentProps } from 'react';

import { siteConfig } from '@/config/site';

import { cn } from '@/lib/utils';

import { BadgeRelaySite } from '@/components/badge-relay-site';
import { TransitionLink } from '@/components/transition-link';

interface FooterProps extends ComponentProps<'footer'> {
  className?: string;
}

export default function Footer({ className, ...props }: FooterProps) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={cn('bg-white text-sm font-semibold print:hidden', className)} {...props}>
      <div className="mx-auto max-w-7xl px-6 py-3 text-center">
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-700"
        >
          <TransitionLink href="/guides" className="font-medium underline-offset-4 hover:underline">
            Guides
          </TransitionLink>
          <TransitionLink href="/daily" className="font-medium underline-offset-4 hover:underline">
            Daily Challenge
          </TransitionLink>
          <TransitionLink
            href="/sudoku-solver"
            className="font-medium underline-offset-4 hover:underline"
          >
            Sudoku Solver
          </TransitionLink>
          <TransitionLink
            href="/killer-sudoku"
            className="font-medium underline-offset-4 hover:underline"
          >
            Killer Sudoku
          </TransitionLink>
          <TransitionLink
            href="/printable"
            className="font-medium underline-offset-4 hover:underline"
          >
            Printable
          </TransitionLink>
          <TransitionLink
            href="/kids-sudoku"
            className="font-medium underline-offset-4 hover:underline"
          >
            Kids Sudoku
          </TransitionLink>
          <TransitionLink href="/about" className="font-medium underline-offset-4 hover:underline">
            About
          </TransitionLink>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-4 text-center">
        <p className="text-sm leading-5 text-gray-700">
          &copy; {currentYear} {siteConfig.siteName}.
          <span className="ml-2 mt-0 inline-block text-gray-700">
            Built by{' '}
            <a
              href="https://www.yuurrific.com?ref=sudokuunlimited"
              className="inline-block font-medium underline underline-offset-4"
              target="_blank"
            >
              Yuurrific
            </a>
            .
          </span>
          <span className="mt-2 block text-gray-700 md:ml-2 md:mt-0 md:inline-block">
            Privacy-friendly analytics by{' '}
            <a
              href="https://seline.com/?via=yuyu"
              className="inline-block rotate-0 rounded-md bg-violet-600 px-2 py-1 text-violet-50 transition duration-100 ease-out hover:-rotate-3 hover:ease-in"
              target="_blank"
            >
              Seline
            </a>
          </span>
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-4 text-center">
        <BadgeRelaySite
          siteKey="site_live_MZo0AcSphW-Z4mFwr0siyg"
          apiBase="https://badgerelay.com"
          revalidateSeconds={30}
        />
      </div>
    </footer>
  );
}
