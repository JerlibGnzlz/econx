import { pgTable, serial, varchar, decimal, timestamp, integer, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Cliente (Usuario)
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }),
    isAdmin: boolean("is_admin").default(false),
    role: varchar("role", { length: 50 }).default("user"),
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

// Tabla de pedidos
export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
        .references(() => users.id)
        .notNull(),
    status: varchar("status", { length: 50 }).notNull().default("pendiente"),
    date: timestamp("date").defaultNow(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

// Tabla de detalles de pedido
export const orderDetails = pgTable("order_details", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
        .references(() => orders.id)
        .notNull(),
    productId: integer("product_id")
        .references(() => products.id)
        .notNull(),
    quantity: integer("quantity").notNull().default(1),
    unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

// Relaciones
export const usersRelations = relations(users, ({ many }) => ({
    products: many(products),
    orders: many(orders),
}))

export const productsRelations = relations(products, ({ one, many }) => ({
    user: one(users, {
        fields: [products.userId],
        references: [users.id],
    }),
    orderDetails: many(orderDetails),
}))

export const ordersRelations = relations(orders, ({ one, many }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
    }),
    details: many(orderDetails),
}))

export const orderDetailsRelations = relations(orderDetails, ({ one }) => ({
    order: one(orders, {
        fields: [orderDetails.orderId],
        references: [orders.id],
    }),
    product: one(products, {
        fields: [orderDetails.productId],
        references: [products.id],
    }),
}))

