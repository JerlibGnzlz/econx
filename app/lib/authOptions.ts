// import NextAuth, { type NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { getUserByEmail, verifyPassword } from "./userServices"




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
//                         throw new Error("Credenciales inválidas")
//                     }

//                     return {
//                         id: user.id.toString(),
//                         name: user.name,
//                         email: user.email,
//                         role: user.role,
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
//                 session.user.role = token.role as string
//                 session.user.isAdmin = token.isAdmin as boolean
//             }
//             return session
//         },
//     },
//     pages: {
//         signIn: "/aut/login",
//         error: "/auth/login",
//         // signIn: "/login",
//         // error: "/login",
//     },
//     session: {
//         strategy: "jwt",
//         maxAge: 30 * 24 * 60 * 60, // 30 días
//     },
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }



import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { db } from "./db"
import { users } from "./schema"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("CredentialsSignin")
                }

                const user = await db.query.users.findFirst({
                    where: eq(users.email, credentials.email),
                })

                if (!user || !user.password) {
                    throw new Error("CredentialsSignin")
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

                if (!isPasswordValid) {
                    throw new Error("CredentialsSignin")
                }

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name || null,
                    role: user.role || "user",
                }
            },
        }),
        // Configuración simplificada de Google
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        // Configuración simplificada de GitHub
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
    ],

    callbacks: {
        async jwt({ token, user, account }) {
            // Cuando el usuario inicia sesión por primera vez
            if (user) {
                token.id = user.id
                token.role = user.role || "user"
                token.image = user.image || null;
            }

            // Si es un proveedor OAuth, podemos manejar la creación/actualización del usuario aquí
            if (account && account.provider && (account.provider === "google" || account.provider === "github")) {
                // Aquí podrías implementar lógica para crear o actualizar el usuario en tu base de datos
                if (user.image) {
                    token.image = user.image
                }
                console.log("OAuth login:", account.provider)
                // console.log("OAuth login:", account.provider, token.email)
            }

            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string
                session.user.role = (token.role as string) || "user"
                session.user.image = token.image as string | null;
            }
            return session
        },
        async signIn({ user, account, profile }) {
            // Verificar que el usuario tiene un email (requerido para algunos proveedores)
            if (!user.email) {
                return false
            }

            // Si es un proveedor OAuth, podemos manejar la creación/actualización del usuario aquí
            if (account && (account.provider === "google" || account.provider === "github")) {
                try {
                    // Buscar si el usuario ya existe
                    const existingUser = await db.query.users.findFirst({
                        where: eq(users.email, user.email),
                    })

                    if (!existingUser) {
                        // Crear un nuevo usuario si no existe
                        // IMPORTANTE: Solo incluimos las columnas que existen en la base de datos
                        await db.insert(users).values({
                            email: user.email,
                            name: user.name || "",
                            role: "user",
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        })
                        console.log(`Nuevo usuario creado desde ${account.provider}: ${user.email}`)
                    }
                } catch (error) {
                    console.error("Error al procesar inicio de sesión OAuth:", error)
                    return false
                }
            }

            return true
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 días
    },
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
}

