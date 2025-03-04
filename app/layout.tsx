import type React from "react"
import "./globals.css"
import { Toaster } from "sonner"
import { Navbar } from "./components/Navbar"
import { db } from "./lib/db";
import { Providers } from "./providers copy";



export const metadata = {
    title: "Online Shop",
    description: "Aplicación ecoommerce",
}
async function testDBConnection() {
    try {
        await db.execute("SELECT 1");
        console.log("✅ Conectado a la base de datos correctamente.");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body className="bg-gray-100" >
                <Providers>
                    <Navbar />
                    {children}
                    <Toaster position="top-right" />
                </Providers>
                {/* <AuthProvider>
                    <Navbar />
                    {children}
                </AuthProvider> */}
            </body>
        </html>
    )
}