import { Hono } from "hono";
import { db } from "../db";
import { zValidator } from "@hono/zod-validator";
import { CreateOrderSchema, UpdateOrderSchema} from "../types/order";
import { orders } from "../db/schema/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';

const getAllOrder = async () => {
  try {
    const data = await db.select().from(orders);
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};

const order = new Hono()
  .get("/list-order", async (c) => {
    const order = await getAllOrder();
    return c.json({ order: order });
  })
  .post("/create-order", zValidator("json", CreateOrderSchema), async (c) => {
    const { coilName, orderDate, reqDate, quantity, amount } = c.req.valid('json');
    try {
      const [newOrder] = await db.insert(orders).values({
        id: uuidv4(),
        coilName,
        orderDate,
        reqDate,
        quantity,
        amount
      }).returning();
      return c.json({ message: 'Order created', order: newOrder });
    } catch (error) {
      console.error('Error creating order:', error);
      return c.json({ error: 'Failed to create order' }, 500);
    }
  })
  .put("/update-order/:id", zValidator("json", UpdateOrderSchema), async (c) => {
    const { id } = c.req.param();
    const updateData = c.req.valid('json');
    try {
      const [updatedOrder] = await db.update(orders)
        .set(updateData)
        .where(eq(orders.id, id))
        .returning();
      return c.json({ message: 'Order updated', order: updatedOrder });
    } catch (error) {
      console.error('Error updating order:', error);
      return c.json({ error: 'Failed to update order' }, 500);
    }
  })
  .delete("/delete-order/:id", async (c) => {
    const { id } = c.req.param();
    try {
      const [deletedOrder] = await db.delete(orders)
        .where(eq(orders.id, id))
        .returning();
      return c.json({ message: 'Order deleted', order: deletedOrder });
    } catch (error) {
      console.error('Error deleting order:', error);
      return c.json({ error: 'Failed to delete order' }, 500);
    }
  });

export { order };
