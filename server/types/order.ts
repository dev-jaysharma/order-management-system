import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

export const OrderSchema = z.object({
  id: z.string().uuid().default(uuidv4()),
  coilName: z.string(),
  orderDate: z.string().datetime(),
  reqDate: z.string(),
  quantity: z.string(),
  amount: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;
export const CreateOrderSchema = OrderSchema.omit({ id: true });
export const UpdateOrderSchema = OrderSchema.omit({ id: true });