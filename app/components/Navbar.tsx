import { Button } from "./Button";

export function Navbar() {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">Tienda Online</h1>
                <div className="space-x-4">
                    <Button variant="outline">Iniciar Sesión</Button>
                    <Button>Registrarse</Button>
                </div>
            </div>
        </nav>
    );
}