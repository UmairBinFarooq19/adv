import { Section, SectionHeading } from '@/components/ui'
import { cn } from '@/lib/cn'

// Foundation scaffold: renders a real, styled section heading plus a grid of
// placeholder tiles. Each not-yet-built home section is a thin wrapper around
// this, so the page's full structure and rhythm are visible now and each
// section can be "filled in" independently later (see FeaturedPackages for the
// finished pattern). Delete the placeholder grid when you build the real one.
export default function SectionShell({
  eyebrow,
  title,
  lead,
  tone = 'default',
  columns = 3,
  items = 3,
  aspect = 'aspect-[4/3]',
  align = 'left',
}) {
  const colClass = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'grid-cols-2 lg:grid-cols-4' }[columns]

  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} align={align} />
      <div className={cn('mt-12 grid gap-6', colClass)}>
        {Array.from({ length: items }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'rounded-3xl border border-dashed',
              tone === 'pine' ? 'border-white/20 bg-white/5' : 'border-line bg-white/60',
              aspect,
            )}
          />
        ))}
      </div>
    </Section>
  )
}
