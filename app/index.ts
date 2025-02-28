import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { users } from './lib/schema';
import type { InferInsertModel } from 'drizzle-orm'; // Importación correcta

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    // ✅ Usamos InferInsertModel en lugar de `$inferInsert`
    const user: InferInsertModel<typeof users> = {
        name: 'John', // Asegúrate de que los nombres de las columnas coincidan con el schema
        email: 'john@example.com',
        password: 'hashedpassword123', // Debe incluir password si es requerido en el schema
    };

    await db.insert(users).values(user);
    console.log('New user created!');

    const allUsers = await db.select().from(users);
    console.log('Getting all users from the database: ', allUsers);

    await db
        .update(users)
        .set({
            password: 'newhashedpassword123', // Corrige el campo que deseas actualizar
        })
        .where(eq(users.email, user.email));
    console.log('User info updated!');

    await db.delete(users).where(eq(users.email, user.email));
    console.log('User deleted!');
}

main();
