import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'

const TodoInputSchema = z.object({
  title: z.string(),
  completed: z.boolean(),
})

const addTodo = createServerFn({ method: 'POST' })
  .inputValidator(TodoInputSchema)
  .handler(async ({ data: { title, completed } }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simula un retardo de red
    return {
      id: Math.floor(Math.random() * 1000),
      title,
      completed,
    }
  })

export const Route = createFileRoute('/react-query/mutation-data')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newTodo: z.infer<typeof TodoInputSchema>) =>
      addTodo({ data: newTodo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  if (mutation.isPending) return <div>Adding todo...</div>
  if (mutation.isError)
    return <div>Error adding todo: {mutation.error.message}</div>

  return (
    <div>
      <h1>Hello "/react-query/mutation-data"!</h1>
      <p>Click the button to add a new todo.</p>
      <button
        onClick={() => mutation.mutate({ title: 'New Todo', completed: false })}
      >
        Add Todo
      </button>
      {mutation.isSuccess && (
        <div>
          <h2>Added Todo:</h2>
          <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
