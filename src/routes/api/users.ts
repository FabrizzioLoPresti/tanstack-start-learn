import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/users')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const fetchUsers = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        )
        const users = await fetchUsers.json()
        return json(users)
      },
      POST: async ({ request }) => {
        const newUser = await request.json()
        return json(newUser)
      },
    },
  },
})
