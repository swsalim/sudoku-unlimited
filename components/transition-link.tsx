'use client';

import type { ComponentProps } from 'react';
import { Link } from 'next-view-transitions';

type TransitionLinkProps = ComponentProps<typeof Link>;

/** Internal navigation with the View Transitions API (next-view-transitions). */
export function TransitionLink({ className, ...props }: TransitionLinkProps) {
  return <Link className={className} {...props} />;
}
