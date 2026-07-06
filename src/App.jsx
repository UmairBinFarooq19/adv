import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes/router'
import { FavoritesProvider } from '@/store/FavoritesContext'
import { CompareProvider } from '@/store/CompareContext'
import { InquiryProvider } from '@/store/InquiryContext'

// Global client state (favorites, compare, inquiry modal) wraps the router so
// every route and the shared layout can read it. All three persist or are
// ephemeral UI state only — no backend required.
export default function App() {
  return (
    <FavoritesProvider>
      <CompareProvider>
        <InquiryProvider>
          <RouterProvider router={router} />
        </InquiryProvider>
      </CompareProvider>
    </FavoritesProvider>
  )
}
