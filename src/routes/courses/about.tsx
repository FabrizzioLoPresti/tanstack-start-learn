import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/courses/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h3 className="text-2xl font-bold">Links to Courses</h3>
      <ol className="list-decimal list-inside mt-4 space-y-2">
        <li>
          <Link to="/courses/fetch-loader-data">Fetch in Loader</Link>
        </li>
        <li>
          <Link
            to="/courses/fetch-loader-data-params/$userId"
            params={{ userId: '4' }}
          >
            Fetch in Loader with Params
          </Link>
        </li>
        <li>
          <Link to="/courses/fetch-tanstack-query">
            Fetch with TanStack Query
          </Link>
        </li>
        <li>
          <Link to="/courses/fetch-tanstack-query-mutation-zod">
            Fetch with TanStack Query Mutation and Zod
          </Link>
        </li>
      </ol>
    </div>
  )
}
