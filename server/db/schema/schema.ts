import { numeric } from "drizzle-orm/sqlite-core";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const coilTable = sqliteTable("coil", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  wire_gauge: numeric("wire_gauge").notNull(),
  coil_weight: numeric("coil_weight").notNull(),
  total_set_weight: numeric("total_set_weight").notNull(),
});

