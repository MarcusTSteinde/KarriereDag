import WhackAMole from '@/components/WhackAMole'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center self-center justify-between bg">
      <WhackAMole></WhackAMole>
      </div>
    </main>
  )
}
