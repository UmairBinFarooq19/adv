import BlogGrid from './BlogGrid'
import { relatedPosts } from '@/data/blog'

// RelatedPosts — resolves related articles from the data (same category first,
// then shared tags, then recency) and reuses BlogGrid to render them, so related
// articles look identical to every other listing. Pass `posts` to override.
export default function RelatedPosts({ post, posts, count = 3, className }) {
  const items = posts ?? relatedPosts(post, count)
  if (!items.length) return null
  return <BlogGrid posts={items} columns={3} className={className} />
}
