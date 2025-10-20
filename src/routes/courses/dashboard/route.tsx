import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/courses/dashboard">Dashboard Home</Link>
          </li>
          <li>
            <Link to="/courses/dashboard/settings">Settings</Link>
          </li>
          <li>
            <Link to="/courses/dashboard/test">Layout Test</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
