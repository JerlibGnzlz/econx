import { db } from "./db"
import { products, type Product } from "./schema"
import { desc, eq, sql } from "drizzle-orm"

export async function getProducts(limit = 10, offset = 0): Promise<Product[]> {
    return await db.select().from(products).limit(limit).offset(offset).orderBy(desc(products.createdAt))
}

export async function getProductById(id: number): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id))
    return result[0]
}

export async function searchProducts(query: string): Promise<Product[]> {
    return await db
        .select()
        .from(products)
        .where(sql`${products.name} ILIKE ${`%${query}%`}`)
}

