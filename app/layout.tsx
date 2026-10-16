import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { Figtree, Fraunces } from 'next/font/google';

import { siteConfig } from '@/config/site';

import { openGraphImages, twitterImages } from '@/lib/open-graph';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
});

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  metadataBase: siteConfig.url,
  alternates: {
    canonical: '/',
  },
  authors: [
    {
      name: 'Yuyu',
      url: 'https://www.yuurrific.com',
    },
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: openGraphImages,
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  twitter: {
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.creator,
    ...twitterImages,
  },
  robots: {
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key="15wDlBoHgMA4DHDxuC/6uA"
            defer></script>
          <script
            async
            src="https://cdn.seline.com/seline.js"
            data-token="9b914a331a40d42"></script>
          <script async src="https://badgerelay.com/widget.js"></script>
        </head>
        <body
          className={`${fraunces.variable} ${figtree.variable} font-sans font-medium antialiased`}
          suppressHydrationWarning>
          <ThemeProvider />
          <Navbar />
          <main className="flex min-h-[calc(100vh-8rem)] grow flex-col justify-center">
            {children}
          </main>
          <Footer />
          <script
            src="https://cdn.apitiny.net/scripts/v2.0/main.js"
            data-site-id="680e62b603dfc972f26f101d"
            async></script>
        </body>
      </html>
    </ViewTransitions>
  );
}
