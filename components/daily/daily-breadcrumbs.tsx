import Link from 'next/link';

import { cn } from '@/lib/utils';

export interface DailyBreadcrumbItem {
  label: string;
  href?: string;
}

export function DailyBreadcrumbs({ items, className }: { items: DailyBreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm text-stone-600 dark:text-stone-400', className)}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden className="text-stone-400">/</span>}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-medium text-[color:var(--app-accent-strong)] hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-semibold text-stone-900 dark:text-stone-100' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
