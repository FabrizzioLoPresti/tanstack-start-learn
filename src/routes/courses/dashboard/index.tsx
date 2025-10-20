import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/courses/dashboard/"!</div>
}
