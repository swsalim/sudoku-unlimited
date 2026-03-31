import type { Metadata } from 'next';
import { Figtree, Fraunces } from 'next/font/google';

import { siteConfig } from '@/config/site';

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
    images: [
      {
        url: siteConfig.openGraph.image,
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: siteConfig.openGraph.imageAlt,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/icons/favicon-32x32.png',
    shortcut: '/icons/apple-touch-icon.png',
    apple: '/icons/apple-touch-icon.png',
  },
  twitter: {
    title: siteConfig.title,
    description: siteConfig.description,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [siteConfig.openGraph.image],
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
    <html lang="en">
      <head>
        <script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="c2fbac7b-0b09-48f0-b925-7a5a61de2a3b"
          async></script>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="15wDlBoHgMA4DHDxuC/6uA"
          defer></script>
        <script async src="https://cdn.seline.com/seline.js" data-token="9b914a331a40d42"></script>
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
  );
}
