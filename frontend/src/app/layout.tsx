import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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
      <body className="bg-white-100 text-gray-900">
        <div className="flex flex-col min-h-screen">
          <Navbar />

          {/* Ensure main grows to fill space */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer sticks to bottom if content is short */}
          <Footer />
        </div>
      </body>
    </html>
  )
}
