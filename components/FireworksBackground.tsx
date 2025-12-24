'use client'
import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
}

export default function FireworksBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const colors = ['#ff00cc', '#3333ff', '#ffcc00', '#00ffaa']

    const spawn = () => {
      const x = Math.random() * w
      const y = Math.random() * h * 0.6

      for (let i = 0; i < 20; i++) {
        particles.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 60,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)

      particles.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life--

        ctx.globalAlpha = p.life / 60
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      particles.current = particles.current.filter(p => p.life > 0)

      requestAnimationFrame(tick)
    }

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)

    const interval = setInterval(spawn, 900)
    tick()

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
    />
  )
}
