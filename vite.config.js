import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// IMPORTANT (GitHub Pages):
// For a PROJECT site served at https://<user>.github.io/<repo>/, `base` must be
// "/<repo>/". Set it via an env var so the same code deploys anywhere without edits.
//   - Local dev / user-or-org root site (user.github.io): base = "/"
//   - Project site: set VITE_BASE="/adventures-kashmir/" (the workflow does this)
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
