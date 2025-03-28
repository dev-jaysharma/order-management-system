ALTER TABLE `foo` RENAME TO `coil`;--> statement-breakpoint
ALTER TABLE `coil` RENAME COLUMN "bar" TO "id";--> statement-breakpoint
ALTER TABLE `coil` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `coil` ADD `wire_gauge` text NOT NULL;--> statement-breakpoint
ALTER TABLE `coil` ADD `coil_weight` text NOT NULL;--> statement-breakpoint
ALTER TABLE `coil` ADD `total_set_weight` text NOT NULL;