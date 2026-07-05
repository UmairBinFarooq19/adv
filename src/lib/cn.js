// Tiny classNames combiner — merges truthy class strings.
// Kept dependency-free (no clsx) to stay light; swap for clsx+tailwind-merge
// later if you start composing conflicting utilities heavily.
export function cn(...inputs) {
  return inputs.flat(Infinity).filter(Boolean).join(' ')
}
