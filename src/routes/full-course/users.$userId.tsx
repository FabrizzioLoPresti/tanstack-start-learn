import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { authMiddleware } from '@/app/middleware'
import { z } from 'zod'

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
})

// Server Function to fetch user data
// createServerFn crea una funcion que se ejecuta UNICAMENTE en el servidor, ya que loader se ejecuta en el servidor y cliente
const fetchUserData = createServerFn({ method: 'GET' })
  .middleware([])
  .inputValidator((data: { userId: string }) => data)
  .handler(async ({ data: { userId } }) => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    )
    if (!resp.ok) {
      // Error handling catcheado luego en el loader por errorComponent para mostrar mensaje en UI
      throw new Error('Failed to fetch user data')
    }

    const user = await resp.json()
    if (!user.id) {
      throw notFound()
    }

    return { userId, name: user.name }
  })

const addUser = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(UserSchema)
  .handler(async ({ data }) => {
    // This runs only on the server side
    // Here you would typically save the user data to a database
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate async operation
    return { success: true, user: data }
  })

export const Route = createFileRoute('/full-course/users/$userId')({
  component: RouteComponent,
  notFoundComponent: () => <div>User Not Found!</div>,
  errorComponent: ({ error }) => (
    <div>
      <h1>Error!</h1>
      <pre>{error.message}</pre>
    </div>
  ),
  pendingComponent: () => <div>Loading user data...</div>,
  beforeLoad: ({ params }) => {
    // beforeLoad es una funcion que se llama antes de que se cargue la ruta y antes de que se llame al loader
    // Generalmente se usa para autenticar, autorizar, o redirigir si no se cumplen ciertas condiciones
    console.log('beforeLoad called with params:', params)
  },
  loader: ({ params }) => {
    // Route Loader es una funcion que es llamada cuando una ruta es encontrada
    // Se llama cuando ingresamos a una URL que matchea con la ruta
    // Generalmente se usa para cargar datos necesarios para renderizar la ruta, fetch de una API, etc.
    const { userId } = params

    if (userId === '0') {
      // throw new Response('User Not Found', { status: 404 })
      throw notFound()
    }

    const user = fetchUserData({ data: { userId } })
    return user
  },
})

function RouteComponent() {
  const { userId } = Route.useParams()
  const user = Route.useLoaderData()

  const submitAddUser = async () => {
    try {
      const result = await addUser({
        data: { id: Number(userId), name: user.name, username: user.name },
      })
      console.log('Add User Result:', result)
    } catch (error) {
      console.log('Error adding user:', error)
      alert('Error adding user: ' + (error as Error).message)
    }
  }

  return (
    <div>
      <h1>Hello "/full-course/users/{userId}"!</h1>
      <p>User ID: {userId}</p>
      <p>User Name: {user.name}</p>
      <button onClick={submitAddUser}>Add User</button>
    </div>
  )
}
