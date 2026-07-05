import { cn } from '@/lib/cn'

// ─────────────────────────────────────────────────────────────────────────────
// Card — a small composable set rather than one rigid component, so packages,
// destinations, blog posts and activities can all reuse the same shell while
// arranging their own contents.
//
//   <Card>
//     <Card.Image src={...} alt={...} badge="Bestseller" />
//     <Card.Body>
//       <Card.Eyebrow>Gulmarg</Card.Eyebrow>
//       <Card.Title>7-Day Ski Expedition</Card.Title>
//       <Card.Text>…</Card.Text>
//     </Card.Body>
//   </Card>
// ─────────────────────────────────────────────────────────────────────────────

function Card({ className, children, interactive = true, ...props }) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl bg-surface shadow-soft',
        interactive &&
          'transition-all duration-500 ease-premium hover:shadow-lift hover:-translate-y-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardImage({ src, alt = '', badge, ratio = 'aspect-[4/3]', className }) {
  return (
    <div className={cn('relative overflow-hidden', ratio, className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        />
      ) : (
        // Graceful placeholder until real photography is dropped in.
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-glacier-100 to-pine-100 text-pine-400">
          <span className="text-sm">Image</span>
        </div>
      )}
      {badge && (
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-pine-800 shadow-soft backdrop-blur">
          {badge}
        </span>
      )}
    </div>
  )
}

function CardBody({ className, children }) {
  return <div className={cn('p-6 sm:p-7', className)}>{children}</div>
}

function CardEyebrow({ className, children }) {
  return (
    <span className={cn('text-xs font-semibold uppercase tracking-widest text-saffron-600', className)}>
      {children}
    </span>
  )
}

function CardTitle({ className, children }) {
  return <h3 className={cn('mt-2 text-xl font-semibold text-pine-900', className)}>{children}</h3>
}

function CardText({ className, children }) {
  return <p className={cn('mt-2 text-sm leading-relaxed text-muted', className)}>{children}</p>
}

Card.Image = CardImage
Card.Body = CardBody
Card.Eyebrow = CardEyebrow
Card.Title = CardTitle
Card.Text = CardText

export default Card
