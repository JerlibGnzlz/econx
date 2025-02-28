import { migrate } from "drizzle-orm/node-postgres/migrator"
import { db } from "./index"

// Esta función se puede ejecutar desde un script de línea de comandos
export async function runMigrations() {
    console.log("Running migrations...")

    await migrate(db, { migrationsFolder: "drizzle" })

    console.log("Migrations completed!")

    process.exit(0)
}

// Si este archivo se ejecuta directamente
if (require.main === module) {
    runMigrations().catch((err) => {
        console.error("Migration failed:", err)
        process.exit(1)
    })
}

