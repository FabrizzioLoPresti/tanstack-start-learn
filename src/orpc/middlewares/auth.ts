import { ORPCError, os } from '@orpc/server'

export const requiredAuthMiddleware = os
  .$context<{ user?: { id: number; name: string; email: string } }>()
  .middleware(async ({ context, next }) => {
    // Verificar si tengo usuario autenticado en el contexto
    const session = context.user || (await getSession())

    if (!session) {
      throw new ORPCError('UNAUTHORIZED', {
        message: 'User is not authenticated',
      })
    }

    return await next({
      context: {
        // Pass additional context
        user: session,
      },
    })
  })

const notAuthenticated = false // Simulacion de usuario no autenticado

const getSession = async () => {
  if (notAuthenticated) return null
  return { id: 1, name: 'John', email: 'john@example.com' }
}
