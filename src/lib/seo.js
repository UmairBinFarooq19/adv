import { useEffect } from 'react'

// Lightweight SEO for a Vite SPA (no react-helmet dependency). Sets the document
// title, meta description, canonical and OpenGraph/Twitter tags, and injects an
// optional JSON-LD block — so pages are OpenGraph- and schema-ready. Everything
// is cleaned up / overwritten on the next route, and tags are created on demand.
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

export function useSeo({ title, description, image, type = 'website', jsonLd } = {}) {
  useEffect(() => {
    const full = title ? `${title} · AdventuresKashmir` : 'AdventuresKashmir'
    document.title = full

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', image && new URL(image, window.location.origin).href)
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary')
    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)

    // Canonical
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', window.location.href)

    // JSON-LD structured data
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
  }, [title, description, image, type, jsonLd])
}
