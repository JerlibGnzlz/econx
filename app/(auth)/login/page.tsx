import { LoginForm } from "./formulario";

export default function LoginPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
            <LoginForm />
        </div>
    );
}