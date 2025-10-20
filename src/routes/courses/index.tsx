import { createFileRoute, Link } from '@tanstack/react-router'
import AdminController from './-admin/admin-controller'

export const Route = createFileRoute('/courses/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Hello "/courses/"!</h1>
      <Link to="/courses/about" className="text-blue-500 hover:underline">
        About
      </Link>
      <AdminController />
    </div>
  )
}
