import { z } from "zod";

const OrderSchema = z.object({
  id: z.string(),
  name: z.string(),
  wire_gauge: z.number(),
  coil_weight: z.number(),
  total_set_weight: z.number(),
});

type Order = z.infer<typeof OrderSchema>;
const CreateOrderSchema = OrderSchema.omit({ id: true });
const UpdateOrderSchema = OrderSchema.omit({ id: true });

export type { Order}
export { OrderSchema, CreateOrderSchema, UpdateOrderSchema };