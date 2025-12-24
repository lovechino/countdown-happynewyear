'use client'

export default function FestivalBackground() {
  return (
    <div className="festival-bg">
      {Array.from({ length: 80 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  )
}
