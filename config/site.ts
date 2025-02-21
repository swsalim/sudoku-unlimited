import { SiteConfig } from '@/types';

import { absoluteUrl } from '@/lib/utils';

export const siteConfig: SiteConfig = {
  title: 'Play Free Sudoku Unlimited online - solve web sudoku puzzles',
  description:
    'Play free Sudoku online from Easy to Expert level on Sudoku.com. Select a difficulty level of a web sudoku puzzle to challenge yourself and enjoy the game!',
  siteName: 'Sudoku Unlimited',
  url: new URL(absoluteUrl()),
  openGraph: {
    image: '/images/og-default.png',
    imageAlt: 'Banner for rgbtopantone.com',
    width: '1200',
    height: '630',
  },
  creator: '@swsalim',
};
