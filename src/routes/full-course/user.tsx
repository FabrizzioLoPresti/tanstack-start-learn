import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/full-course/user')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Hello "/full-course/user"!</h1>
      <p>
        Por defecto si tengo /user y /user/$userId va a priorizar cargar /user
        por mas que agregue un parametro a /user/$userId
      </p>
    </div>
  )
}
