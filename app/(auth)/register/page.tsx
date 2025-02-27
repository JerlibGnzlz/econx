
// import { RegisterForm } from "./formulario";

import RegisterForm from "./formulario";

export default function RegisterPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center">Registro</h1>
            <RegisterForm />
        </div>
    );
}