ALTER TABLE `coil` RENAME TO `coils`;--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`coil_name` text NOT NULL,
	`order_date` text NOT NULL,
	`req_date` text NOT NULL,
	`quantity` text NOT NULL,
	`amount` numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE `wires` (
	`id` text PRIMARY KEY NOT NULL,
	`gauge` numeric NOT NULL,
	`boxes` integer NOT NULL,
	`weight` numeric NOT NULL,
	`delivered_on` text NOT NULL,
	`is_used` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_coils` (
	`id` text PRIMARY KEY NOT NULL,
	`coil_name` text NOT NULL,
	`product_code` text NOT NULL,
	`coil_description` text NOT NULL,
	`unit_rate` numeric NOT NULL,
	`wire_gauge` numeric NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_coils`("id", "coil_name", "product_code", "coil_description", "unit_rate", "wire_gauge") SELECT "id", "coil_name", "product_code", "coil_description", "unit_rate", "wire_gauge" FROM `coils`;--> statement-breakpoint
DROP TABLE `coils`;--> statement-breakpoint
ALTER TABLE `__new_coils` RENAME TO `coils`;--> statement-breakpoint
PRAGMA foreign_keys=ON;