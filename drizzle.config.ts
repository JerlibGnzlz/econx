import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import { parse } from "pg-connection-string";

// Parsea la conexión
const dbConfig = parse(process.env.DATABASE_URL!);

export default defineConfig({
    dialect: "postgresql",
    schema: "./app/lib/schema.ts",
    out: "./drizzle/migrations", // Directorio de migraciones
    dbCredentials: {
        host: dbConfig.host!,
        port: dbConfig.port ? parseInt(dbConfig.port) : undefined,
        user: dbConfig.user!,
        password: dbConfig.password!,
        database: dbConfig.database!,
        ssl: dbConfig.ssl ? { rejectUnauthorized: false } : undefined,
    },
});
