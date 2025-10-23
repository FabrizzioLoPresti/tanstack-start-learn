import { os } from '@orpc/server'
import * as z from 'zod'

// Agrego Tipado mediante Zod para salidas de funciones
import { TodoListSchema, TodoSchema } from '@/orpc/schema'

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

export const addTodo = os
  .input(z.object({ name: z.string() }))
  .output(TodoSchema)
  .handler(({ input }) => {
    const newTodo = { id: todos.length + 1, name: input.name }
    todos.push(newTodo)
    return newTodo
  })
