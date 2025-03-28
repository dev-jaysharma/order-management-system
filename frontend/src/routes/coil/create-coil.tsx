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
import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/coil/create-coil")({
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

function onClickBtn() {
  toast("Event has been created", {
    description: "Sunday, December 03, 2023 at 9:00 AM",
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
  });
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
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <Card className="w-[70%] sm:w-[40%] ">
      <CardHeader>
        <CardTitle>Create Coil</CardTitle>
        <CardDescription>Enter the details of the coil</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="name"
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
                />{" "}
                <FieldInfo field={field} />
              </>
            )}
          />
          <form.Field
            name="wire_gauge"
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
                />{" "}
                <FieldInfo field={field} />
              </>
            )}
          />
          <form.Field
            name="coil_weight"
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
                />{" "}
                <FieldInfo field={field} />
              </>
            )}
          />
          <form.Field
            name="total_set_weight"
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
                />{" "}
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
            onClickBtn();
          }}
        >
          Create Coil
        </Button>
      </CardFooter>
    </Card>
  );
}

{
  /* <form action="">
<form.Field
  name="name"
  children={(field) => (
    <>
      <Label htmlFor={field.name}>Name:</Label>
      <Input
        id={field.name}
        name={field.name}x
        value={field.state.value}
        onBlur={field.handleBlur}
        type="text"
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldInfo field={field} />
    </>
  )}
/>
</form> */
}
