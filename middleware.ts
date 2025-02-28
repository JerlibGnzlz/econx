
import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login", // Redirigir a login si el usuario no está autenticado
    },
});

export const config = {
    matcher: ["/dashboard/:path*"], // Rutas que requieren autenticación
};
