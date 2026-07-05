import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

// ─────────────────────────────────────────────────────────────────────────────
// Button — one component, three renderings:
//   • <Link>  when `to`   is passed (internal route)
//   • <a>     when `href` is passed (external link)
//   • <button> otherwise
// This keeps call sites uniform (<Button variant="primary">) regardless of
// whether the action navigates or fires a handler.
// ─────────────────────────────────────────────────────────────────────────────

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full ' +
  'transition-all duration-300 ease-premium focus-visible:outline-none ' +
  'disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap'

const variants = {
  primary:
    'bg-saffron-400 text-pine-950 hover:bg-saffron-300 shadow-soft hover:shadow-lift hover:-translate-y-0.5',
  solid:
    'bg-pine-800 text-white hover:bg-pine-700 shadow-soft hover:shadow-lift hover:-translate-y-0.5',
  outline:
    'border border-pine-800/25 text-pine-900 hover:border-pine-800 hover:bg-pine-800 hover:text-white',
  ghost: 'text-pine-900 hover:bg-pine-800/5',
  // On dark backgrounds (hero, footer).
  glass: 'glass text-white hover:bg-white/20',
}

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-7 py-3.5',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
