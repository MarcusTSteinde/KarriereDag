import WhackAMole from '@/components/WhackAMole'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WhackAMole></WhackAMole>

      <Link href="/highscores">
        <p className="text-blue-500 hover:underline cursor-pointer">View High Scores</p>
      </Link>
    </main>
  )
}
