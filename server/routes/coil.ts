import { Hono } from "hono";
import type { Coil } from "../types/coil";
import { CoilSchema, CreateCoilSchema, UpdateCoilSchema } from "../types/coil";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db";
import { coils } from "../db/schema/schema";
import { v4 as uuid } from "uuid";
import { eq } from "drizzle-orm";

const getAllCoil = async () => {
  try {
    const data = await db.select().from(coils);
    return data;
  } catch (error) {
    console.error('Error fetching coils:', error);
    throw new Error('Failed to fetch coils');
  }
};

const coil = new Hono()
  .get("/", async (c) => {
    try {
      const coils = await getAllCoil();
      return c.json({ data: coils });
    } catch (error) {
      return c.json({ error: 'Failed to fetch coils' }, 500);
    }
  })
  .post("/", zValidator("json", CreateCoilSchema), async (c) => {
    try {
      const data = c.req.valid("json");
      const coilData = CreateCoilSchema.parse(data);
      const [newCoil] = await db.insert(coils).values({
        id: uuid(),
        coilName: coilData.coilName,
        ProductCode: coilData.ProductCode,
        coilDescription: coilData.coilDescription,
        unitRate: coilData.unitRate.toString(),
        wireGauge: coilData.wireGauge.toString()
      }).returning();
      return c.json({ message: 'Coil created', data: newCoil });
    } catch (error) {
      console.error('Error creating coil:', error);
      return c.json({ error: 'Failed to create coil' }, 500);
    }
  })
  .get("/search/:name", async (c) => {
    try {
      const name = c.req.param("name");
      const [coil] = await db.select()
        .from(coils)
        .where(eq(coils.coilName, name));
      if (!coil) {
        return c.json({ error: 'Coil not found' }, 404);
      }
      return c.json({ data: coil });
    } catch (error) {
      console.error('Error searching coil:', error);
      return c.json({ error: 'Failed to search coil' }, 500);
    }
  })
  .delete("/delete/:name", async (c) => {
    try {
      const name = c.req.param("name");
      const [deletedCoil] = await db.delete(coils)
        .where(eq(coils.coilName, name))
        .returning();
      return c.json({ message: 'Coil deleted', data: deletedCoil });
    } catch (error) {
      console.error('Error deleting coil:', error);
      return c.json({ error: 'Failed to delete coil' }, 500);
    }
  })
  .put("/update/:name", zValidator("json", UpdateCoilSchema), async (c) => {
    try {
      const name = c.req.param("name");
      const data = c.req.valid("json");
      const coilData = UpdateCoilSchema.parse(data);
      const [updatedCoil] = await db.update(coils).set({
        id: uuid(),
        coilName: coilData.coilName,
        ProductCode: coilData.ProductCode,
        coilDescription: coilData.coilDescription,
        unitRate: coilData.unitRate.toString(),
        wireGauge: coilData.wireGauge.toString()
      }).where(eq(coils.coilName, name)).returning();
      return c.json({ message: 'Coil updated', data: updatedCoil });
    } catch (error) {
      console.error('Error updating coil:', error);
      return c.json({ error: 'Failed to update coil' }, 500);
    }
  });

export { coil };
