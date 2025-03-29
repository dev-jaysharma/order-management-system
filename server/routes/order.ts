import { Hono } from "hono";
import { db } from "../db";
import { zValidator } from "@hono/zod-validator";
import { CreateOrderSchema, UpdateOrderSchema } from "../types/order";

const order = new Hono()
  .get("/list-order", (c) => {
    return c.json({ message: "list-order" });
  })
  .post("/create-order", zValidator("json", CreateOrderSchema), (c) => {
    return c.json({ message: "create-order" });
  })
  .put("/update-order", zValidator("json", UpdateOrderSchema), (c) => {
    return c.json({ message: "update-order" });
  })
  .delete("/delete-order", (c) => {
    return c.json({ message: "delete-order" });
  });

export { order };
