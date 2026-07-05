// Shared Framer Motion presets so animation feels consistent site-wide.
// Import these instead of re-declaring variants in every component.
//
// Motion philosophy: quiet and expensive. Short travel (≤18px), a single
// gentle ease-out, and a light stagger so grids resolve as a wave rather than
// a burst. Global reduced-motion is honoured via <MotionConfig reducedMotion
// ="user"> in main.jsx, so these variants don't each need to branch.

export const EASE = [0.22, 1, 0.36, 1] // "premium" ease-out

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
}

// Cards: a whisper of scale reads as "lifting into place" without bounce.
export const fadeScale = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
}

// Parent that reveals children one after another on scroll into view.
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

// Spread onto a motion element to reveal once when it scrolls into view.
export const revealOnScroll = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-80px' },
}
