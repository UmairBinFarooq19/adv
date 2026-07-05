// Filter option definitions. Each option carries a `match(pkg)` predicate so the
// filtering logic stays declarative — add an option here and it just works.
export const filterGroups = [
  {
    id: 'season',
    label: 'Season',
    options: [
      { value: 'summer', label: 'Summer', match: (p) => p.seasons?.includes('summer') },
      { value: 'winter', label: 'Winter', match: (p) => p.seasons?.includes('winter') },
      { value: 'spring', label: 'Spring', match: (p) => p.seasons?.includes('spring') },
      { value: 'autumn', label: 'Autumn', match: (p) => p.seasons?.includes('autumn') },
    ],
  },
  {
    id: 'duration',
    label: 'Duration',
    options: [
      { value: 'short', label: '1–3 Days', match: (p) => p.days >= 1 && p.days <= 3 },
      { value: 'mid', label: '4–6 Days', match: (p) => p.days >= 4 && p.days <= 6 },
      { value: 'long', label: '7+ Days', match: (p) => p.days >= 7 },
    ],
  },
  {
    id: 'destination',
    label: 'Destination',
    options: ['Gulmarg', 'Srinagar', 'Pahalgam', 'Sonamarg', 'Leh'].map((d) => ({
      value: d.toLowerCase(),
      label: d,
      match: (p) => p.location?.toLowerCase().includes(d.toLowerCase()),
    })),
  },
  {
    id: 'activity',
    label: 'Activity & style',
    options: ['Skiing', 'Snowboarding', 'Trekking', 'Adventure', 'Family', 'Budget', 'Luxury'].map((a) => ({
      value: a.toLowerCase(),
      label: a,
      // Activity filters match against both activities and style tags.
      match: (p) =>
        p.activities?.includes(a.toLowerCase()) || p.tags?.includes(a.toLowerCase()),
    })),
  },
]
