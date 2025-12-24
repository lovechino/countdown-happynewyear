'use client'
import { useEffect, useState } from 'react'

export default function Sparkles() {
  const [dots, setDots] = useState<number[]>([])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDots([...Array(40)].map((_, i) => i))
  }, [])

  return (
    <div className="sparkles">
      {dots.map(i => (
        <span key={i} />
      ))}
    </div>
  )
}
