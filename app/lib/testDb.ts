import sql from "./db";

async function testConnection() {
    try {
        const result = await sql`SELECT 1+1 AS result;`;
        console.log("✅ Conexión exitosa:", result);
    } catch (error) {
        console.error("❌ Error en la conexión a la base de datos:", error);
    }
}

testConnection();
