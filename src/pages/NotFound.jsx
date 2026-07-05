import { Compass } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Container className="grid min-h-[70vh] place-items-center py-24 text-center">
      <div className="max-w-md">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-saffron-100 text-saffron-600">
          <Compass className="h-8 w-8" />
        </span>
        <p className="mt-6 font-display text-5xl font-semibold text-pine-900">404</p>
        <h1 className="mt-3 text-xl font-semibold text-pine-900">Off the trail</h1>
        <p className="mt-3 text-muted">
          This path doesn't lead anywhere. Let's get you back to base camp.
        </p>
        <Button to="/" variant="primary" size="lg" className="mt-7">
          Back to home
        </Button>
      </div>
    </Container>
  )
}
