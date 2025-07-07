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

export default async function PlayerPage({ params }: { params: { id: string } }) {
  try {
    const res = await api.get<{ player_info: Player[] }>(`/api/player/${params.id}`)
    const player = res.data.player_info?.[0]
    return (
      <>
        {/* <PlayerInfoCard
    //       name={player.player_name}
    //       fullName={player.full_name}
    //       cricinfo_name={player.cricinfo_name}
    //       role={player.role}
    //       country={player.country}
    //       imageUrl={player.img_url}
    //     /> */}
        <PlayerDashboard/>
      </>
    )
  } catch (err) {
    console.error('Player fetch error:', err)
    notFound() // Show 404 page
  }
}
