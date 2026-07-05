# Images

Local, imported image assets (hero shots, package/destination photography).

**When to put an image here vs `public/`:**
- **`src/assets/images/`** — images referenced from components via `import`.
  Vite fingerprints and optimizes them. Use for most photography.
  ```jsx
  import gulmarg from '@/assets/images/gulmarg-hero.jpg'
  <Card.Image src={gulmarg} alt="Gulmarg slopes" />
  ```
- **`public/`** — images referenced by a stable path (favicon, og-image,
  anything a third party links to). Not processed by Vite.

**Conventions**
- Prefer `.webp`/`.avif` for photos; keep hero images ≤ ~300 KB.
- Name by subject + role: `gulmarg-ski-hero.webp`, `pahalgam-lidder-card.webp`.
