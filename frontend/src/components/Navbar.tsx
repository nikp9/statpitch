import Link from 'next/link'
import CommandSearch from '@/components/CommandSearch'
import HamburgerMenu from '@/components/HamburgerMenu'

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">

        <Link href="/">
          <img src="/statpitchlogo.svg" alt="StatPitch" className='h-10'/>
        </Link>

        <div className='flex items-center justify-around'>
          <div className="flex-1 max-w-md">
            <CommandSearch />
          </div>

          <nav className="hidden md:flex space-x-1 items-center">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-md px-4 py-2 transition-colors transform active:scale-95 duration-200">Home</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-md px-4 py-2 transition-colors transform active:scale-95 duration-200">About</Link>
          </nav>

          <div className="md:hidden">
            <HamburgerMenu/>
          </div>
        </div>
      </div>
    </header>
  )
}
