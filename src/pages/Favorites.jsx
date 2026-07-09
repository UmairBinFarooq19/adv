import { Heart, Trash2 } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import { Section } from '@/components/ui'
import Button from '@/components/ui/Button'
import PackageGrid from '@/components/packages/PackageGrid'
import { useFavorites } from '@/store/FavoritesContext'
import { getPackage } from '@/data/catalog'
import { useSeo } from '@/lib/seo'

// Saved packages, resolved from persisted slugs. Reuses PackageGrid so favorited
// cards behave exactly like anywhere else.
export default function Favorites() {
  const { favorites, clearFavorites, count } = useFavorites()
  const packages = favorites.map(getPackage).filter(Boolean)

  useSeo({ title: 'Your saved packages', description: 'Packages you’ve saved to revisit and compare.',
    // Per-visitor localStorage state: nothing stable for a crawler to index,
    // but links out to real packages, so 'follow' stays on.
    noindex: true,
  })

  return (
    <>
      <PageHeader eyebrow="Your list" title="Saved packages" lead="Everything you’ve hearted, in one place — ready to compare or enquire when you are." />
      <Section>
        {count > 0 ? (
          <>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-muted"><span className="font-semibold text-pine-900">{count}</span> saved</p>
              <button type="button" onClick={clearFavorites} className="inline-flex items-center gap-1.5 text-sm font-semibold text-pine-700 hover:text-red-600">
                <Trash2 className="h-4 w-4" /> Clear all
              </button>
            </div>
            <PackageGrid packages={packages} />
          </>
        ) : (
          <div className="grid place-items-center rounded-3xl border border-dashed border-line bg-surface/60 px-6 py-20 text-center">
            <Heart className="h-10 w-10 text-pine-300" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-semibold text-pine-900">No saved packages yet</h2>
            <p className="mt-2 max-w-sm text-muted">Tap the heart on any package to save it here for later.</p>
            <Button to="/packages" variant="primary" size="md" className="mt-6">Browse packages</Button>
          </div>
        )}
      </Section>
    </>
  )
}
