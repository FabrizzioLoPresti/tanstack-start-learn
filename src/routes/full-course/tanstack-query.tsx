import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

const getTodos = createServerFn({ method: 'GET' }).handler(async () => {
  const resp = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=5',
  )
  if (!resp.ok) {
    throw new Error('Failed to fetch todos data xdddd')
  }
  const todos = await resp.json()
  return todos
})

export const Route = createFileRoute('/full-course/tanstack-query')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      return getTodos()
    },
    initialData: [],
  })

  if (isLoading) return <div>Loading todos...</div>
  if (error) return <div>Error loading todos: {error.message}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Hello "/full-course/tanstack-query"!
      </h1>
      <h2 className="mt-4 text-xl font-bold">
        Todos fetched with TanStack Query:
      </h2>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
