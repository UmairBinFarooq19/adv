import Media from '@/components/ui/Media'

// TeamCard — a person card matching the site's card language (rounded, soft
// shadow, hover lift). Shows a photo via the blur-up <Media> loader when
// `member.photo` is set, otherwise a branded initials avatar, so the section
// looks finished before real headshots exist. Reusable for any people grid.
function initials(name) {
  return name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join('')
}

export default function TeamCard({ member }) {
  const { name, role, bio, photo } = member
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-soft ring-1 ring-line/80 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift hover:ring-line">
      <div className="aspect-[4/5] overflow-hidden">
        {photo ? (
          <Media src={photo} alt={name} className="h-full w-full" imgClassName="transition-transform duration-700 ease-premium group-hover:scale-105" />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-pine-700 to-glacier-600">
            <span className="font-display text-5xl font-semibold text-white/90">{initials(name)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-pine-900">{name}</h3>
        <p className="text-sm font-semibold text-saffron-600">{role}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{bio}</p>
      </div>
    </div>
  )
}
