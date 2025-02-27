import { ChartBarIcon, UsersIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button } from "./components/Button";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-blue-600 text-white p-10 rounded-lg shadow-lg">
                <div>
                    <h1 className="text-4xl font-bold">Bienvenido al Dashboard</h1>
                    <p className="mt-2 text-lg">Gestiona tus productos, usuarios y ventas en un solo lugar.</p>
                    <Button className="mt-4 bg-white text-blue-600 hover:bg-gray-200">Explorar</Button>
                </div>
                <Image src="/dashboard-hero.png" width={400} height={300} alt="Dashboard preview" className="mt-4 md:mt-0" />
            </div>

            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <ChartBarIcon className="h-12 w-12 text-blue-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Ventas Totales</h2>
                        <p className="text-gray-600 text-lg">$15,240</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <UsersIcon className="h-12 w-12 text-green-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Usuarios Activos</h2>
                        <p className="text-gray-600 text-lg">1,245</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <ShoppingBagIcon className="h-12 w-12 text-purple-500" />
                    <div>
                        <h2 className="text-xl font-semibold">Productos en Catálogo</h2>
                        <p className="text-gray-600 text-lg">320</p>
                    </div>
                </div>
            </div>

            {/* Main Features */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold">Gestión de Productos</h2>
                    <p className="text-gray-600 mt-2">Administra y actualiza tu inventario en tiempo real.</p>
                    <Button className="mt-4 w-full">Ver Productos</Button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold">Análisis de Ventas</h2>
                    <p className="text-gray-600 mt-2">Consulta gráficos detallados sobre el rendimiento de tu negocio.</p>
                    <Button className="mt-4 w-full">Ver Reportes</Button>
                </div>
            </div>
        </div>
    );
}
