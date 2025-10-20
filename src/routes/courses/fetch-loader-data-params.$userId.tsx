import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const fetchUserData = createServerFn({ method: 'GET' })
  .inputValidator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    // This runs only on the server side
    const userData = await fetch(
      `https://jsonplaceholder.typicode.com/users/${data.userId}`,
    )
    const user = await userData.json()

    // * Bloquea la carga completa de la pagina al ser llamada la Server Function en el loader para luego renderizar la pagina
    // * Generalmente es util en paginas como blogs para SEO pero no para paginas interactivas
    // * En ese caso es mejor usar TanStack Query en el cliente
    await new Promise((resolve) => setTimeout(resolve, 3000)) // Simulate async operation
    return user
  })

export const Route = createFileRoute(
  '/courses/fetch-loader-data-params/$userId',
)({
  component: RouteComponent,
  beforeLoad: async (context) => {
    // SERVER SIDE
    // Validar autenticacion, en caso de no estar autenticado redirigir
    console.log('Before load for user:', context.params.userId)
    if (context.params.userId !== '4') {
      throw redirect({ to: '/courses/about' })
    }
  },
  loader: async ({ params }) =>
    fetchUserData({ data: { userId: params.userId } }),
})

function RouteComponent() {
  const { userId } = Route.useParams()
  const userInfo = Route.useLoaderData()
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Hello "/courses/fetch-loader-data-params"!
      </h1>
      <p>User ID: {userId}</p>
      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
    </div>
  )
}
