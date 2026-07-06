/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from 'react'
import { usePersistentState } from '@/lib/storage'

// Favorites = a list of package slugs persisted to localStorage. Slugs (not full
// objects) are stored so the source of truth stays the catalog — if package data
// changes, favorites reflect it automatically. Backend migration: back
// usePersistentState with an API and this context is unchanged.
const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = usePersistentState('ak:favorites', [])

  const isFavorite = useCallback((slug) => favorites.includes(slug), [favorites])
  const toggleFavorite = useCallback(
    (slug) => setFavorites((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
    [setFavorites],
  )
  const removeFavorite = useCallback((slug) => setFavorites((prev) => prev.filter((s) => s !== slug)), [setFavorites])
  const clearFavorites = useCallback(() => setFavorites([]), [setFavorites])

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites, count: favorites.length }),
    [favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites],
  )
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
