import { Session } from "next-auth";


interface NavbarProps {
    session: Session | null;
}

export function Navbar({ session }: NavbarProps) {
    return (
        <nav className="bg-blue-500 text-white p-4">
            <h1 className="text-xl font-bold">Mi Aplicación</h1>
            {session ? (
                <p>Bienvenido, {session.user?.name}</p>
            ) : (
                <p>No has iniciado sesión</p>
            )}
        </nav>
    );
}
