import { Hono } from "hono";
import type { Coil } from "../types/coil";
import { CoilSchema, CreateCoilSchema } from "../types/coil";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db";
import { coilTable } from "../db/schema/schema";
import { v4 as uuid } from "uuid";
import { eq } from "drizzle-orm";

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

const getAllCoil = async () => {
  const data = await db.select().from(coilTable);
  return data;
};

const coil = new Hono()
  .get("/", async (c) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const coil = await getAllCoil();
    return c.json({ coil: coil });
  })
  .post("/", zValidator("json", CreateCoilSchema), async (c) => {
    const data = c.req.valid("json");
    const coilData = CreateCoilSchema.parse(data);
    const id = uuid();
    await db.insert(coilTable).values({
      id: id,
      name: coilData.name,
      wire_gauge:  coilData.wire_gauge.toString(),
      coil_weight: coilData.coil_weight.toString(),
      total_set_weight: coilData.total_set_weight.toString(),
    });
    return c.json({ message: "Coil added successfully" });
  })
  .get("/search/:name", (c) => {
    // const name = c.req.param("name");
    // const coil = fakeData.find(
    //   (coil) => coil.name.toLowerCase() === name.toLowerCase()
    // );
    // if (!coil) {
    //   return c.json({ message: "Coil not found" }, 404);
    // }
    // return c.json(coil);
    const name = c.req.param("name");
    const coil = db.select().from(coilTable).where(eq(coilTable.name, name));
    return c.json({ coil: coil });
  })
  .delete("/delete/:name", async (c) => {
    const name = c.req.param("name");
    await db.delete(coilTable).where(eq(coilTable.name, name));
    // console.log(`Deleted ${result} rows`);
    return c.json({ message: "Coil deleted" });
  })
  .put("/update/:name", zValidator("json", CoilSchema), async (c) => {
    const name = c.req.param("name");
    const data = c.req.valid("json");
    const coilData = CoilSchema.parse(data);
    await db.update(coilTable).set({
      name: coilData.name,
      wire_gauge: coilData.wire_gauge.toString(),
      coil_weight: coilData.coil_weight.toString(),
      total_set_weight: coilData.total_set_weight.toString(),
    }).where(eq(coilTable.name, name));
    return c.json({ message: "Coil updated" });
  });

export { coil };
