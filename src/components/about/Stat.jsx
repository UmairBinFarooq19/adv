import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/cn'

// Stat — an animated count-up number that tweens from 0 to its value the first
// time it scrolls into view, then holds. Honours prefers-reduced-motion by
// jumping straight to the final value. `divisor` supports decimals (e.g. value
// 49 / divisor 10 → 4.9). `tone` adapts it to dark (pine) or light bands.
// Reusable anywhere a headline number is needed; here it powers the stats band.
export default function Stat({ value, divisor = 1, prefix = '', suffix = '', label, duration = 1600, tone = 'dark' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)
  const decimals = divisor > 1 ? 1 : 0

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setN(value)
      return
    }
    let raf
    let start
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  const display = (n / divisor).toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

  return (
    <div ref={ref} className="text-center">
      <div className={cn('font-display text-4xl font-semibold sm:text-5xl', tone === 'dark' ? 'text-saffron-300' : 'text-pine-900')}>
        {prefix}{display}{suffix}
      </div>
      <div className={cn('mt-2 text-sm', tone === 'dark' ? 'text-pine-100' : 'text-muted')}>{label}</div>
    </div>
  )
}
