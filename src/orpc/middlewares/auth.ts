import { ORPCError, os } from '@orpc/server'
import { z } from 'zod'

export const base = os.errors({
  // <-- common errors
  RATE_LIMITED: {
    data: z.object({
      retryAfter: z.number().int().min(1).default(1),
    }),
  },
  UNAUTHORIZED: {
    message: 'User is not authenticated xd',
  },
  BAD_REQUEST: {
    message: 'Simulated ORPC error adding todo :)',
    status: 400,
  },
})

export const requiredAuthMiddleware = base
  .$context<{ user?: { id: number; name: string; email: string } }>()
  .middleware(async ({ context, next, errors }) => {
    // Verificar si tengo usuario autenticado en el contexto
    const session = context.user || (await getSession())

    if (!session) {
      // throw new ORPCError('UNAUTHORIZED', {
      //   message: 'User is not authenticated :)',
      // }) // llega OK al addTodoError tomado desde React Query, saltando el procedure donde se llama el middleware
      throw errors.UNAUTHORIZED()
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

export const authed = base.use(requiredAuthMiddleware)
