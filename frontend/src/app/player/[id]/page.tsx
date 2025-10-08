import PlayerDashboard from '@/components/PlayerDashboard'
// import api from '@/utils/axios'
import { notFound } from 'next/navigation'
import dummyData from '@/utils/dummy_data.json'

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  batting: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bowling: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  team_stat: any[]
}

const data: Record<string, PlayerStatsResponse> = dummyData;

export default async function PlayerPage({ 
  params
  // searchParams 
}: { 
  params: Promise<{ id: string }>;
  // searchParams: Promise<{ country?: string; gender?: string }>;
}) {
  try {
    const { id: player_id } = await params
    // const { country, gender } = await searchParams
    
    // const res = await api.get<PlayerStatsResponse>(`/api/player/${player_id}?country=${country}&gender=${gender}`)
    const res = data[player_id]
    // const { player_info, batting, bowling, team_stat } = res.data
    const { player_info, batting, bowling, team_stat } = res
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
