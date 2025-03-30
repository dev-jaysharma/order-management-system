import { Hono } from 'hono';
import { db } from '../db';
import { zValidator } from '@hono/zod-validator';
import { CreateWireSchema, UpdateWireSchema } from '../types/wire';
import { wires } from '../db/schema/schema';
import { eq } from 'drizzle-orm';

const wire = new Hono()
  .get('/', async (c) => {
    try {
      const wiresData = await db.select().from(wires);
      return c.json({ data: wiresData });
    } catch (error) {
      return c.json({ error: 'Failed to fetch wires' }, 500);
    }
  })
  .post('/', zValidator('json', CreateWireSchema), async (c) => {
    try {
      const data = c.req.valid('json');
      const wireData = CreateWireSchema.parse(data);
      const [newWire] = await db.insert(wires).values({
        gauge: wireData.gauge.toString(),
        boxes: wireData.boxes,
        weight: wireData.weight.toString(),
        deliveredOn: wireData.deliveredOn,
        isUsed: wireData.isUsed
      }).returning();
      return c.json({ message: 'Wire created', data: newWire });
    } catch (error) {
      console.error('Error creating wire:', error);
      return c.json({ error: 'Failed to create wire' }, 500);
    }
  })
  .get('/search/:id', async (c) => {
    try {
      const id = c.req.param('id');
      const [wire] = await db.select()
        .from(wires)
        .where(eq(wires.id, id));
      if (!wire) {
        return c.json({ error: 'Wire not found' }, 404);
      }
      return c.json({ data: wire });
    } catch (error) {
      console.error('Error searching wire:', error);
      return c.json({ error: 'Failed to search wire' }, 500);
    }
  })
  .delete('/delete/:id', async (c) => {
    try {
      const id = c.req.param('id');
      const [deletedWire] = await db.delete(wires)
        .where(eq(wires.id, id))
        .returning();
      return c.json({ message: 'Wire deleted', data: deletedWire });
    } catch (error) {
      console.error('Error deleting wire:', error);
      return c.json({ error: 'Failed to delete wire' }, 500);
    }
  })
  .put('/update/:id', zValidator('json', UpdateWireSchema), async (c) => {
    try {
      const id = c.req.param('id');
      const data = c.req.valid('json');
      const wireData = UpdateWireSchema.parse(data);
      const [updatedWire] = await db.update(wires).set({
        gauge: wireData.gauge.toString(),
        boxes: wireData.boxes,
        weight: wireData.weight.toString(),
        deliveredOn: wireData.deliveredOn,
        isUsed: wireData.isUsed
      }).where(eq(wires.id, id)).returning();
      return c.json({ message: 'Wire updated', data: updatedWire });
    } catch (error) {
      console.error('Error updating wire:', error);
      return c.json({ error: 'Failed to update wire' }, 500);
    }
  });

export { wire };