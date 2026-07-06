import { useEffect, useState } from 'react'

// localStorage-backed React state. This is the single seam the whole "saved
// state" layer (favorites, compare) is built on. When a backend arrives, swap
// the read/write here for API calls (or hydrate initial state from the server)
// and every consumer keeps working unchanged.
//
// SSR/GitHub-Pages safe: guards `window`, tolerates disabled storage / bad JSON,
// and syncs across tabs via the native `storage` event.
export function usePersistentState(key, initial) {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return initial
    try {
      const raw = window.localStorage.getItem(key)
      return raw != null ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch {
      /* storage full or blocked — degrade gracefully */
    }
  }, [key, state])

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== key) return
      try {
        setState(e.newValue != null ? JSON.parse(e.newValue) : initial)
      } catch {
        /* ignore */
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key, initial])

  return [state, setState]
}
