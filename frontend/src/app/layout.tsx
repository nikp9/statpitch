import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Head from 'next/head';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GeistSans } from 'geist/font/sans'

export const metadata = {
  title: 'StatPitch',
  description: 'Advanced Cricket Analytics',
}

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
