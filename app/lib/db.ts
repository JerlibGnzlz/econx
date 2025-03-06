import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"
import "dotenv/config"
import { neon } from "@neondatabase/serverless"

// Usar la variable de entorno para la conexión
const connectionString = process.env.DATABASE_URL || ""

const sql = neon(connectionString)

export const db = drizzle(sql, { schema }) // Conectar Drizzle con el esquema


