import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

interface FooterProps extends ComponentProps<'footer'> {
  className?: string;
}

export default function Footer({ className, ...props }: FooterProps) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={cn('bg-white', className)} {...props}>
      <div className="mx-auto max-w-7xl px-6 py-4 text-center">
        <p className="text-base/6 text-gray-700">
          &copy; {currentYear}{' '}
          <a
            href="https://www.yuurrific.com?ref=flipanimage"
            className="font-medium text-violet-700 transition hover:text-violet-900"
            target="_blank">
            Yuurrific
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
