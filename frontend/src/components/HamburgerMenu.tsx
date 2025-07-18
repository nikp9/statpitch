'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="p-4 pt-8">
        <DrawerHeader>
          <DrawerTitle className="text-lg">Menu</DrawerTitle>
        </DrawerHeader>
        <div className="space-y-2 mt-4">
          <Link
            href="/"
            className="block text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-md px-4 py-2 transition-colors"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-md px-4 py-2 transition-colors"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
