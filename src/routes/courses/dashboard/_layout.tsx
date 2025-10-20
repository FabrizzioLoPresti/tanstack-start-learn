import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/dashboard/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <nav>LAYOUT NAVBAR</nav>
      <Outlet />
    </div>
  )
}
