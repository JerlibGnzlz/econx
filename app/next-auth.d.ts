import "next-auth"
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: string
            isAdmin: boolean
        } & DefaultSession["user"]
    }

    interface User {
        role: string
        isAdmin: boolean
    }
}

