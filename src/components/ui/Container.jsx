import { cn } from '@/lib/cn'

// Horizontal layout primitive: centers content and applies consistent gutters.
// Every section wraps its content in <Container> so page margins never drift.
export default function Container({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag className={cn('container', className)} {...props}>
      {children}
    </Tag>
  )
}
