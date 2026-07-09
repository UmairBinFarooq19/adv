import { useEffect, useState } from 'react'
import { List } from 'lucide-react'
import { cn } from '@/lib/cn'

// TableOfContents — built from the article's h2 blocks (never hand-maintained).
// An IntersectionObserver highlights the section currently in view and sets
// aria-current, so the ToC is useful to sighted and screen-reader users alike.
// Anchors are real links, so they work without JS and are shareable.
export default function TableOfContents({ items = [], className }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    if (!items.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null

  return (
    <nav aria-label="Table of contents" className={cn('rounded-3xl border border-line bg-surface p-6 shadow-soft', className)}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
        <List className="h-4 w-4" aria-hidden="true" /> On this page
      </p>
      <ol className="mt-4 space-y-1 border-l border-line">
        {items.map(({ id, text }) => {
          const current = active === id
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={current ? 'location' : undefined}
                className={cn(
                  '-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors',
                  current ? 'border-saffron-500 font-semibold text-pine-900' : 'border-transparent text-muted hover:border-pine-300 hover:text-pine-800',
                )}
              >
                {text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
