import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rutas que requieren autenticación
const protectedRoutes = ["/dashboard", "/profile", "/settings"]

// Rutas para usuarios no autenticados
const authRoutes = ["/login", "/register", "/forgot-password"]

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get("session-token")?.value

    // Verificar si la ruta requiere autenticación
    const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

    // Verificar si la ruta es para usuarios no autenticados
    const isAuthRoute = authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

    // Redirigir a login si intenta acceder a una ruta protegida sin token
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // Redirigir a dashboard si intenta acceder a rutas de auth con token
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Coincide con todas las rutas de solicitud excepto:
         * 1. Todas las rutas que comienzan con api, _next, static, public, favicon.ico
         */
        "/((?!api|_next|static|public|favicon.ico).*)",
    ],
}

