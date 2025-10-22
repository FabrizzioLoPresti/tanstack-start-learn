import { useQuery } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'

type Props = {}

const fetchTodos = createServerFn({ method: 'GET' }).handler(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return response.json()
})

const FetchComponent = (props: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 1000 * 60 * 5, // 5 minutes -> mantiene en cache del navegador por 5 minutos (no Redis que es a nivel de servidor para todos los usuarios)
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default FetchComponent
