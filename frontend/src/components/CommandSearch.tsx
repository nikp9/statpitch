'use client'

import { Command, Search as SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CommandMenu } from './CommandMenu'
import { useState, useEffect } from "react"

export default function CommandSearch() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="mx-4.5 relative flex-1 max-w-md cursor-pointer">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500 dark:text-stone-400" onClick={() => setOpen(true)} />
      
      <Input
        type="search"
        placeholder="Search"
        readOnly
        aria-haspopup="dialog"
        aria-expanded={open}
        className="w-full rounded-md border h-9 pl-10 pr-0 sm:pr-4 text-sm shadow-sm bg-background dark:bg-background/95 overflow-ellipsis"
        onClick={() => setOpen(true)}
      />


      <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-2 items-center gap-0.5 text-xs font-mono font-medium bg-stone-200/65 dark:bg-stone-900 p-1 rounded-sm" onClick={() => setOpen(true)}>
        <Command className="w-3 h-3" />
        <span>K</span>
      </div>

      <CommandMenu open={open} setOpen={setOpen}/>
    </div>
  )
}
