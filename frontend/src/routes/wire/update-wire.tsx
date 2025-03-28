import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wire/update-wire')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/wire/update-wire"!</div>
}
