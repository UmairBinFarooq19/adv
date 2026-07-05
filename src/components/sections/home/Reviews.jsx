import SectionShell from './SectionShell'

// TODO: testimonial cards or a carousel (quote, guest name, trip, star rating).
export default function Reviews() {
  return (
    <SectionShell
      tone="surface"
      eyebrow="Guest stories"
      title="What our travellers say"
      lead="Rated 4.9 across Google and TripAdvisor by guests from over 20 countries."
      columns={3}
      aspect="aspect-[5/4]"
    />
  )
}
