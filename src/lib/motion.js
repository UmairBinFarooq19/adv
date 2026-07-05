// Shared Framer Motion presets so animation feels consistent site-wide.
// Import these instead of re-declaring variants in every component.

export const EASE = [0.22, 1, 0.36, 1] // "premium" ease-out

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
}

// Parent that reveals children one after another on scroll into view.
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

// Spread onto a motion element to reveal once when it scrolls into view.
export const revealOnScroll = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-80px' },
}
