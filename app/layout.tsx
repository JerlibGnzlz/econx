import "./globals.css";
import { Navbar } from "./components/Navbar";
import { RegisterForm } from "./(auth)/register/formulario";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "./lib/db";
import { Sidebar } from "./components/Sidebar";

async function testDBConnection() {
    try {
        await db.execute("SELECT 1");
        console.log("✅ Conectado a la base de datos correctamente.");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

testDBConnection();


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions) || null;

    return (
        <html lang="es">
            <body className="bg-gray-100">
                <Navbar session={session} />
                <Sidebar />
                <main className="container mx-auto p-4">
                    {children}
                </main>
            </body>
        </html>
    );
}
