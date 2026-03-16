import { sql } from "drizzle-orm";
import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["customer", "admin"]);

export const users = pgTable(
    "users",
    {
    id: t.uuid("id").primaryKey().defaultRandom(),
    name: t.varchar({length: 50}).notNull(),
    email: t.varchar({length: 255}).notNull().unique(),
    password: t.text("password").notNull(),
    role: rolesEnum().notNull(),
    phone: t.varchar({length: 20}),
    created_at: t.timestamp("created_at").defaultNow().notNull(),
    updated_at: t.timestamp("updated_at").defaultNow().notNull(),
});

export const hotels = pgTable(
    "hotels",
    {
    id: t.uuid("id").primaryKey().defaultRandom(),
    owner_id: t.uuid("owner_id").references(() => users.id).notNull(),
    name: t.varchar({length: 100}).notNull(),
    description: t.text("description"),
    city: t.varchar("city", { length: 100 }).notNull(),
    country: t.varchar("country", { length: 100 }).notNull(),
    amenities: t.jsonb("amenities").default([]),
    rating: t.decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
    total_reviews: t.integer("total_reviews").default(0),
    created_at: t.timestamp("created_at").defaultNow(),
    updated_at: t.timestamp("updated_at").defaultNow(),
    }
)

export const room_types = pgTable(
    "room_types",
    {
    id: t.uuid("id").primaryKey().defaultRandom(),
    name: t.varchar("name",{length: 50}).notNull().unique(),
    }
)

export const rooms = pgTable(
    "rooms",
    {
    id: t.uuid("id").primaryKey().defaultRandom(),
    hotel_id: t.uuid("hotel_id").references(() => hotels.id).notNull(),
    room_number: t.varchar("room_number",{length: 20}).notNull(),
    room_type: t.uuid("room_type_id").notNull().references(() => room_types.name),
    price_per_night: t.decimal("price_per_night", { precision: 10, scale: 2 }).notNull(),
    max_occupancy: t.integer("max_occupancy").notNull(),
    created_at: t.timestamp("created_at").defaultNow(),
    updated_at: t.timestamp("updated_at").defaultNow(),
    },
    (table) => {
        return [
            t.unique().on(table.hotel_id, table.room_number)
        ];
    }
)

export const statusEnum = pgEnum("booking_status", ["pending", "confirmed", "cancelled", "completed"]);

export const bookings = pgTable(
    "bookings",
    {
    id: t.uuid("booking_id").primaryKey().defaultRandom(),
    user_id: t.uuid("user_id").references(() => users.id).notNull(),
    room_id: t.uuid("room_id").references(() => rooms.id).notNull(),
    hotel_id: t.uuid("hotel_id").references(() => hotels.id).notNull(),
    guests: t.integer("guests").notNull(),
    check_in_date: t.date("check_in_date").notNull(),
    check_out_date: t.date("check_out_date").notNull(),
    total_price: t.decimal("total_price", { precision: 10, scale: 2 }).notNull(),
    status: statusEnum().default("pending").notNull(),
    booking_date: t.timestamp("booking_date").defaultNow().notNull(),
    cancelled_at: t.timestamp("cancelled_at"),
    },
    (table) => {
        return [
            t.check(
                "checkout_after_checkin",
                sql`${table.check_out_date} > ${table.check_in_date}`
            )
        ];
    }
)

export const reviews = pgTable(
    "reviews",
    {
        id: t.uuid("id").primaryKey().defaultRandom(),
        user_id: t.uuid("user_id").references(() => users.id).notNull(),
        hotel_id: t.uuid("hotel_id").references(() => hotels.id).notNull(),
        booking_id: t.uuid("booking_id").references(() => bookings.id).notNull(),
        rating: t.decimal("rating", { precision: 2, scale: 1 }).default("0.0").notNull(),
        comment: t.text("comment"),
        created_at: t.timestamp("created_at").defaultNow().notNull(),
    },
    (table) => {
        return [
            t.check(
                "rating_range",
                sql`${table.rating} >= 1 AND ${table.rating} <= 5`
            )
        ];
    }
)
export const refreshTokens = pgTable("refresh_tokens", {
  id:        t.serial("id").primaryKey(),
  token:     t.text("token").notNull().unique(),
  userId:    t.uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: t.timestamp("expires_at").notNull(),
  createdAt: t.timestamp("created_at").defaultNow(),
});