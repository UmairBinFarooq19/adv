# AdventuresKashmir

Premium Kashmir adventure & luxury travel website. React 19 + Vite + Tailwind, built as a scalable production foundation and ready to deploy to GitHub Pages.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Requires Node 18+ (Node 20 recommended).

## Tech stack

- **React 19** + **Vite 6** — fast dev server, optimized builds
- **Tailwind CSS 3** — all design tokens live in `tailwind.config.js`
- **React Router 7** — routing with route-level code splitting
- **Framer Motion** — shared animation presets in `src/lib/motion.js`
- **Lucide React** — icons

## Project structure

```
src/
├── assets/          # imported images & icons (see images/README.md)
├── components/
│   ├── ui/          # design-system primitives (Button, Card, Section…)
│   ├── layout/      # app shell: Navbar, TopBar, Footer, RootLayout
│   └── sections/    # page sections, grouped by page (sections/home/*)
├── data/            # site config & sample content (nav, socials, packages)
├── hooks/           # reusable hooks (useScrolled)
├── lib/             # utilities (cn) and motion presets
├── pages/           # one component per route (thin — compose sections)
├── routes/          # router config
└── styles/          # global CSS + semantic color tokens
```

### Why it's organized this way

- **`ui/` vs `sections/` vs `pages/`** — three clear layers. `ui` is generic and
  reusable, `sections` are page-specific compositions, `pages` just declare which
  sections appear and in what order. You always know where a change belongs.
- **`data/site.js` is the single source of truth** for nav, contact and social
  links. It's the natural seam to swap for a CMS/API later without touching JSX.
- **`@` path alias** (`@/components/...`) keeps imports stable when files move.

## Design system

Everything visual derives from `tailwind.config.js` + `src/styles/index.css`:

- **Colors** — `pine` (brand green), `saffron` (accent), `glacier` (secondary),
  plus semantic tokens (`surface`, `body`, `muted`, `line`) wired to CSS
  variables, so a rebrand/dark mode is a variable swap.
- **Type** — Fraunces (display) + Plus Jakarta Sans (body), with fluid
  `display-*` sizes.
- **Primitives** — `Button` (5 variants), `Card` (composable), `Section`
  (tones + rhythm), `Container`, `Eyebrow`, `SectionHeading`.
- **Signature** — `ContourDivider`, a topographic-line motif reused site-wide.
- **Motion** — presets (`fadeUp`, `stagger`, `revealOnScroll`) for consistency.
- **A11y floor** — visible focus rings, reduced-motion support, semantic landmarks.

## What's built vs scaffolded

**Built end-to-end:** design system, layout (nav/footer/top bar), routing, the
Home **Hero**, **Featured Packages**, and **Contact CTA**. The other eight home
sections and seven inner pages are clean, styled **scaffolds** — real headings
and structure, placeholder grids — so you fill each one in independently using
the finished patterns as a template.

## Deploying to GitHub Pages

1. Push to GitHub. In **Settings → Pages**, set **Source = GitHub Actions**.
2. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and
   deploys automatically, setting the correct base path from the repo name.
3. Deep links & refresh work via the SPA redirect (`public/404.html` +
   the handoff script in `index.html`).

**Root site** (`user.github.io`)? Set `pathSegmentsToKeep = 0` in
`public/404.html` and `VITE_BASE: "/"` in the workflow.

## Scaling later

Designed so a booking system, payments or CMS can be added without a redesign:
data lives behind `data/`, pages are thin compositions, and the `ui` layer is
framework-agnostic in spirit. Add a route in `src/routes/router.jsx`, a page in
`pages/`, and compose existing `ui` + `sections`.
