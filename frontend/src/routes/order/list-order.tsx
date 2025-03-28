import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order/list-order')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/order/list-order"!</div>
}
