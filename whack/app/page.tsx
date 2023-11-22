"use client"
import Login from '@/components/Login'
import WhackAMole from '@/components/WhackAMole'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center self-center justify-between bg">
        <div className='absolute right-2/3 top-1/3'>
      <Login />
      </div>
      </div>
    </main>
  )
}
