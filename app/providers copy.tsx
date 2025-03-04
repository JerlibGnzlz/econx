// "use client"

// import type React from "react"

// import { SessionProvider } from "next-auth/react"

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//     return <SessionProvider>{children}</SessionProvider>
// }

"use client"

import type React from "react"

import { Toaster } from "sonner"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Toaster position="top-right" richColors />
            {children}
        </>
    )
}

