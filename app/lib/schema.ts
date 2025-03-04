import { pgTable, serial, varchar, decimal, timestamp, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Cliente (Usuario)
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

// Producto - Con relación al usuario
export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 1000 }),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    image: varchar("image", { length: 255 }),
    userId: integer("user_id").references(() => users.id), // Relación con el usuario
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

// Relaciones
export const usersRelations = relations(users, ({ many }) => ({
    products: many(products),
    orders: many(orders),
}))

export const productsRelations = relations(products, ({ one }) => ({
    user: one(users, {
        fields: [products.userId],
        references: [users.id],
    }),
}))

// Tabla de pedidos (para referencia futura)
export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    userId: serial("user_id").references(() => users.id),
    status: varchar("status", { length: 50 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export const ordersRelations = relations(orders, ({ one }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
}))

