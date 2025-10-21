import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/full-course/users/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams()
  return (
    <div>
      <h1>Hello "/full-course/users/{userId}"!</h1>
      <p>User ID: {userId}</p>
    </div>
  )
}
