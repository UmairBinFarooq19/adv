/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from 'react'
import { usePersistentState } from '@/lib/storage'

// Compare = up to MAX package slugs, persisted. Same slug-based approach as
// favorites. `canAdd` lets the UI disable the control once the tray is full.
const CompareContext = createContext(null)
const MAX = 4

export function CompareProvider({ children }) {
  const [compare, setCompare] = usePersistentState('ak:compare', [])

  const isComparing = useCallback((slug) => compare.includes(slug), [compare])
  const toggleCompare = useCallback(
    (slug) =>
      setCompare((prev) => {
        if (prev.includes(slug)) return prev.filter((s) => s !== slug)
        if (prev.length >= MAX) return prev // ignore beyond max
        return [...prev, slug]
      }),
    [setCompare],
  )
  const removeCompare = useCallback((slug) => setCompare((prev) => prev.filter((s) => s !== slug)), [setCompare])
  const clearCompare = useCallback(() => setCompare([]), [setCompare])

  const value = useMemo(
    () => ({ compare, isComparing, toggleCompare, removeCompare, clearCompare, count: compare.length, canAdd: compare.length < MAX, max: MAX }),
    [compare, isComparing, toggleCompare, removeCompare, clearCompare],
  )
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within CompareProvider')
  return ctx
}
