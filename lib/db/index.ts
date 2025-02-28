import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

// Crear una pool de conexiones a la base de datos
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

// Crear una instancia de Drizzle con el esquema
export const db = drizzle(pool, { schema })

