import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/coil/update-coil')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/coil/update-coil"!</div>
}
