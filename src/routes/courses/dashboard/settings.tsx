import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/dashboard/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/courses/dashboard/settings"!</div>
}
