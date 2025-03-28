import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const coilTable = sqliteTable("coil", {
  id: text("id").notNull().default("Hey!"),
  name: text("name").notNull(),
  wire_gauge: text("wire_gauge").notNull(),
  coil_weight: text("coil_weight").notNull(),
  total_set_weight: text("total_set_weight").notNull(), 
});

