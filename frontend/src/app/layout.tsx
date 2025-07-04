import './globals.css'
import Navbar from '@/components/Navbar'

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
    <html lang="en">
      <body className="bg-white-100 text-gray-900">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
