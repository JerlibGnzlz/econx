import "./globals.css";
import { Navbar } from "./components/Navbar";
import { RegisterForm } from "./(auth)/register/formulario";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
                <main className="container mx-auto p-4">
                    {children}
                    <RegisterForm />
                </main>
            </body>
        </html>
    );
}
