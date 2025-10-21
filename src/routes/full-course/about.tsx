import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/full-course/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/full-course/about"!</div>
}
