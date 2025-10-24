import { ORPCError, os } from '@orpc/server'
import * as z from 'zod'

// Agrego Tipado mediante Zod para salidas de funciones
import { TodoListSchema, TodoSchema } from '@/orpc/schema'
import { authed, requiredAuthMiddleware } from '@/orpc/middlewares/auth'

const todos = [
  { id: 1, name: 'Get groceries' },
  { id: 2, name: 'Buy a new phone' },
  { id: 3, name: 'Finish the project' },
]

export const listTodos = os
  .input(z.object({}))
  .output(TodoListSchema)
  .handler(() => {
    return todos
  })

// Agrego funcion para obtener un todo por ID
// Se importan tipos y funcionalidad automaticamente en la documentacion /api
export const getTodoById = os
  .input(z.object({ id: z.number().int().min(1) }))
  .output(TodoSchema.nullable())
  .handler(({ input }) => {
    return todos.find((t) => t.id === input.id) || null
  })

export const addTodo = authed
  .input(z.object({ name: z.string() }))
  .output(TodoSchema)
  .errors({
    BAD_REQUEST: {
      message: 'Simulated ORPC error adding todo',
      status: 400,
    },
  })
  .handler(({ input, context, errors }) => {
    // throw new Error('Simulated error adding todo') // Simulacion de error -> llega OK al addTodoError tomado desde React Query
    // throw new ORPCError('BAD_REQUEST', {
    //   message: 'Simulated ORPC error adding todo',
    // }) // -> llega OK al addTodoError tomado desde React Query
    // throw errors.BAD_REQUEST() // -> llega OK al addTodoError tomado desde React Query

    console.log('User from context:', context.user) // Accediendo al usuario del contexto

    const newTodo = { id: todos.length + 1, name: input.name }
    todos.push(newTodo)
    return newTodo
  })
