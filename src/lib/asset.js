// Build a base-path-aware URL for files in /public.
// Under GitHub Pages the site is served from /<repo>/, so a bare "/images/x.svg"
// would 404. Prefixing Vite's BASE_URL keeps public assets resolving everywhere.
//   asset('images/hero-1.svg') -> '/adventures-kashmir/images/hero-1.svg'
export const asset = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`
