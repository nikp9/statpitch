'use client'


import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useEffect, useState, useMemo } from "react"
import api from '@/utils/axios'
import Fuse from 'fuse.js'

type CommandMenuProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

type Player = {
  player_id: string
  player_name: string
  full_name: string
  role: string
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const [players, setPlayers] = useState<Player[]>([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await api.get('/api/searchList')
        setPlayers(res.data)
      } catch (err) {
        console.error('Failed to fetch players:', err)
      }
    }

    fetchPlayers()
  }, [])

const fuse = useMemo(() => {
  return new Fuse(players, {
    keys: ['full_name'],
    threshold: 0.9, // Increase from 0.3 to 0.6
    ignoreLocation: true,

  });
}, [players]);

  // Perform fuzzy search (limit to top 20 results)
  const filteredPlayers = query.trim()
    ? fuse.search(query.trim()).map(result => result.item).slice(0, 20)
    : players.slice(0, 20)

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a player name..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No players found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {filteredPlayers.map((player) => (
            <CommandItem
              key={player.player_id}
              onSelect={() => {
                setOpen(false)
                // router.push(`/players/${player.player_id}`)
              }}
            >
              <div className="flex flex-col">
                <span className="font-medium">{player.player_name}</span>
                <span className="text-sm text-muted-foreground">{player.role}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}