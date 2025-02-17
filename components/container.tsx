import type { ElementType } from 'react';

import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

export function Container({ as: Comp = 'div', className, children, ...props }: ContainerProps) {
  return (
    <Comp {...props} className={cn('mx-auto max-w-4xl px-4 py-8', className)}>
      {children}
    </Comp>
  );
}
