import type { Metadata } from 'next';

import { projects } from '@/config/projects';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { AboutSchemaScript } from '@/components/schemas';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Sudoku Unlimited is a free online Sudoku game playable from Easy to Extreme difficulty. No signup required—play directly in your browser. Created by Yuyu, a front-end developer based in Singapore.',
  alternates: {
    canonical: absoluteUrl('/about'),
  },
  openGraph: {
    title: 'About Sudoku Unlimited',
    description:
      'Sudoku Unlimited is a free online Sudoku game that you can play directly in your browser—no signup required. Choose from multiple difficulty levels, from Easy to Extreme, and challenge yourself with new puzzles whenever you like. Whether you&rsquo;re a beginner or an experienced solver, you&rsquo;ll find a level that suits you.',
    url: 'https://sudokuunlimited.com/about',
  },
  twitter: {
    title: 'About Sudoku Unlimited',
  },
  robots: {
    index: true,
  },
};

export default function AboutPage() {
  return (
    <div className="flex grow flex-col">
      <AboutSchemaScript />
      <section className="prose max-w-none py-12 dark:prose-invert">
        <Container>
          <h1 className="font-heading text-4xl font-black dark:text-stone-50">
            About Sudoku Unlimited
          </h1>
          <p>
            Sudoku Unlimited is a free online Sudoku game that you can play directly in your
            browser—no signup required. Choose from multiple difficulty levels, from Easy to
            Extreme, and challenge yourself with new puzzles whenever you like. Whether you&rsquo;re
            a beginner or an experienced solver, you&rsquo;ll find a level that suits you.
          </p>

          <h2 className="font-heading text-2xl font-bold dark:text-stone-50">About the Creator</h2>
          <p>
            I&rsquo;m Yuyu. I am a front-end developer based in Singapore. I am passionate about
            creating user-friendly and visually appealing websites, and I enjoy incorporating
            elements of UI/UX and SEO optimization into my work. You can find more of my work at{' '}
            <a
              href="https://www.yuurrific.com?ref=sudokuunlimited"
              target="_blank"
              rel="noopener noreferrer">
              yuurrific.com
            </a>
            .
          </p>

          <h2 className="font-heading text-2xl font-bold dark:text-stone-50">Other Projects</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target={project.target}
                rel="noopener noreferrer"
                className="text-sm font-medium underline underline-offset-4 transition hover:no-underline">
                {project.name}
              </a>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
