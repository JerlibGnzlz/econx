import { Button } from "./components/Button";

export default function HomePage() {
    const products = [
        { id: 1, name: "Producto 1", price: 20.99, image: "/product1.jpg" },
        { id: 2, name: "Producto 2", price: 15.99, image: "/product2.jpg" },
        { id: 3, name: "Producto 3", price: 25.99, image: "/product3.jpg" },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-8">Catálogo de Productos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                        <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
                        <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
                        <Button className="mt-4 w-full">Añadir al carrito</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}