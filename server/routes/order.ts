import { Hono } from "hono";
import { db } from "../db";
import { zValidator } from "@hono/zod-validator";
import { CreateOrderSchema, UpdateOrderSchema} from "../types/order";
import { orders } from "../db/schema/schema";

const getAllOrder = async () => {
  const data = await db.select().from(orders);
  return data;
};

const order = new Hono()
  .get("/list-order", async (c) => {
    const order = await getAllOrder();
    return c.json({ order: order });
  })
  .post("/create-order", zValidator("json", CreateOrderSchema), (c) => {
    const { coilName, orderDate, reqDate, quantity, amount } = c.req.json();
      return c.json({ message: "create-order" });
  })
  .put("/update-order", zValidator("json", UpdateOrderSchema), (c) => {
    return c.json({ message: "update-order" });
  })
  .delete("/delete-order", (c) => {
    return c.json({ message: "delete-order" });
  });

export { order };
