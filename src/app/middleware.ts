import { createMiddleware } from '@tanstack/react-start'

export const authMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    console.log('isAuthMiddleware executed on the server')
    // Aquí podrías agregar lógica de autenticación real
    const isAuthenticated = false // Simulación de autenticación
    if (!isAuthenticated) {
      // Redirigir o lanzar un error si no está autenticado
      throw new Error('Not Authenticated')
    }
    return next()
  },
)
