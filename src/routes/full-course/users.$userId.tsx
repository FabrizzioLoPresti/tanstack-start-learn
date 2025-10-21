import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const fetchUserData = createServerFn()
  .inputValidator((data: { userId: string }) => data)
  .handler(async ({ data: { userId } }) => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    )
    if (!resp.ok) {
      throw new Error('Failed to fetch user data')
    }

    const user = await resp.json()
    if (!user.id) {
      throw notFound()
    }

    return { userId, name: user.name }
  })

export const Route = createFileRoute('/full-course/users/$userId')({
  component: RouteComponent,
  notFoundComponent: () => <div>User Not Found!</div>,
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

  return (
    <div>
      <h1>Hello "/full-course/users/{userId}"!</h1>
      <p>User ID: {userId}</p>
      <p>User Name: {user.name}</p>
    </div>
  )
}
