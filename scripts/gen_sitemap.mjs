// Generates public/sitemap.xml and public/robots.txt at build time (prebuild).
//
// EVERY public route is enumerated from the data files themselves — packages,
// adventures, destinations and blog articles are imported, not hardcoded and not
// regex-scraped. Adding a package, adventure, destination or article to its data
// file therefore extends the sitemap on the next build with no edits here.
//
// The data modules use the `@/` alias and import lucide-react, so they are loaded
// through Vite's own module runner (ssrLoadModule). That means this script and
// the app always agree about what exists.
//
// Config via env (with sensible defaults):
//   VITE_SITE_URL  origin of the deployed site (e.g. https://adventureskashmir.com)
//   VITE_BASE      base path (e.g. "/adventures-kashmir/"); default "/"
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createServer } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://adventureskashmir.example').replace(/\/$/, '')
const BASE = (process.env.VITE_BASE || '/').replace(/\/?$/, '/')
const origin = `${SITE_URL}${BASE}`.replace(/\/$/, '')

// Routes deliberately kept out of the index. They are real, reachable pages but
// carry no crawlable value (per-visitor state).
//   favorites — localStorage-backed; different for every visitor
// Search is a modal, not a route, so there is nothing to exclude for it.
// The 404 route ('*') is excluded entirely: it must never appear in a sitemap.
const NOINDEX_ROUTES = ['favorites']

const today = new Date().toISOString().slice(0, 10)

async function loadData() {
  const server = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'silent',
    optimizeDeps: { noDiscovery: true, include: [] },
  })
  try {
    const [catalog, adventures, destinations, blog] = await Promise.all([
      server.ssrLoadModule('/src/data/catalog/index.js'),
      server.ssrLoadModule('/src/data/adventures.js'),
      server.ssrLoadModule('/src/data/destinationGuides.js'),
      server.ssrLoadModule('/src/data/blog.js'),
    ])
    return { catalog, adventures, destinations, blog }
  } finally {
    await server.close()
  }
}

const { catalog, adventures, destinations, blog } = await loadData()

// ── Enumerate every indexable route, entirely from data ──────────────────────
const entry = (path, priority, changefreq, lastmod = today) => ({ path, priority, changefreq, lastmod })

const routes = [
  // Core pages
  entry('', '1.0', 'weekly'),
  entry('about', '0.7', 'yearly'),
  entry('contact', '0.7', 'yearly'),
  entry('faq', '0.6', 'monthly'),

  // Section landings
  entry('packages', '0.9', 'weekly'),
  entry('packages/custom', '0.7', 'monthly'),
  entry('adventures', '0.9', 'monthly'),
  entry('destinations', '0.9', 'monthly'),
  entry('gallery', '0.7', 'monthly'),
  entry('blogs', '0.8', 'weekly'),
]

// Package category collections. The catalog's own category list is the source of
// truth; 'custom' has a bespoke static route, added above.
for (const c of catalog.categories) {
  if (c.slug === 'custom') continue
  routes.push(entry(`packages/${c.slug}`, '0.8', 'weekly'))
}

// Package detail pages
for (const p of catalog.allPackages) {
  routes.push(entry(`packages/${p.category}/${p.slug}`, '0.8', 'weekly'))
}

// Adventure detail pages
for (const a of adventures.activities) {
  routes.push(entry(`adventures/${a.slug}`, '0.7', 'monthly'))
}

// Destination detail pages
for (const d of destinations.destinations) {
  routes.push(entry(`destinations/${d.slug}`, '0.7', 'monthly'))
}

// Blog articles — lastmod comes from the article's own publish date, so the
// sitemap tells crawlers the truth about freshness.
for (const post of blog.posts) {
  routes.push(entry(`blogs/${post.slug}`, '0.6', 'yearly', post.date))
}

// Safety net: never emit a noindex or 404 route, however it got in.
const indexable = routes.filter((r) => !NOINDEX_ROUTES.includes(r.path) && r.path !== '404')

// Guard against duplicate <loc> entries (a duplicate slug in data would be a bug).
const seen = new Set()
const unique = indexable.filter((r) => (seen.has(r.path) ? false : seen.add(r.path)))
if (unique.length !== indexable.length) {
  console.warn(`! ${indexable.length - unique.length} duplicate route(s) removed — check for duplicate slugs in the data files.`)
}

const loc = (path) => (path === '' ? `${origin}/` : `${origin}/${path}`)

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  unique
    .map(
      (r) =>
        `  <url>\n` +
        `    <loc>${loc(r.path)}</loc>\n` +
        `    <lastmod>${r.lastmod}</lastmod>\n` +
        `    <changefreq>${r.changefreq}</changefreq>\n` +
        `    <priority>${r.priority}</priority>\n` +
        `  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`

// robots.txt — allow everything crawlable, exclude the noindex routes and the
// gallery's ?photo= deep links (duplicates of /gallery; the page also emits a
// query-free canonical, so this is belt and braces).
const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  '# Per-visitor state - nothing stable to index',
  ...NOINDEX_ROUTES.map((r) => `Disallow: ${BASE}${r}`),
  '',
  '# Deep links into the gallery lightbox duplicate /gallery',
  'Disallow: /*?photo=',
  '',
  `Sitemap: ${origin}/sitemap.xml`,
  '',
].join('\n')

writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap)
writeFileSync(join(root, 'public', 'robots.txt'), robots)

console.log(
  `\u2713 sitemap.xml (${unique.length} URLs) + robots.txt written for ${origin}\n` +
    `  ${catalog.allPackages.length} packages \u00b7 ${adventures.activities.length} adventures \u00b7 ` +
    `${destinations.destinations.length} destinations \u00b7 ${blog.posts.length} articles \u00b7 ` +
    `${NOINDEX_ROUTES.length} noindex route(s) excluded`,
)
