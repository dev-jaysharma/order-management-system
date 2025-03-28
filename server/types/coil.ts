import { z } from "zod";

type Coil = z.infer<typeof CoilSchema>;
const CoilSchema = z.object({
  id: z.string(),
  name: z.string(),
  wire_gauge: z.number(),
  coil_weight: z.number(),
  total_set_weight: z.number(),
});

const CreateCoilSchema = CoilSchema.omit({ id: true });

export type { Coil };
export { CoilSchema, CreateCoilSchema };