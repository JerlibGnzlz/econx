"use client"

import { QueryClient } from "@tanstack/react-query"

// Crea una instancia del cliente de consulta
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 minutos
        },
    },
})

