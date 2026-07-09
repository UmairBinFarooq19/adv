// Shared date formatting. Kept as its own tiny module so article bylines, JSON-LD
// and any future listing all render dates identically. Takes an ISO date string.
export function formatDate(iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', opts)
}
