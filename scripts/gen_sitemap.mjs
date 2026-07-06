// Generates public/sitemap.xml and public/robots.txt at build time.
//
// Package URLs are enumerated by reading the catalog source files, so adding a
// package (a data-only change) automatically extends the sitemap on the next
// build — no edits here required.
//
// Config via env (with sensible defaults):
//   VITE_SITE_URL  origin of the deployed site (e.g. https://you.github.io)
//   VITE_BASE      base path (e.g. "/adventures-kashmir/"); default "/"
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const catalogDir = join(root, 'src', 'data', 'catalog')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://adventureskashmir.example').replace(/\/$/, '')
const BASE = (process.env.VITE_BASE || '/').replace(/\/?$/, '/')
const origin = `${SITE_URL}${BASE}`.replace(/\/$/, '')

// Map catalog file -> category slug (matches the data files' `category` field).
const FILE_CATEGORY = { 'kashmir.js': 'kashmir', 'skiing.js': 'skiing', 'trekking.js': 'trekking', 'ladakh.js': 'leh-ladakh' }

const packageUrls = []
for (const file of readdirSync(catalogDir)) {
  const category = FILE_CATEGORY[file]
  if (!category) continue
  const src = readFileSync(join(catalogDir, file), 'utf8')
  for (const m of src.matchAll(/slug:\s*'([^']+)'/g)) {
    packageUrls.push(`packages/${category}/${m[1]}`)
  }
}

const staticRoutes = [
  '', 'about', 'packages', 'packages/custom', 'packages/kashmir', 'packages/skiing',
  'packages/trekking', 'packages/leh-ladakh', 'adventures', 'destinations', 'gallery',
  'blogs', 'contact', 'favorites', 'faq',
]

const all = [...staticRoutes, ...packageUrls]
const today = new Date().toISOString().slice(0, 10)

const url = (path) => {
  const loc = `${origin}/${path}`.replace(/\/$/, path === '' ? '/' : '')
  const priority = path === '' ? '1.0' : path.startsWith('packages/') && path.split('/').length === 3 ? '0.8' : '0.6'
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
}

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  all.map(url).join('\n') +
  `\n</urlset>\n`

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`

writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap)
writeFileSync(join(root, 'public', 'robots.txt'), robots)
console.log(`✓ sitemap.xml (${all.length} URLs) + robots.txt written for ${origin}`)
