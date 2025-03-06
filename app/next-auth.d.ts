// import "next-auth"
// import type { DefaultSession } from "next-auth"

// declare module "next-auth" {
//     interface Session {
//         user: {
//             id: string
//             role: string
//             isAdmin: boolean
//         } & DefaultSession["user"]
//     }

//     interface User {
//         role: string
//         isAdmin: boolean
//     }
// }

import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: string
        email: string
        name: string | null
        role: string
        isAdmin?: boolean // Si no es obligatorio, usa `?`
    }

    interface Session {
        user: User
    }
}
