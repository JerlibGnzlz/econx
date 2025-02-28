import NextAuth, { NextAuthOptions, DefaultSession, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Definir un tipo personalizado de sesión con 'id'
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

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
                    return null; // Retorna `null` en lugar de lanzar un error
                }

                const user: User & { id: string } = {
                    id: "1",
                    name: "Usuario Prueba",
                    email: credentials.email,
                };

                if (credentials.email === "test@example.com" && credentials.password === "password123") {
                    return user;
                }

                return null; // Retorna `null` si las credenciales son incorrectas
            }

        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token?.id) {
                session.user.id = token.id as string; // Ahora TypeScript sabe que `id` existe
            }
            return session;
        },
        async jwt({ token, user }: { token: JWT; user?: User & { id: string } }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    }
};
