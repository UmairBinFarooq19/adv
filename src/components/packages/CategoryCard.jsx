import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

// Landing-page category tile: image with zoom, icon, title, blurb. Links to the
// category's collection page (or a custom `to`, e.g. the builder).
export default function CategoryCard({ category }) {
  const to = category.to ?? `/packages/${category.slug}`
  const Icon = category.icon
  return (
    <Link
      to={to}
      className="group relative flex min-h-[16rem] flex-col justify-end overflow-hidden rounded-3xl p-6 text-white shadow-soft ring-1 ring-line/40 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift"
    >
      <img
        src={category.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-110"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950/90 via-pine-950/40 to-pine-950/20" />

      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-saffron-300 backdrop-blur transition-colors duration-300 group-hover:bg-saffron-400 group-hover:text-pine-950">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold text-white">{category.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-pine-100">{category.blurb}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-saffron-300">
        Explore
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  )
}
