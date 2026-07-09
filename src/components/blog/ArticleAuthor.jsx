import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'

// ArticleAuthor — the author byline. `variant="inline"` is the compact form used
// under an article title; `variant="card"` is the fuller bio block placed at the
// end of an article. Data-driven from one `author`; reuses the blur-up Media.
export default function ArticleAuthor({ author, variant = 'inline', className }) {
  if (!author) return null

  if (variant === 'card') {
    return (
      <aside className={cn('flex flex-col gap-5 rounded-4xl border border-line bg-surface p-7 shadow-soft sm:flex-row sm:items-center', className)}>
        <Media src={author.avatar} alt="" className="h-20 w-20 shrink-0 rounded-full" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Written by</p>
          <p className="mt-1 font-display text-xl font-semibold text-pine-900">{author.name}</p>
          <p className="text-sm font-medium text-saffron-600">{author.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{author.bio}</p>
        </div>
      </aside>
    )
  }

  return (
    <span className={cn('flex items-center gap-3', className)}>
      <Media src={author.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full" />
      <span className="text-sm">
        <span className="block font-semibold text-pine-900">{author.name}</span>
        <span className="block text-muted">{author.role}</span>
      </span>
    </span>
  )
}
