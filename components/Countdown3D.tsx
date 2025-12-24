'use client'

import { useEffect, useState, useRef } from 'react'

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const TARGET = new Date('2026-01-01T00:00:00+07:00').getTime()

function calc(): TimeLeft {
  const diff = Math.max(TARGET - Date.now(), 0)
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown3D() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState<TimeLeft | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    setTime(calc())

    const id = setInterval(() => {
      setTime(calc())
    }, 1000)

    return () => clearInterval(id)
  }, [])

  // ⛔ QUAN TRỌNG: chặn SSR render
  if (!mounted || !time) return null

  return (
    <div className="countdown">
      {(['days', 'hours', 'minutes', 'seconds'] as const).map((k) => (
        <div key={k} className="card">
          <div className="flip">{String(time[k]).padStart(2, '0')}</div>
          <span>{k}</span>
        </div>
      ))}
    </div>
  )
}
