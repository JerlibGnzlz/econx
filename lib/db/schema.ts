import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core"
import type { InferSelectModel } from "drizzle-orm"

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type User = InferSelectModel<typeof users>

