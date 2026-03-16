ALTER TABLE "bookings" RENAME COLUMN "id" TO "booking_id";--> statement-breakpoint
ALTER TABLE "rooms" RENAME COLUMN "room_type" TO "room_type_id";--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_booking_id_bookings_id_fk";
--> statement-breakpoint
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_room_type_room_types_name_fk";
--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_room_type_id_room_types_name_fk" FOREIGN KEY ("room_type_id") REFERENCES "public"."room_types"("name") ON DELETE no action ON UPDATE no action;