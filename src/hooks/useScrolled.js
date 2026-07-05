import { useEffect, useState } from 'react'

// Returns true once the page has scrolled past `threshold` px.
// Drives the navbar's transparent → solid transition. Uses a passive listener
// and only flips state on the boundary crossing to avoid re-render churn.
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
