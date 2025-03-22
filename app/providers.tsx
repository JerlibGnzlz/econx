

// "use client"

// import type React from "react"

// import { Toaster } from "sonner"

// export function Providers({ children }: { children: React.ReactNode }) {
//     return (
//         <>
//             <Toaster position="top-right" richColors />
//             {children}
//         </>
//     )
// }

"use client"

import type React from "react"
import { Toaster } from "sonner"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "./utils/query-client"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster position="top-right" richColors />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

