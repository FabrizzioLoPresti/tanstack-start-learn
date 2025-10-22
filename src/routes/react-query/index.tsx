import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/react-query/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Hello "/react-query/"!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/react-query/fetch-data">
              Go to /react-query/fetch-data
            </Link>
          </li>
          <li>
            <Link to="/react-query/fetch-data-by-parameters">
              Go to /react-query/fetch-data-by-parameters
            </Link>
          </li>
          <li>
            <Link to="/react-query/mutation-data">
              Go to /react-query/mutation-data
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
