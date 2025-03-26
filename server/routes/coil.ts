import { Hono } from "hono";
import type { Coil } from "../types/coil";
import { CoilSchema } from "../types/coil";
import { zValidator } from "@hono/zod-validator";

const fakeData: Coil[] = [
  {
    id: "COIL001",
    name: "Standard Steel Coil",
    wire_gauge: 18,
    coil_weight: 2500,
    total_set_weight: 2750,
  },
  {
    id: "COIL002",
    name: "Heavy Duty Coil",
    wire_gauge: 14,
    coil_weight: 3000,
    total_set_weight: 3300,
  },
  {
    id: "COIL003",
    name: "Light Gauge Coil",
    wire_gauge: 22,
    coil_weight: 1800,
    total_set_weight: 2000,
  },
];

const coil = new Hono()
  .get("/", (c) => {
    return c.json({ ...fakeData });
  })
  .post("/", zValidator("json", CoilSchema), (c) => {
    const data = c.req.valid("json");
    const coilData = CoilSchema.parse(data);
    const coilDataValid = { ...coilData };
    fakeData.push(coilDataValid);
    return c.json({ message: "Hello from Coil!" });
  })
  .get("/search/:name", (c) => {
    const name = c.req.param("name");
    const coil = fakeData.find(
      (coil) => coil.name.toLowerCase() === name.toLowerCase()
    );
    if (!coil) {
      return c.json({ message: "Coil not found" }, 404);
    }
    return c.json(coil);
  });

export { coil };
