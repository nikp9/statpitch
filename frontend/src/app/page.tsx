import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function HomePage() {
    const players = [
  {
    name: "Virat Kohli",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316600/316605.3.png",
    link: "/players/virat-kohli",
  },
  {
    name: "Rohit Sharma",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/385800/385819.2.png",
    link: "/players/rohit-sharma",
  },
  {
    name: "Bumrah",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/319900/319940.2.png",
    link: "/players/bumrah",
  },
  {
    name: "Rashid Khan",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/383200/383228.1.png",
    link: "/players/rashid-khan",
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
        <Button>
          <Link href="/players">
            Explore Players
          </Link>
        </Button>
      </section>

      {/* Featured Players */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Top Players</h2>
        <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 gap-6">
          {/* Example static player cards */}
          {players.map((player, idx) => (
            <Link
                key={idx}
                href={player.link}
                className="border rounded-lg bg-[#f8f8f8] p-4 hover:border-accent-foreground hover:shadow-md active:border-accent-foreground transition"
            >
                <Image
                src={player.image}
                alt={player.name}
                width={150}
                height={150}
                className="rounded-md mx-auto mb-2"
                />
                <p className="text-center font-medium">{player.name}</p>
            </Link>
            ))}
        </div>
      </section>

      {/* Optional: Stat Highlights or Match Insights */}
      {/* You can render stat cards or charts here later */}
    </main>
  )
}
