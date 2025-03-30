import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

export const CoilSchema = z.object({
  id: z.string().uuid().default(uuidv4()),
  coilName: z.string(),
  ProductCode: z.string(),
  coilDescription: z.string(),
  unitRate: z.string(),
  wireGauge: z.string(),
});

export type Coil = z.infer<typeof CoilSchema>;
export const CreateCoilSchema = CoilSchema.omit({ id: true });
export const UpdateCoilSchema = CoilSchema.omit({ id: true });