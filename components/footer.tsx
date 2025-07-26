import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

type Project = {
  url: string;
  name: string;
  target: '_blank' | '_self';
};
const projects: Project[] = [
  {
    url: 'https://pfpresizer.com/?ref=sudokuunlimited.com',
    name: 'PFP Resizer',
    target: '_blank',
  },
  {
    url: 'https://www.flipanimage.xyz/?ref=sudokuunlimited.com',
    name: 'Flip Image',
    target: '_blank',
  },
  {
    url: 'https://www.cmyktopantone.com/?ref=sudokuunlimited.com',
    name: 'CMYK to Pantone',
    target: '_blank',
  },
  {
    url: 'https://www.rgbtopantone.com/?ref=sudokuunlimited.com',
    name: 'RGB to Pantone',
    target: '_blank',
  },
  {
    url: 'https://www.randomnumberapp.com/?ref=sudokuunlimited.com',
    name: 'Random Number App',
    target: '_blank',
  },
  {
    url: 'https://www.clinicgeek.com/?ref=sudokuunlimited.com',
    name: 'Clinic Geek',
    target: '_blank',
  },
  {
    url: 'https://www.cottagefortots.com/?ref=sudokuunlimited.com',
    name: 'Cottage For Tots',
    target: '_blank',
  },
  {
    url: 'https://www.wateraday.com/?ref=sudokuunlimited.com',
    name: 'Water A Day',
    target: '_blank',
  },
  {
    url: 'https://www.willitraintomorrow.com/?ref=sudokuunlimited.com',
    name: 'Will It Rain Tomorrow?',
    target: '_blank',
  },
  {
    url: 'https://www.mainan.fun/?ref=sudokuunlimited.com',
    name: 'mainan.fun',
    target: '_blank',
  },
  {
    url: 'https://www.indieworldmap.com/?ref=sudokuunlimited.com',
    name: 'Indie World Map',
    target: '_blank',
  },
  {
    url: 'https://www.byeindonesia.com/?ref=sudokuunlimited.com',
    name: 'Bye Indonesia',
    target: '_blank',
  },
  {
    url: 'https://www.dentalclinicclosetome.my/?ref=sudokuunlimited.com',
    name: 'Dental Clinic Malaysia',
    target: '_blank',
  },
  {
    url: 'https://www.keywordgap.com/?ref=sudokuunlimited.com',
    name: 'Keyword Gap',
    target: '_blank',
  },
];

interface FooterProps extends ComponentProps<'footer'> {
  className?: string;
}

export default function Footer({ className, ...props }: FooterProps) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={cn('bg-white text-sm font-semibold', className)} {...props}>
      <div className="mx-auto max-w-7xl px-6 py-4 text-center">
        <div className="my-10">
          <h3 className="mb-4 text-2xl font-bold capitalize tracking-tight text-slate-900 sm:mb-8 sm:text-3xl">
            Check out our other projects
          </h3>
          <div className="mb-10 grid grid-cols-2 items-center justify-center gap-4 md:mb-12 md:grid-cols-4 lg:grid-cols-5">
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
        </div>
        <p className="text-gray-700">
          &copy; {currentYear}{' '}
          <a
            href="https://www.yuurrific.com?ref=sudokuunlimited"
            className="font-semibold text-violet-700 transition hover:text-violet-900"
            target="_blank">
            Yuurrific
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
