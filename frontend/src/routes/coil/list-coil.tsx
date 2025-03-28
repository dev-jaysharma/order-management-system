import { client } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/coil/list-coil")({
  component: RouteComponent,
});

async function getAllCoil() {
  const res = await client.api.coil.$get();
  const resData = res.json();
  if (res.ok) {
    return resData;
  }
  throw new Error("eerror fetching data");
}

function RouteComponent() {
  const { isPending, error, data } = useQuery({
    queryKey: ["getAllCoil"],
    queryFn: getAllCoil,
  });
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(67), 500);
    const timer2 = setTimeout(() => setProgress(99), 1000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);
  return (
    <>
      <div className=" h-[90vh] w-[100vw] overflow-y-auto flex justify-center items-center">
        {isPending ? (
          <Progress value={progress} className="w-[88%]" />
        ) : (
          <Table className="w-[90vw] m-auto">
            <TableCaption>A list of All Coils In DataBase</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">NAME</TableHead>
                <TableHead>GAUGE</TableHead>
                <TableHead>WEIGHT</TableHead>
                <TableHead className="text-right">SET_WEIGHT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.coil.map((coil) => (
                <TableRow key={coil.id}>
                  <TableCell className="font-medium">{coil.name}</TableCell>
                  <TableCell>{coil.wire_gauge}</TableCell>
                  <TableCell>{coil.coil_weight}</TableCell>
                  <TableCell className="text-right">
                    {coil.total_set_weight}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
