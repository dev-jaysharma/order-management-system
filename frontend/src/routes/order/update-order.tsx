import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order/update-order')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/order/update-order"!</div>
}
