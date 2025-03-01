import { loginUser } from "@/app/lib/userServices";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const response = await loginUser(email, password);
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error en el login:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}



/* -------------------------------------------------------------------------- */

// import { NextResponse } from "next/server";
// import { db } from "@/app/lib/db";
// import { users } from "@/app/lib/schema";
// import { eq } from "drizzle-orm";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"; // Importar JWT
// import { loginUser } from "@/app/lib/userServices";

// const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta"; // Usa una variable de entorno segura

// export async function POST(req: Request) {
//     try {
//         const { email, password } = await req.json();

//         if (!email || !password) {
//             return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
//         }

//         // Verificar si el usuario existe
//         const user = await db.select().from(users).where(eq(users.email, email));

//         if (user.length === 0) {
//             return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
//         }

//         // Comparar la contraseña hasheada
//         const validPassword = await bcrypt.compare(password, user[0].password);

//         if (!validPassword) {
//             return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
//         }

//         // Generar el token JWT
//         const token = jwt.sign({ userId: user[0].id, email: user[0].email }, SECRET_KEY, {
//             expiresIn: "1h", // Expira en 1 hora
//         });

//         // Guardar el token en una cookie HTTP-only (mejor para seguridad)
//         const response = NextResponse.json({ message: "Inicio de sesión exitoso" }, { status: 200 });
//         response.cookies.set("token", token, { httpOnly: true, secure: true, path: "/" });

//         return response;
//     } catch (error) {
//         console.error("❌ Error en el login:", error);
//         return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 });
//     }
// }




// // export async function POST(req: Request) {
// //     try {
// //         const { email, password } = await req.json();

// //         if (!email || !password) {
// //             return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
// //         }

// //         const { token } = await loginUser(email, password);

// //         const response = NextResponse.json({ message: "Inicio de sesión exitoso" }, { status: 200 });
// //         response.cookies.set("token", token, { httpOnly: true, secure: true, path: "/" });

// //         return response;
// //     } catch (error: any) {
// //         return NextResponse.json({ error: error.message }, { status: 401 });
// //     }
// // }
