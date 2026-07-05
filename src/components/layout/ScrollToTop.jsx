import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// SPA quirk: navigating between routes keeps the previous scroll position.
// This resets to the top on every path change (but not on #hash jumps, which
// should scroll to their target).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])
  return null
}
