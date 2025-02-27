import { Button } from "./Button";

export function Navbar() {
    return (
        <nav className="bg-slate-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">Tienda Online</h1>
                <div className="space-x-4">
                    <Button variant="outline">Iniciar Sesión</Button>
                    <Button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Registrarse
                    </Button>
                </div>
            </div>
        </nav >
    );
}