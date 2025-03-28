import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order/create-orders')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/order/create-orders"!</div>
}
 