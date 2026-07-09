import { useCallback } from 'react'
import { usePersistentState } from '@/lib/storage'

// Gallery favorites are photo IDs, persisted under their own key. They are kept
// deliberately separate from the package FavoritesContext ('ak:favorites'):
// that store holds package slugs and drives the /favorites page and its counter,
// so mixing photo IDs in would corrupt both. This reuses the same
// usePersistentState seam, so a future backend swap covers it too.
export function useGalleryFavorites() {
  const [ids, setIds] = usePersistentState('ak:gallery-favorites', [])

  const isSaved = useCallback((id) => ids.includes(id), [ids])
  const toggleSaved = useCallback(
    (id) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setIds],
  )

  return { saved: ids, isSaved, toggleSaved, count: ids.length }
}
