'use client'
import { useEffect, useRef } from 'react'

export default function FireworksCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    c.width = innerWidth
    c.height = innerHeight

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ps: any[] = []

    function boom() {
      const x = Math.random() * c.width
      const y = Math.random() * c.height * 0.5
      for (let i = 0; i < 80; i++) {
        ps.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 80,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, c.width, c.height)
      ps.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life--
        ctx.fillStyle = `hsl(${Math.random() * 360},100%,60%)`
        ctx.fillRect(p.x, p.y, 3, 3)
        if (p.life <= 0) ps.splice(i, 1)
      })
      requestAnimationFrame(draw)
    }

    setInterval(boom, 600)
    draw()
  }, [])

  return <canvas ref={ref} className="fixed inset-0 z-10" />
}
