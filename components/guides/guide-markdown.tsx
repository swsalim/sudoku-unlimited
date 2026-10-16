import Link from 'next/link';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { slugifyHeading } from '@/lib/guides/slugify-heading';

const components: Components = {
  h2: ({ children }) => {
    const text = String(children);
    const id = slugifyHeading(text);
    return (
      <h2 id={id} className="scroll-mt-24 font-heading text-2xl font-bold dark:text-stone-50">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const text = String(children);
    const id = slugifyHeading(text);
    return (
      <h3 id={id} className="scroll-mt-24 font-heading text-xl font-bold dark:text-stone-50">
        {children}
      </h3>
    );
  },
  a: ({ href, children }) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className="text-[color:var(--app-accent-strong)] no-underline hover:underline">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className="text-[color:var(--app-accent-strong)] no-underline hover:underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    );
  },
};

type GuideMarkdownProps = {
  content: string;
};

export function GuideMarkdown({ content }: GuideMarkdownProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
