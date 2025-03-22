// import type React from "react"
// import "./globals.css"
// import { Toaster } from "sonner"
// import { Navbar } from "./components/Navbar"
// import { db } from "./lib/db";
// import { Providers } from "./providers";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "./utils/query-client";



// export const metadata = {
//     title: "Online Shop",
//     description: "Aplicación ecoommerce",
// }
// async function testDBConnection() {
//     try {
//         await db.execute("SELECT 1");
//         console.log("✅ Conectado a la base de datos correctamente.");
//     } catch (error) {
//         console.error("Error al conectar a la base de datos:", error);
//     }
// }

// export default function RootLayout({
//     children,
// }: {
//     children: React.ReactNode
// }) {
//     return (
//         <QueryClientProvider client={queryClient}>
//             <html lang="es">
//                 <body className="bg-gray-100" >
//                     <Providers>
//                         <Navbar />
//                         {children}
//                         <Toaster position="top-right" />
//                     </Providers>
//                 </body>
//             </html>
//         </QueryClientProvider>
//     )
// }

import type React from "react"
import "./globals.css"
import { Navbar } from "./components/Navbar"
import { db } from "./lib/db"
import { Providers } from "./providers"

export const metadata = {
    title: "Online Shop",
    description: "Aplicación ecoommerce",
}

async function testDBConnection() {
    try {
        await db.execute("SELECT 1")
        console.log("✅ Conectado a la base de datos correctamente.")
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error)
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Prueba la conexión a la base de datos (opcional)
    testDBConnection()

    return (
        <html lang="es">
            <body className="bg-gray-100">
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    )
}

