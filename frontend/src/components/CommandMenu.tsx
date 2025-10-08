'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useState, useMemo } from "react"
// import api from '@/utils/axios'
import Fuse from 'fuse.js'
import { useRouter } from 'next/navigation'

type CommandMenuProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

type Player = {
  player_id: string
  player_name: string
  full_name: string
  cricinfo_name: string | null
  role: string
  country: string
  gender: string
  img_url: string | null
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const router = useRouter()
  const [players] = useState<Player[]>([])
  const [query, setQuery] = useState("")

  // useEffect(() => {
  //   const fetchPlayers = async () => {
  //     try {
  //       const res = await api.get('/api/searchList')
  //       setPlayers(res.data)
  //     } catch (err) {
  //       console.error('Failed to fetch players:', err)
  //     }
  //   }

  //   fetchPlayers()
  // }, [])

  const fuse = useMemo(() => {
    return new Fuse(players, {
      keys: [
        'player_name',
        'full_name',
        'cricinfo_name'
      ],
      threshold: 0.4,
      ignoreLocation: true,
    });
  }, [players]);

  const filteredPlayers = query.trim()
    ? fuse.search(query.trim()).map(result => result.item).slice(0, 20)
    : players.slice(0, 20)

  return (
    <CommandDialog open={open} onOpenChange={setOpen} className="top-4 translate-y-0 max-w-2xl">
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
              value={`${player.player_name} ${player.full_name}`}
              onSelect={() => {
                setOpen(false)
                router.push(`/player/${player.player_id}?country=${player.country}&gender=${player.gender}`)
              }}
            >
              <div className="flex flex-col">
                <span className="font-medium">{player.player_name}</span>
                <span className="text-sm text-muted-foreground">{player.full_name}</span>
                {player.role && player.role !== 'NA' && (
                  <span className="text-xs text-gray-500">{player.role}</span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}