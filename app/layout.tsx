import type React from "react"
import "./globals.css"
import { AuthProvider } from "./providers"
// import { Navbar } from "./components/navbar"
import { Toaster } from "sonner"
import { Navbar } from "./components/Navbar"
import { db } from "./lib/db";



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
                <AuthProvider>
                    <Navbar />
                    {children}
                    <Toaster position="top-right" />
                </AuthProvider>
            </body>
        </html>
    )
}

