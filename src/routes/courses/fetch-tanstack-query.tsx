import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useQuery } from '@tanstack/react-query'

const getPosts = createServerFn().handler(async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5',
  )
  const posts = await response.json()
  await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate async operation
  return posts
})

export const Route = createFileRoute('/courses/fetch-tanstack-query')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      return getPosts()
    },
  })

  if (isLoading) return <div>Loading posts...</div>
  if (error) return <div>Error loading posts</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">Posts fetched with TanStack Query:</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
