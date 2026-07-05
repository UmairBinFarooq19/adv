// ─────────────────────────────────────────────────────────────────────────────
// Package catalog — single entry point.
//
// Pages and components import ONLY from here. To add a package you edit one of
// the category data files; to add a whole category you add a file + one line
// below. No component needs to change.
// ─────────────────────────────────────────────────────────────────────────────
import { kashmirPackages } from './kashmir'
import { skiingPackages } from './skiing'
import { trekkingPackages } from './trekking'
import { ladakhPackages } from './ladakh'
import { filterGroups } from './filters'

export { categories, getCategory } from './categories'
export { filterGroups } from './filters'

// Order here is the order categories are concatenated for "all packages" views.
export const allPackages = [
  ...kashmirPackages,
  ...skiingPackages,
  ...trekkingPackages,
  ...ladakhPackages,
]

export const getByCategory = (slug) => allPackages.filter((p) => p.category === slug)
export const getPackage = (slug) => allPackages.find((p) => p.slug === slug)

// Related: same category first, topped up from other categories if needed.
export const getRelated = (pkg, n = 3) => {
  if (!pkg) return []
  const same = allPackages.filter((p) => p.category === pkg.category && p.slug !== pkg.slug)
  const others = allPackages.filter((p) => p.category !== pkg.category)
  return [...same, ...others].slice(0, n)
}

// A curated set for the landing "Featured" strip.
const FEATURED = ['7-days-kashmir', 'ski-advanced', 'great-lakes-trek', 'pangong-lake', 'kashmir-luxury', 'nubra-valley']
export const featuredPackages = FEATURED.map(getPackage).filter(Boolean)

// Price range for filter UI / display.
export const priceBounds = allPackages.reduce(
  (acc, p) => ({ min: Math.min(acc.min, p.priceFrom), max: Math.max(acc.max, p.priceFrom) }),
  { min: Infinity, max: 0 },
)

// Format a rupee amount consistently everywhere.
export const formatPrice = (n) => `₹${Number(n).toLocaleString('en-IN')}`

// Apply a { groupId: Set|array of values } selection + text query to a list.
// Within a group, options are OR'd; across groups they're AND'd (standard facet
// behaviour). An empty selection returns everything.
export function applyFilters(list, selected = {}, query = '') {
  const q = query.trim().toLowerCase()
  return list.filter((pkg) => {
    if (q) {
      const hay = `${pkg.title} ${pkg.location} ${pkg.summary}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    return filterGroups.every((group) => {
      const picked = Array.from(selected[group.id] ?? [])
      if (picked.length === 0) return true
      return group.options
        .filter((o) => picked.includes(o.value))
        .some((o) => o.match(pkg))
    })
  })
}
