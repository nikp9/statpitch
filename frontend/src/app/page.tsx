import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Smarter Cricket Stats, Instantly.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Analyze every delivery. Compare players across eras. Dive deep into advanced performance metrics designed for the modern game.
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {/* Example static player cards */}
          {['Virat Kohli', 'Rohit Sharma', 'Bumrah', 'Rashid Khan'].map((name, idx) => (
            <Link
              key={idx}
              href={`/players/${name.toLowerCase().replace(/\s/g, '-')}`}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <Image
                src={`/players/${name.toLowerCase().replace(/\s/g, '-')}.jpg`}
                alt={name}
                width={150}
                height={150}
                className="rounded-md mx-auto mb-2"
              />
              <p className="text-center font-medium">{name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Optional: Stat Highlights or Match Insights */}
      {/* You can render stat cards or charts here later */}
    </main>
  )
}
