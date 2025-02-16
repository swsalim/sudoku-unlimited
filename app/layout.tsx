import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Footer from '@/components/footer';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning>
        {children}
        <Footer />
      </body>
    </html>
  );
}
