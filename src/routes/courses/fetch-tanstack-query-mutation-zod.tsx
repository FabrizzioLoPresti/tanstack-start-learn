import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'

// Define Zod schema for User data
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
})

const createUser = createServerFn({ method: 'POST' })
  .inputValidator(UserSchema)
  .handler(async ({ data }) => {
    // This runs only on the server side
    // Here you would typically save the user data to a database
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate async operation
    return { success: true, user: data }
  })

export const Route = createFileRoute(
  '/courses/fetch-tanstack-query-mutation-zod',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const mutation = useMutation({
    mutationFn: (newUser: z.infer<typeof UserSchema>) =>
      createUser({ data: newUser }),
  })

  const handleCreateUser = () => {
    mutation.mutate({
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
    })
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Hello "/courses/fetch-data-zod-params"!
      </h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleCreateUser}
      >
        Create User
      </button>
      {mutation.isPending && <p>Creating user...</p>}
      {mutation.isError && <p className="text-red-500">Error creating user</p>}
      {mutation.isSuccess && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">User Created Successfully!</h2>
          <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
