import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: string
        email: string
        name: string | null
        role: string
        isAdmin?: boolean // Si no es obligatorio, usa `?`
    }


    //     interface Session {
    //         user: User
    //     }
    // }

    interface Session extends DefaultSession {
        user: {
            id: string
            email: string
            name?: string | null
            role?: string
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        role?: string
    }
}
