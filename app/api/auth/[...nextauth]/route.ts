// import { getUserByEmail, verifyPassword } from "@/app/lib/userServices"
// import NextAuth, { type NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"


// export const authOptions: NextAuthOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error("Email y contraseña son requeridos")
//                 }

//                 try {
//                     const user = await getUserByEmail(credentials.email)

//                     if (!user || !(await verifyPassword(user, credentials.password))) {
//                         throw new Error("Email o contraseña incorrectos")
//                     }

//                     // Validar que el rol sea correcto
//                     if (user.role !== "user" && user.role !== "admin") {
//                         throw new Error("Rol no válido")
//                     }

//                     return {
//                         id: user.id.toString(),
//                         name: user.name,
//                         email: user.email,
//                         role: user.role as "user" | "admin", // Forzar el tipo correcto
//                         isAdmin: user.isAdmin,
//                     }
//                 } catch (error) {
//                     console.error("Error en autenticación:", error)
//                     throw error
//                 }
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.role = user.role
//                 token.isAdmin = user.isAdmin
//             }
//             return token
//         },
//         async session({ session, token }) {
//             if (token && session.user) {
//                 session.user.id = token.sub as string
//                 session.user.role = token.role as "user" | "admin" // Corregir el tipo
//                 session.user.isAdmin = token.isAdmin as boolean
//             }
//             return session
//         },
//     },
//     pages: {
//         signIn: "/auth/login",
//         error: "/auth/login",
//     },
//     session: {
//         strategy: "jwt",
//         maxAge: 30 * 24 * 60 * 60, // 30 días
//     },
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }

import { authOptions } from "@/app/lib/authOptions";
import NextAuth from "next-auth";
// import { authOptions } from "@/app/lib/authOptions"; // Importamos la configuración

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// 🔹 Forzar que Next.js use Node.js en lugar de Edge Runtime
// export const config = {
//     runtime: "nodejs",
// };
