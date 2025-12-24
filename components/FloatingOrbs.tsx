'use client'
export default function FloatingOrbs() {
  return (
    <div className="orbs">
      {[...Array(8)].map((_, i) => (
        <span key={i} />
      ))}
    </div>
  )
}
