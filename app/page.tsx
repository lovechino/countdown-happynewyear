'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import FireworksBackground from '@/components/FireworksBackground'
import FestivalBackground from '@/components/FestivalBackground'
import FestivalParticles from '@/components/FestivalParticles'
import NewYearAudio from '@/components/NewYearSound'
import FireworksCanvas from '@/components/FireworksCanvas'
import FloatingOrbs from '@/components/FloatingOrbs'
import Sparkles from '@/components/Sparkles'


const Countdown3D = dynamic(
  () => import('@/components/Countdown3D'),
  { ssr: false }
)

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Page() {
  const [seconds, setSeconds] = useState<number>(60)
  const [isNewYear, setIsNewYear] = useState<boolean>(false)

  // Nhận tick mỗi giây từ Countdown
  const handleTick = (t: TimeLeft) => {
    setSeconds(t.seconds)

    const finished =
      t.days === 0 &&
      t.hours === 0 &&
      t.minutes === 0 &&
      t.seconds === 0

    if (finished) setIsNewYear(true)
  }

  return (
    <main className="center">
      {/* BACKGROUND */}
      <FestivalBackground />
      <FireworksCanvas />
      <div className="neon-bg">

        <FloatingOrbs />
        <Sparkles />

        <FireworksBackground /> 
        <FestivalParticles />
      </div>

      {/* FIREWORKS */}
      {/* {isNewYear && <FireworksCanvas />} */}

      {/* UI */}
      <div className="glass">
        <h1>🎉 Happy New Year 🎉</h1>

        <Countdown3D />
      </div>

      {/* AUDIO (phải nằm ngoài glass để không bị blur) */}
      <NewYearAudio
        seconds={seconds}
        isNewYear={isNewYear}
      />
    </main>
  )
}
