import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

const TodoInputSchema = z.object({
  id: z.string(),
})

const fetchTodoById = createServerFn({ method: 'GET' })
  .inputValidator(TodoInputSchema)
  .handler(async ({ data: { id } }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    )
    if (!response.ok) {
      throw new Error('Failed to fetch todo by id')
    }
    return response.json()
  })

export const Route = createFileRoute('/react-query/fetch-data-by-parameters')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['todo', { id: '1' }],
    queryFn: () => fetchTodoById({ data: { id: '1' } }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Hello "/react-query/fetch-data-by-parameters"!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
