import { createFileRoute } from '@tanstack/react-router'

// Import librerias de React Query (para consultar datos y mutaciones) y cliente de ORPC
import { useQuery, useMutation } from '@tanstack/react-query'
import { orpc } from '@/orpc/client'

export const Route = createFileRoute('/orpc-queries')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['orpc-queries-data'],
    queryFn: () => orpc.listTodos.call({}), // Ejemplo de consulta de datos usando oRPC y React Query
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return (
    <div>
      <h1 className="text-2xl font-bold">Hello "/orpc-queries"!</h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => refetch()}
      >
        Refetch Data
      </button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {(error as Error).message}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
