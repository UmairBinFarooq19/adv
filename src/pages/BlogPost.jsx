import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ArticleLayout from '@/components/blog/ArticleLayout'
import NotFound from '@/pages/NotFound'
import { getPost, getAuthor, readingTime } from '@/data/blog'
import { useSeo } from '@/lib/seo'

// Route: /blogs/:slug. Validates the slug against the data, then renders the one
// reusable ArticleLayout template. SEO emits an Article + BreadcrumbList schema
// graph; canonical, OpenGraph and Twitter tags come from the shared useSeo hook.
export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  const author = post ? getAuthor(post.author) : null

  const jsonLd = useMemo(() => {
    if (!post) return undefined
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: post.cover,
          datePublished: post.date,
          dateModified: post.date,
          author: { '@type': 'Person', name: author?.name, jobTitle: author?.role },
          publisher: { '@type': 'Organization', name: 'AdventuresKashmir' },
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          articleSection: post.category,
          keywords: post.tags.join(', '),
          timeRequired: `PT${readingTime(post)}M`,
          wordCount: post.body.reduce((n, b) => n + ((b.text ?? b.items?.join(' ') ?? '').split(/\s+/).filter(Boolean).length), 0),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
            { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${origin}/blogs` },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
          ],
        },
      ],
    }
  }, [post, author])

  useSeo({
    title: post ? post.title : 'Article not found',
    description: post?.excerpt,
    image: post?.cover,
    type: 'article',
    jsonLd,
  })

  if (!post) return <NotFound />
  return <ArticleLayout post={post} />
}
