import { integer, pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users",{

    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar({length: 50}).notNull(),
    
});