import { createFileRoute } from '@tanstack/react-router'

// Import librerias de React Query (para consultar datos y mutaciones) y cliente de ORPC
import { useQuery, useMutation } from '@tanstack/react-query'
import { orpc } from '@/orpc/client'

export const Route = createFileRoute('/orpc-queries')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Hello "/orpc-queries"!</h1>
    </div>
  )
}
