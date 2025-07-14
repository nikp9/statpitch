import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function HomePage() {
    const players = [
  {
      "player_id": "ba607b88",
      "cricinfo_id": "253802",
      "cricinfo_name": "Virat Kohli",
      "player_name": "V Kohli",
      "full_name": "Virat Kohli",
      "role": "Top order Batter",
      "gender": "male",
      "country": "India",
      "img_url": "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316600/316605.3.png"
  },
  {
      "player_id": "ded9240e",
      "cricinfo_id": "489889",
      "cricinfo_name": "Pat Cummins",
      "player_name": "PJ Cummins",
      "full_name": "Patrick James Cummins",
      "role": "Bowler",
      "gender": "male",
      "country": "Australia",
      "img_url": "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/390900/390954.5.png"
  },
    {
    "player_id": "462411b3",
    "cricinfo_id": "625383",
    "cricinfo_name": "Jasprit Bumrah",
    "player_name": "JJ Bumrah",
    "full_name": "Jasprit Jasbirsingh Bumrah",
    "role": "Bowler",
    "gender": "male",
    "country": "India",
    "img_url": "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/319900/319940.2.png"
  },
  {
      "player_id": "12b610c2",
      "cricinfo_id": "530011",
      "cricinfo_name": "Travis Head",
      "player_name": "TM Head",
      "full_name": "Travis Michael Head",
      "role": "Middle order Batter",
      "gender": "male",
      "country": "Australia",
      "img_url": "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/321500/321584.2.png"
  },
  {
      "player_id": "99b75528",
      "cricinfo_id": "308967",
      "cricinfo_name": "Jos Buttler",
      "player_name": "JC Buttler",
      "full_name": "Joseph Charles Buttler",
      "role": "Wicketkeeper Batter",
      "gender": "male",
      "country": "England",
      "img_url": "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/383100/383143.1.png"
  },
  {
      "player_id": "5d2eda89",
      "cricinfo_id": "597806",
      "cricinfo_name": "Smriti Mandhana",
      "player_name": "S Mandhana",
      "full_name": "Smriti Shriniwas Mandhana",
      "role": "Opening Batter",
      "gender": "female",
      "country": "India",
      "img_url": "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/320600/320632.1.png"
  },
  {
      "player_id": "740742ef",
      "cricinfo_id": "34102",
      "cricinfo_name": "Rohit Sharma",
      "player_name": "RG Sharma",
      "full_name": "Rohit Gurunath Sharma",
      "role": "Top order Batter",
      "gender": "male",
      "country": "India",
      "img_url": "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/385800/385819.2.png"
  },
  {
      "player_id": "be150fc8",
      "cricinfo_id": "275487",
      "cricinfo_name": "Ellyse Perry",
      "player_name": "EA Perry",
      "full_name": "Ellyse Alexandra Perry",
      "role": "Allrounder",
      "gender": "female",
      "country": "Australia",
      "img_url": "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/320100/320130.1.png"
  },
]

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 mb-12">
        {/* <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Stats that Reflect the Game Today.
        </h1> */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
        Stats that Reflect the <span className="text-[#cb344d]">Game</span> Today.
        </h1>


        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore advanced cricket metrics based on the last five years of international matches.
            Understand player performance where it matters most — in today’s fast-evolving game.
        </p>
        {/* <Button>
          <Link href="/players">
            Explore Players
          </Link>
        </Button> */}
      </section>

      {/* Featured Players */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Top Searches</h2>
        <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 gap-6">
          {/* Example static player cards */}
          {players.map((player, idx) => (
            <Link
                key={idx}
                href={`/player/${player.player_id}?country=${player.country}&gender=${player.gender}`}
                className="border rounded-lg bg-[#f8f8f8] p-4 hover:border-accent-foreground hover:shadow-md active:border-accent-foreground transition"
            >
                <Image
                src={player.img_url}
                alt={player.cricinfo_name}
                width={150}
                height={150}
                className="rounded-md mx-auto mb-2"
                />
                <p className="text-center font-medium">{player.cricinfo_name}</p>
            </Link>
            ))}
        </div>
      </section>

      {/* Optional: Stat Highlights or Match Insights */}
      {/* You can render stat cards or charts here later */}
    </main>
  )
}
