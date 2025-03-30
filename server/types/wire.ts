import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

export const WireSchema = z.object({
  id: z.string().uuid().default(uuidv4()),
  gauge: z.string(),
  boxes: z.number(),
  weight: z.string(),
  deliveredOn: z.string().datetime(),
  isUsed: z.boolean().default(false),
});

export type Wire = z.infer<typeof WireSchema>;
export const CreateWireSchema = WireSchema.omit({ id: true });
export const UpdateWireSchema = WireSchema.omit({ id: true });