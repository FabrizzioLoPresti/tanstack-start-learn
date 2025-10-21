import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/full-course/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Hello "/full-course/"!</h1>
      <nav className="mt-4">
        <ul className="list-disc list-inside">
          <li>
            <Link to="/full-course/about" className="text-blue-500 underline">
              Go to About Page
            </Link>
          </li>
          <li>
            <Link to="/full-course/user" className="text-blue-500 underline">
              Go to User Page
            </Link>
          </li>
          <li>
            <Link
              to="/full-course/users/$userId"
              params={{ userId: '123' }}
              className="text-blue-500 underline"
            >
              Go to User Page with ID 123
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
