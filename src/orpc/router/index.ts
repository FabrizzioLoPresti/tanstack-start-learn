import { addTodo, listTodos, getTodoById } from './todos'

export default {
  listTodos,
  addTodo,
  getTodoById, // Exporto la nueva funcion en el router para poder acceder desde React Query (se importa automaticamente en documentacion /api)
}
