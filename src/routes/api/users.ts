import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/users')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const fetchUsers = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        )
        const users = await fetchUsers.json()
        return new Response(JSON.stringify(users), {
          headers: { 'Content-Type': 'application/json' },
        })
      },
      POST: async ({ request }) => {
        // Here you would normally handle creating a new user
        const newUser = await request.json()
        return new Response(JSON.stringify(newUser), {
          headers: { 'Content-Type': 'application/json' },
        })
      },
    },
  },
})
