ALTER TABLE "room_types" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "room_types" CASCADE;--> statement-breakpoint
ALTER TABLE "rooms" RENAME COLUMN "room_type_id" TO "room_type";--> statement-breakpoint

