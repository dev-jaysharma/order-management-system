import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wire/delete-wire')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/wire/delete-wire"!</div>
}
