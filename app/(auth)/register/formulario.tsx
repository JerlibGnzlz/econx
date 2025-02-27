// "use client";

// import { useState } from "react";
// import { Button } from "@/app/components/Button";
// import { Input } from "@/app/components/Input";

// export function RegisterForm() {
//     const [formData, setFormData] = useState({ name: "", email: "", password: "" });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("Enviando datos:", formData);

//         try {
//             const response = await fetch("/api/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) {
//                 throw new Error("Error en el registro");
//             }

//             const data = await response.json();
//             console.log("Respuesta del servidor:", data);
//             alert(data.message);
//         } catch (error) {
//             console.error("Error en el registro:", error);
//             alert("Hubo un problema al registrar el usuario.");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 space-y-4">
//             <Input type="text" name="name" placeholder="Nombre" required onChange={handleChange} />
//             <Input type="email" name="email" placeholder="Correo electrónico" required onChange={handleChange} />
//             <Input type="password" name="password" placeholder="Contraseña" required onChange={handleChange} />
//             <Button type="submit" className="w-full">Registrarse</Button>
//         </form>
//     );
// }


"use client";
import { useState } from "react";

export default function RegisterForm() {
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                password: formData.get("password"),
            }),
        });

        const data = await response.json();
        setMessage(data.success || data.error);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="name" placeholder="Nombre" required className="p-2 border" />
            <input name="email" type="email" placeholder="Correo" required className="p-2 border" />
            <input name="password" type="password" placeholder="Contraseña" required className="p-2 border" />
            <button type="submit" className="bg-indigo-600 text-white p-2 rounded">Registrarse</button>
            {message && <p className="text-red-500">{message}</p>}
        </form>
    );
}
