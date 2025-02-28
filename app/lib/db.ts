// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import { config } from "dotenv";


// config(); // Cargar variables de entorno

// if (!process.env.DATABASE_URL) {
//     throw new Error("❌ DATABASE_URL no está definido en las variables de entorno");
// }

// const sql = neon(process.env.DATABASE_URL);
// export const db = drizzle(sql);

// // 🔍 Probar la conexión
// (async () => {
//     try {
//         const result = await db.execute("SELECT 1 + 1 AS result");
//         console.log("✅ Conexión exitosa a la base de datos:", result);
//     } catch (error) {
//         console.error("❌ Error de conexión a la base de datos:", error);
//     }
// })();

import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);

export default sql;


