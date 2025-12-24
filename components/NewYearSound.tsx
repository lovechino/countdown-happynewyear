'use client'
import { Howl } from 'howler'
import { useEffect, useRef, useState } from 'react'

type Props = {
  seconds: number
  isNewYear: boolean
}

export default function NewYearSound({ seconds, isNewYear }: Props) {
  const [started, setStarted] = useState(false) // đã click start chưa
  const [enabled, setEnabled] = useState(true)  // bật / tắt âm

  const tick = useRef<Howl | null>(null)
  const countdown = useRef<Howl | null>(null)
  const celebrate = useRef<Howl | null>(null)

  // INIT SOUND (chỉ gọi sau click)
  const initSound = () => {
    if (tick.current) return

    tick.current = new Howl({
      src: ['/Clock Ticking Sound Effect.f251.mp3'],
      volume: 0.5,
      html5: false,
      onend: () => tick.current?.play(), // loop không delay
    })

    countdown.current = new Howl({
      src: ['/10 Second Happy New Year Countdown Timer 2026.f251-12.webm'],
      volume: 1,
    })

    celebrate.current = new Howl({
      src: ['/happy-new-year-lyrics.mp3'],
      volume: 1,
    })
  }

  // CLICK START EXPERIENCE
  const startExperience = () => {
    initSound()
    setStarted(true)
    setEnabled(true)
    tick.current?.play()
  }

  // TOGGLE SOUND
  const toggleSound = () => {
    if (!enabled) {
      tick.current?.play()
    } else {
      tick.current?.stop()
      countdown.current?.stop()
      celebrate.current?.stop()
    }
    setEnabled(!enabled)
  }

  // LOGIC THEO COUNTDOWN
  useEffect(() => {
    if (!started || !enabled) return

    // >10s: ticking
    if (seconds > 10 && !isNewYear) {
      if (!tick.current?.playing()) tick.current?.play()
    }

    // 10 -> 1
    if (seconds <= 10 && seconds > 0) {
      tick.current?.stop()
      if (!countdown.current?.playing()) countdown.current?.play()
    }

    // 0:00 🎆
    if (isNewYear) {
      tick.current?.stop()
      countdown.current?.stop()
      celebrate.current?.play()
    }
  }, [seconds, isNewYear, started, enabled])

  return (
    <>
      {/* START BUTTON (BẮT BUỘC để browser cho phép audio) */}
      {!started && (
        <button
          onClick={startExperience}
          style={btnStyle}
        >
          🎆 Start New Year Experience
        </button>
      )}

      {/* TOGGLE SOUND */}
      {started && (
        <button
          onClick={toggleSound}
          style={{ ...btnStyle, bottom: 80 }}
        >
          {enabled ? '🔊 Sound ON' : '🔇 Sound OFF'}
        </button>
      )}
    </>
  )
}

const btnStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  zIndex: 99,
  padding: '12px 18px',
  borderRadius: 30,
  border: 'none',
  background: 'linear-gradient(135deg,#ff00cc,#3333ff)',
  color: '#fff',
  fontSize: 14,
  cursor: 'pointer',
  boxShadow: '0 10px 30px rgba(0,0,0,.4)',
}
