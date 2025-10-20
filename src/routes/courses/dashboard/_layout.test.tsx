import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/dashboard/_layout/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/courses/dashboard/_layout/test"!</div>
}
