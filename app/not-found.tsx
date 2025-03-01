import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6">
            <Image
                src="/404.png"
                alt="Página no encontrada"
                width={500}
                height={200}
                className="mb-5"
            />
            <h1 className="text-5xl font-extrabold text-gray-800 mt-6">Oops! 404</h1>
            <p className="text-lg text-gray-600 mt-2 text-center max-w-md">
                Parece que la página que buscas no existe o ha sido eliminada.
                Pero no te preocupes, puedes volver a nuestra tienda.
            </p>
            <Link href="/" className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
                Volver al inicio
            </Link>
        </div>
    );
}
