'use client'
import { useEffect, useRef } from 'react'

export default function FestivalParticles() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    c.width = innerWidth
    c.height = innerHeight

    const ps = Array.from({ length: 150 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 2 + 1,
      vy: Math.random() * 0.6 + 0.2,
      color: `hsla(${Math.random() * 60 + 20},100%,70%,0.7)`
    }))

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.12)'
      ctx.fillRect(0, 0, c.width, c.height)

      ps.forEach(p => {
        p.y -= p.vy
        if (p.y < 0) p.y = c.height
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })
      requestAnimationFrame(draw)
    }
    draw()
  }, [])

  return <canvas ref={ref} className="fixed inset-0 -z-2" />
}
