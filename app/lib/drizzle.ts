// import { dotenv } from 'dotenv';
// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// // import { users } from './schema';

// const client = postgres(process.env.DATABASE_URL!, { ssl: 'require' });
// export const db = drizzle(client);


import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema"; // 👈 Importamos el esquema definido en schema.ts
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema }); // 👈 Agregamos el esquema aquí
