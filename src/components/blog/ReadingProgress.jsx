import { useEffect, useState } from 'react'

// ReadingProgress — a slim saffron bar showing how far through the article you
// are. It reads scroll position against the document height on a rAF-throttled
// listener (passive), so it costs nothing measurable. Hidden from assistive tech
// (it is decorative; the article itself conveys the same information).
export default function ReadingProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setPct(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[80] h-1 bg-transparent">
      <div className="h-full bg-saffron-500 transition-[width] duration-150 ease-out" style={{ width: `${pct}%` }} />
    </div>
  )
}
