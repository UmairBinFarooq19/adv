import { useState } from 'react'
import { cn } from '@/lib/cn'

// Image with a built-in loading experience: a soft shimmer (or a blurred LQIP
// if you pass `placeholder`) shows until the real image decodes, then it fades
// in. Lazy by default; pass `eager` for above-the-fold images (hero) to prime
// the LCP. Drop-in for <img>: the wrapper takes the sizing classes, the inner
// <img> fills it. When you add real photos, optionally pass a tiny base64
// `placeholder` for true blur-up — everything else already works.
export default function Media({
  src, alt = '', className, imgClassName, placeholder, eager = false, ...props
}) {
  const [loaded, setLoaded] = useState(false)
  return (
    <span className={cn('relative block overflow-hidden bg-glacier-50', className)}>
      {placeholder ? (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className={cn('absolute inset-0 h-full w-full scale-110 object-cover blur-xl transition-opacity duration-700', loaded && 'opacity-0')}
        />
      ) : (
        <span aria-hidden="true" className={cn('absolute inset-0 animate-pulse bg-gradient-to-br from-glacier-100 via-glacier-50 to-pine-100/50 transition-opacity duration-700', loaded && 'opacity-0')} />
      )}
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={cn('h-full w-full object-cover transition-opacity duration-700 ease-premium', loaded ? 'opacity-100' : 'opacity-0', imgClassName)}
        {...props}
      />
    </span>
  )
}
