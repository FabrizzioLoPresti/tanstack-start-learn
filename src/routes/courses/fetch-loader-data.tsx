import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const fetchUsersData = createServerFn().handler(async () => {
  // This runs only on the server side
  const usersData = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await usersData.json()
  return users
})

export const Route = createFileRoute('/courses/fetch-loader-data')({
  component: RouteComponent,
  loader: async () => fetchUsersData(),
})

function RouteComponent() {
  const usersData = Route.useLoaderData()
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Hello "/courses/fetch-loader-data"!
      </h1>
      <pre>{JSON.stringify(usersData, null, 2)}</pre>
    </div>
  )
}
