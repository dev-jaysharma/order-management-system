import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wire/create-wire')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/wire/create-wire"!</div>
}
