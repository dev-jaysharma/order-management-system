import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { client } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/coil/delete-coil')({
  component: RouteComponent,
})

function RouteComponent() {
  const [param, setParam] = useState({ name: "" })
  const { mutate } = useMutation({
    mutationFn: () => client.api.coil.delete[':name'].$delete({param}),
    onSuccess: () => {
      toast("Coil has been deleted", {
        description: "Coil has been deleted successfully",
      })
      useNavigate()
    },
  })
  return (
    <div>
      <Input
        type="text"
        placeholder="Enter Coil Name"
        value={param.name}
        onChange={(e) => setParam({ name: e.target.value })}
      />
      <Button onClick={() => mutate()}>Delete</Button>
    </div>
  )
}
