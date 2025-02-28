// import "@/app/globals.css"; 
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { RegisterForm } from "./(auth)/register/formulario";
// import RegisterForm from "./(auth)/register/formulario";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className="bg-gray-100">
                <Navbar />
                <main className="container mx-auto p-4">
                    {children}
                    <RegisterForm />
                </main>
            </body>
        </html>
    );
}