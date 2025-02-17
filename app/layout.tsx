import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';

import { AnalyticsWrapper } from '@/components/Analytics';
import Footer from '@/components/footer';

import './globals.css';

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Play Free Sudoku Unlimited online - solve web sudoku puzzles',
  description:
    'Play free Sudoku online from Easy to Expert level on Sudoku.com. Select a difficulty level of a web sudoku puzzle to challenge yourself and enjoy the game!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="c2fbac7b-0b09-48f0-b925-7a5a61de2a3b"
          async></script>
      </head>
      <body
        className={`${quicksand.variable} font-sans font-medium antialiased`}
        suppressHydrationWarning>
        {children}
        <AnalyticsWrapper />
        <Footer />
      </body>
    </html>
  );
}
