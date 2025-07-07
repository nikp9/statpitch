'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-row flex-wrap items-center justify-between gap-2">
        
        <Link href="https://github.com/nikp9" target="_blank" className="text-sm text-gray-500">
          Built by <span className="font-medium text-gray-700 hover:underline hover:cursor-pointer">Nikhil Parihar</span>
        </Link>

        <Link
          href="https://github.com/nikp9/statpitch" // 🔁 replace with your GitHub repo link
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md px-4 py-2 transition-colors transform active:scale-95 duration-200"
        >
          <Github className="w-5 h-5" />
          <span className="text-sm">GitHub</span>
        </Link>
      </div>
    </footer>
  )
}
