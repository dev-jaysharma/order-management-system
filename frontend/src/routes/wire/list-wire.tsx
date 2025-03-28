import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wire/list-wire')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/wire/list-wire"!</div>
}
