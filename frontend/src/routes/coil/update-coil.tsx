import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateCoilSchema } from "@api/types/coil";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { client } from "@/lib/api";
import { v4 as uuid } from "uuid"

export const Route = createFileRoute('/coil/update-coil')({
  component: RouteComponent,
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

function RouteComponent() {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <FormCard />
    </div>
  );
}

function FormCard() {
  const form = useForm({
    defaultValues: {
      name: "",
      wire_gauge: 0,
      coil_weight: 0,
      total_set_weight: 0,
    },
    onSubmit: async ({ value }) => {
      await client.api.coil.update[':name'].$put({
        param: { name: value.name },
        json: {
          id: uuid(),
          name: value.name,
          wire_gauge: value.wire_gauge,
          coil_weight: value.coil_weight,
          total_set_weight: value.total_set_weight,
        },
      });
      toast("Coil has been updated", {
        description: "Coil has been updated successfully",
      });
    },
  });

  return (
    <Card className="w-[70%] sm:w-[40%] ">
      <CardHeader>
        <CardTitle>Update Coil</CardTitle>
        <CardDescription>Update the details of the coil</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit}
          className="space-y-4"
        >
          <form.Field
            name="name"
            validators={{
              onChange: CreateCoilSchema.shape.name,
            }}
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Name:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="text"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => field.handleChange(e.target.value)}
                />{' '}
                <FieldInfo field={field} />
              </>
            )}
          />
          <form.Field
            name="wire_gauge"
            validators={{
              onChange:   CreateCoilSchema.shape.wire_gauge,
            }}
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Wire Gauge:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="number"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />{' '}
                <FieldInfo field={field} />
              </>
            )}
          />
          <form.Field
            name="coil_weight"
            validators={{
              onChange: CreateCoilSchema.shape.coil_weight,
            }}
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Coil Weight:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="number"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />{' '}
                <FieldInfo field={field} />
              </>
            )}
          />
          <form.Field
            name="total_set_weight"
            validators={{
              onChange: CreateCoilSchema.shape.total_set_weight,
            }}
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Total Weight Of One Set:</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="number"
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />{' '}
                <FieldInfo field={field} />
              </>
            )}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={() => {
            form.handleSubmit();
          }}
        >
          Update Coil
        </Button>
      </CardFooter>
    </Card>
  );
}
