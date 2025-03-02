import { pgTable, serial, boolean, text, varchar, decimal, timestamp, integer } from "drizzle-orm/pg-core"

// Definir la tabla de usuarios
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    role: text("role").notNull().default("user"),
    isAdmin: boolean("is_admin").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Tipos derivados de la tabla
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

// Tabla de productos existente
export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    image: text("image_url"),
    stock: integer("stock").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Tipos para los productos
export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

