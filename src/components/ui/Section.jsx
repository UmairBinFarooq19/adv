import { cn } from '@/lib/cn'
import Container from './Container'

// Vertical rhythm primitive: standard section padding + optional tone.
// `tone` swaps the surface so alternating sections read as distinct bands
// without each section hardcoding its own background.
const tones = {
  default: 'bg-background text-body',
  surface: 'bg-white text-body',
  pine: 'bg-gradient-pine text-white',
  glacier: 'bg-glacier-50 text-body',
}

export default function Section({
  tone = 'default',
  container = true,
  className,
  containerClassName,
  children,
  ...props
}) {
  return (
    <section className={cn('py-section', tones[tone], className)} {...props}>
      {container ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  )
}
