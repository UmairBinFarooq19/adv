import { asset } from '@/lib/asset'

// Instagram feed tiles. `span` drives the masonry layout (some tiles taller).
export const instagramPosts = [
  { id: 1, image: asset('images/ig-1.svg'), span: 'tall' },
  { id: 2, image: asset('images/ig-2.svg'), span: 'normal' },
  { id: 3, image: asset('images/ig-3.svg'), span: 'normal' },
  { id: 4, image: asset('images/ig-4.svg'), span: 'tall' },
  { id: 5, image: asset('images/ig-5.svg'), span: 'normal' },
  { id: 6, image: asset('images/ig-6.svg'), span: 'normal' },
]
