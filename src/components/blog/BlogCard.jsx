import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'
import { readingTime, getAuthor, getBlogCategory } from '@/data/blog'
import { formatDate } from '@/lib/date'

// BlogCard — one article in a grid. `variant="feature"` is the large, image-led
// treatment used for the featured article; the default is the standard card, in
// exactly the site's card language (rounded, soft shadow, hover-lift, blur-up
// Media, saffron accents). Reading time is computed from the article body, so it
// can never drift. Data-driven from one `post`.
export default function BlogCard({ post, variant = 'default', className }) {
  const to = `/blogs/${post.slug}`
  const author = getAuthor(post.author)
  const category = getBlogCategory(post.category)
  const mins = readingTime(post)

  const meta = (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{mins} min read</span>
    </span>
  )

  if (variant === 'feature') {
    return (
      <article className={cn('group relative isolate grid overflow-hidden rounded-4xl bg-surface shadow-soft ring-1 ring-line/80 transition-all duration-500 ease-premium hover:shadow-lift lg:grid-cols-2', className)}>
        <Link to={to} className="relative block aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full" aria-label={`${post.title} — read the article`}>
          <Media src={post.cover} alt="" className="h-full w-full" imgClassName="transition-transform duration-[900ms] ease-premium group-hover:scale-105" />
        </Link>
        <div className="flex flex-col justify-center p-8 lg:p-10">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-glacier-100 px-3 py-1 text-xs font-semibold text-pine-800">
            {category?.icon && <category.icon className="h-3.5 w-3.5 text-saffron-600" aria-hidden="true" />}
            {category?.label}
          </span>
          <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-pine-900 lg:text-3xl">
            <Link to={to} className="transition-colors hover:text-pine-700">{post.title}</Link>
          </h3>
          <p className="mt-3 leading-relaxed text-muted">{post.subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="flex items-center gap-3">
              <Media src={author.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full" />
              <span className="text-sm">
                <span className="block font-semibold text-pine-900">{author.name}</span>
                {meta}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-pine-900">
              Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className={cn('group flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-soft ring-1 ring-line/80 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift', className)}>
      <Link to={to} className="block aspect-[16/10] overflow-hidden" aria-label={`${post.title} — read the article`}>
        <Media src={post.cover} alt="" className="h-full w-full" imgClassName="transition-transform duration-700 ease-premium group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-glacier-100 px-2.5 py-1 text-xs font-semibold text-pine-800">
          {category?.icon && <category.icon className="h-3.5 w-3.5 text-saffron-600" aria-hidden="true" />}
          {category?.label}
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-pine-900">
          <Link to={to} className="transition-colors hover:text-pine-700">{post.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto pt-5">{meta}</div>
      </div>
    </article>
  )
}
