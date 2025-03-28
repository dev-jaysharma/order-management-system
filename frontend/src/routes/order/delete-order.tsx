import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order/delete-order')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/order/delete-order"!</div>
}
