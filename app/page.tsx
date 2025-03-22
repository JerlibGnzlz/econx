import { BarChart3, Users, ShoppingBag } from 'lucide-react';
import Image from "next/image";
import { Button } from './components/Button';
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-50 p-6">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-slate-900 text-white p-10 rounded-lg shadow-lg">
                <div>
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">
                        Tu Tienda Online Rápida y Segura 🚀🛒
                    </h1>
                    <p className="mt-2 text-lg text-gray-600 font-medium">
                        Gestiona tus productos, usuarios y ventas en un solo lugar.
                    </p>
                </div>
                <Image
                    src="/online.jpg"
                    width={400}
                    height={100}
                    alt="Dashboard preview"
                    className="mt-4 md:mt-0 rounded-lg"
                />
            </div>

            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-slate-900/5 rounded-lg">
                        <BarChart3 className="h-8 w-8 text-slate-900" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Ventas Totales</h2>
                        <p className="text-slate-600 text-lg">$15,240</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-slate-900/5 rounded-lg">
                        <Users className="h-8 w-8 text-slate-900" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Usuarios Activos</h2>
                        <p className="text-slate-600 text-lg">1,245</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow">
                    <div className="p-3 bg-slate-900/5 rounded-lg">
                        <ShoppingBag className="h-8 w-8 text-slate-900" />
                    </div>
                    <div>
                        <Link
                            href="/products"
                            className="text-gray-700 hover:text-gray-900 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            <h2 className="text-xl font-semibold text-slate-900">Productos en Catálogo</h2>
                            <p className="text-slate-600 text-lg">{/* Aquí puedes mostrar la cantidad de productos */}</p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Features */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-bold text-slate-900">Gestión de Productos</h2>
                    <p className="text-slate-600 mt-2">Administra y actualiza tu inventario en tiempo real.</p>
                    <Button className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white">
                        Ver Productos
                    </Button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-2xl font-bold text-slate-900">Análisis de Ventas</h2>
                    <p className="text-slate-600 mt-2">Consulta gráficos detallados sobre el rendimiento de tu negocio.</p>
                    <Button className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white">
                        Ver Reportes
                    </Button>
                </div>
            </div>
        </div >
    )
}


