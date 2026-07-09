import BlogCard from './BlogCard'
import { cn } from '@/lib/cn'

// BlogGrid — a responsive grid of BlogCards with an honest empty state. Column
// count is a prop so the same grid serves the landing (3-up), the sidebar-paired
// listing (2-up) and related posts. Data-driven; owns no article content.
const cols = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
}

export default function BlogGrid({ posts = [], columns = 3, emptyMessage = 'No articles match these filters yet.', className }) {
  if (!posts.length) {
    return <p className="rounded-3xl border border-dashed border-line py-16 text-center text-muted">{emptyMessage}</p>
  }
  return (
    <div className={cn('grid grid-cols-1 gap-6 lg:gap-8', cols[columns], className)}>
      {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
    </div>
  )
}
