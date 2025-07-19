import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Head from 'next/head';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GeistSans } from 'geist/font/sans'

export const metadata = {
  title: 'StatPitch | Advanced Cricket Analytics',
  description:
    'StatPitch goes beyond averages to offer deep, contextual cricket insights. Explore boundary concession rates, matchup data, and player consistency like never before.',
  keywords: [
    'Cricket Analytics',
    'Cricket Stats',
    'IPL Data',
    'Cricket Performance',
    'Advanced Cricket Metrics',
    'StatPitch',
    'Nikhil Parihar'
  ],
  metadataBase: new URL('https://www.statpitch.com'),
  authors: [
    {
      name: 'Nikhil Parihar',
      url: 'https://github.com/nikp9'
    }
  ],
  openGraph: {
    title: 'Beyond Averages. Into Impact.',
    description:
      'Modern cricket analytics platform that delivers recent player performance insights with clarity and precision.',
    url: 'https://www.statpitch.com',
    siteName: 'StatPitch',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 628,
        alt: 'StatPitch Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-white-100 text-gray-900">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
