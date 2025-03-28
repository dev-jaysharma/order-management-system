import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/coil/delete-coil')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/coil/delete-coil"!</div>
}
