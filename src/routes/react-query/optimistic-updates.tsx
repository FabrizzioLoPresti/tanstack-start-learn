import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

const PostInputSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
})

const getPosts = createServerFn().handler(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  return posts
})

const addPost = createServerFn({ method: 'POST' })
  .inputValidator(PostInputSchema)
  .handler(async ({ data }) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const post = await res.json()
    return post
  })

export const Route = createFileRoute('/react-query/optimistic-updates')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes -> mantiene en cache del navegador por 5 minutos (no Redis que es a nivel de servidor para todos los usuarios)
  })

  const mutation = useMutation({
    mutationFn: (newPost: z.infer<typeof PostInputSchema>) =>
      addPost({ data: newPost }),
    // onMutate, onError, onSettled would go here for optimistic updates
    // onSuccess: () => {
    //   // In a real app, you might invalidate queries or update the cache here
    //   queryClient.invalidateQueries({ queryKey: ['posts'] })
    // },
    onMutate: async (newPost) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      const previousPosts = queryClient.getQueryData(['posts'])
      queryClient.setQueryData(['posts'], (oldPosts: any) => [
        ...(oldPosts || []),
        { id: Date.now(), ...newPost },
      ])
      return { previousPosts }
    },
    onError: (err, newPost, context) => {
      // Rollback to previous posts on error
      queryClient.setQueryData(['posts'], context?.previousPosts)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleSubmit = (newPost: z.infer<typeof PostInputSchema>) => {
    mutation.mutate(newPost)
  }

  return (
    <div>
      <h1>Hello "/react-query/optimistic-updates"!</h1>
      <button
        onClick={() =>
          handleSubmit({
            title: 'foo',
            body: 'bar',
            userId: 1,
          })
        }
      >
        Add Post
      </button>
      {mutation.isPending && <p>Adding post...</p>}
      {mutation.isError && <p className="text-red-500">Error adding post</p>}
      {mutation.isSuccess && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Post Added Successfully!</h2>
          <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
        </div>
      )}
      {isLoading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">Error loading posts</p>}
      {posts && (
        <ul className="mb-4">
          {posts.map((post: any) => (
            <li key={post.id} className="border-b py-2">
              <h2 className="font-bold">{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
