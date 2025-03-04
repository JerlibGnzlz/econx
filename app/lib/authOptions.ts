import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserByEmail, verifyPassword } from "./userServices"




export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email y contraseña son requeridos")
                }

                try {
                    const user = await getUserByEmail(credentials.email)

                    if (!user || !(await verifyPassword(user, credentials.password))) {
                        throw new Error("Credenciales inválidas")
                    }

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        isAdmin: user.isAdmin,
                    }
                } catch (error) {
                    console.error("Error en autenticación:", error)
                    throw error
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.isAdmin = user.isAdmin
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub as string
                session.user.role = token.role as string
                session.user.isAdmin = token.isAdmin as boolean
            }
            return session
        },
    },
    pages: {
        signIn: "/aut/login",
        error: "/auth/login",
        // signIn: "/login",
        // error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 días
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

