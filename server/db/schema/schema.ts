import { sqliteTable, text, integer, real, numeric } from 'drizzle-orm/sqlite-core';
import { v4 as uuidv4 } from 'uuid';

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  coilName: text('coil_name').notNull(),
  orderDate: text('order_date').notNull(),
  reqDate: text('req_date').notNull(),
  quantity: text('quantity').notNull(),
  amount: numeric('amount').notNull(),
});

export const coils = sqliteTable('coils', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  coilName: text('coil_name').notNull(),
  ProductCode: text('product_code').notNull(),
  coilDescription: text('coil_description').notNull(),
  unitRate: numeric('unit_rate').notNull(),
  wireGauge: numeric('wire_gauge').notNull(),
});

export const wires = sqliteTable('wires', {
  id: text('id').primaryKey().$defaultFn(() => uuidv4()),
  gauge: numeric('gauge').notNull(),
  boxes: integer('boxes').notNull(),
  weight: numeric('weight').notNull(),
  deliveredOn: text('delivered_on').notNull(),
  isUsed: integer('is_used', { mode: 'boolean' }).notNull().default(false),
});