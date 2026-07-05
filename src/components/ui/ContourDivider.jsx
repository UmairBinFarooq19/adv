import { cn } from '@/lib/cn'

// ─────────────────────────────────────────────────────────────────────────────
// SIGNATURE ELEMENT — topographic contour lines.
// Evokes elevation maps and expedition planning: the "National Geographic
// Expeditions" energy the brief asks for. Reused site-wide (section seams,
// hero texture) so the brand has one recognizable, unmistakable mark.
//
// Purely decorative → aria-hidden. Color is inherited via `currentColor`, so
// place it on any tone (dark hero, light section) and set text-* to tint it.
// ─────────────────────────────────────────────────────────────────────────────

export default function ContourDivider({ className, opacity = 0.5 }) {
  return (
    <svg
      className={cn('block w-full', className)}
      viewBox="0 0 1440 120"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.25" fill="none" opacity={opacity}>
        <path d="M0 96 C 240 60, 480 60, 720 90 S 1200 120, 1440 84" />
        <path d="M0 72 C 240 40, 480 44, 720 70 S 1200 96, 1440 60" opacity="0.8" />
        <path d="M0 48 C 240 22, 480 28, 720 50 S 1200 72, 1440 38" opacity="0.6" />
        <path d="M0 26 C 240 8, 480 14, 720 30 S 1200 50, 1440 18" opacity="0.4" />
      </g>
    </svg>
  )
}
