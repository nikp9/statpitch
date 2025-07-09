import PlayerDashboard from '@/components/PlayerDashboard'
import api from '@/utils/axios'
import { notFound } from 'next/navigation'

type Player = {
  player_id: string
  cricinfo_id: string
  cricinfo_name: string
  player_name: string
  full_name: string
  role: string
  gender: string
  country: string
  img_url: string
}

type PlayerStatsResponse = {
  player_info: Player[]
  batting: any[]
  bowling: any[]
  team_stat: any[]
}

export default async function PlayerPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ country?: string; gender?: string }>;
}) {
  try {
    const { id: player_id } = await params
    const { country, gender } = await searchParams
    
    const res = await api.get<PlayerStatsResponse>(`/api/player/${player_id}?country=${country}&gender=${gender}`)
    const { player_info, batting, bowling, team_stat } = res.data

    if (!player_info?.length) return notFound()

    const player = player_info[0]

    return (
      <PlayerDashboard
        player={player}
        batting={batting}
        bowling={bowling}
        teamStat={team_stat}
      />
    )
  } catch (err) {
    console.error('Player fetch error:', err)
    return notFound()
  }
}
