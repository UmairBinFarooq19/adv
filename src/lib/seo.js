import { useEffect } from 'react'

// Lightweight SEO for a Vite SPA (no react-helmet dependency). Sets the document
// title, meta description, canonical and OpenGraph/Twitter tags, robots
// directives, and injects an optional JSON-LD block — so pages are OpenGraph-
// and schema-ready. Everything is overwritten on the next route.
//
// The deployed origin comes from VITE_SITE_URL when set (the same variable the
// sitemap generator uses, so canonicals and <loc> entries always agree), and
// falls back to the current origin in development.
const SITE_URL = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '')

// Absolute URL for a path or relative asset. Schema and OpenGraph both require
// absolute URLs — relative ones are silently ignored by crawlers.
export function absoluteUrl(path = '') {
  const origin = SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
  if (!path) return origin || ''
  if (/^https?:\/\//.test(path)) return path
  return `${origin}${path.startsWith('/') ? '' : '/'}${path}`
}

// The canonical URL for the page currently displayed. Deliberately drops the
// query string and hash: /gallery?photo=p05 and /blogs/x#section are the same
// document as /gallery and /blogs/x, and self-canonicalising the variants would
// split ranking signals across duplicates.
export function canonicalUrl() {
  if (typeof window === 'undefined') return ''
  const origin = SITE_URL || window.location.origin
  const path = window.location.pathname.replace(/\/+$/, '')
  // The site root canonicalises to `origin/`, matching the sitemap's <loc>.
  return path ? `${origin}${path}` : `${origin}/`
}

// Convenience builder for a BreadcrumbList node. `items` is [{ name, path }];
// the last item is the current page and needs no path.
export function breadcrumbLd(items = []) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.path != null ? { item: absoluteUrl(item.path) } : {}),
    })),
  }
}

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useSeo({ title, description, image, type = 'website', jsonLd, noindex = false } = {}) {
  useEffect(() => {
    const full = title ? `${title} · AdventuresKashmir` : 'AdventuresKashmir'
    document.title = full

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', canonicalUrl())
    setMeta('property', 'og:site_name', 'AdventuresKashmir')
    setMeta('property', 'og:image', image && absoluteUrl(image))
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary')
    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image && absoluteUrl(image))

    // Robots. Pages carrying per-visitor state opt out of indexing but still let
    // crawlers follow their links.
    let robots = document.head.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', noindex ? 'noindex, follow' : 'index, follow')

    // Canonical (query- and hash-free)
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonicalUrl())

    // JSON-LD structured data (page-level; the site-wide Organization and WebSite
    // nodes live in index.html and are never removed).
    let script = document.getElementById('ld-json')
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = 'ld-json'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    } else if (script) {
      script.remove()
    }
  }, [title, description, image, type, jsonLd, noindex])
}
