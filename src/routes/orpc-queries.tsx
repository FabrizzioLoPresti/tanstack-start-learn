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

  const { mutate: addTodo } = useMutation({
    mutationFn: (newTodo: { name: string }) => orpc.addTodo.call(newTodo), // Ejemplo de mutacion para agregar un nuevo todo
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['orpc-queries-data''] })orpc-queries-data'
      refetch() // Refetch data despues de agregar un nuevo todo
    },
  })

  // Consulta inicial de un todo por ID usando React Query al iniciar el componente
  // Se pueden pasar parametros de la pagina por ejemplo para obtener diferentes todos
  const {
    data: todoByIdInit,
    isLoading: isLoadingTodoByIdInit,
    isError: isErrorTodoByIdInit,
    error: errorTodoByIdInit,
  } = useQuery({
    queryKey: ['orpc-queries-data', { id: 2 }],
    queryFn: () => orpc.getTodoById.call({ id: 2 }), // Ejemplo de consulta de datos usando oRPC y React Query
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Mutacion para obtener un todo por ID al ejecutar una accion (click de boton por ejemplo)
  // Se pueden pasar parametros dinamicos
  const {
    mutate: getTodoById,
    data: todoById,
    isPending: isPendingTodoById,
    isError: isErrorTodoById,
    error: errorTodoById,
  } = useMutation({
    mutationFn: (input: { id: number }) => orpc.getTodoById.call(input), // Ejemplo de mutacion para obtener un todo por ID
    onSuccess: (data) => {
      console.log('Todo fetched by ID:', data)
    },
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
      <button
        className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => addTodo({ name: 'New oRPC Todo' })}
      >
        Add Todo
      </button>
      <button
        className="mt-4 ml-4 px-4 py-2 bg-yellow-500 text-white rounded"
        onClick={() => {
          const todoId = 1 // Ejemplo: ID del todo a obtener
          getTodoById({ id: todoId })
        }}
      >
        Get Todo by ID
      </button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {(error as Error).message}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <hr className="my-8" />
      {isLoadingTodoByIdInit && <p>Loading initial Todo by ID...</p>}
      {isErrorTodoByIdInit && (
        <p>Error: {(errorTodoByIdInit as Error).message}</p>
      )}
      <h3>Initial Todo by ID (query):</h3>
      <pre>{JSON.stringify(todoByIdInit, null, 2)}</pre>

      <hr className="my-8" />
      {isPendingTodoById && <p>Fetching Todo by ID...</p>}
      {isErrorTodoById && <p>Error: {(errorTodoById as Error).message}</p>}
      <h3>Todo by ID (mutation):</h3>
      <pre>{JSON.stringify(todoById, null, 2)}</pre>
    </div>
  )
}
