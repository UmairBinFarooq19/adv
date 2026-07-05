import { cn } from '@/lib/cn'

// Small tracked-out label above headings. The short saffron rule ties it to
// the brand accent and gives sections a consistent, editorial entry point.
export default function Eyebrow({ className, children }) {
  return (
    <span className={cn('eyebrow', className)}>
      <span className="h-px w-6 bg-saffron-500" aria-hidden="true" />
      {children}
    </span>
  )
}
