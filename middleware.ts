
// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//     pages: {
//         signIn: "/login", // Redirigir a login si el usuario no está autenticado
//     },
// });

// export const config = {
//     matcher: ["/dashboard/:path*"], // Rutas que requieren autenticación
// };


/* -------------------------------------------------------------------------- */

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta";

// export function middleware(req: NextRequest) {
//     const token = req.cookies.get("token")?.value;

//     if (!token) {
//         return NextResponse.redirect(new URL("/login", req.url));
//     }

//     try {
//         jwt.verify(token, SECRET_KEY);
//         return NextResponse.next();
//     } catch (error) {
//         return NextResponse.redirect(new URL("/login", req.url));
//     }
// }

// export const config = {
//     matcher: ["/dashboard/:path*"], // Protege todas las rutas dentro de /dashboard
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        jwt.verify(token, SECRET_KEY);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"], // Protege todas las rutas dentro de /dashboard
};
