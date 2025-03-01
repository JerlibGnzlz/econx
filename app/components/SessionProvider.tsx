"use client"; // Este componente debe ser del lado del cliente

import { SessionProvider as Provider } from "next-auth/react";

export function SessionProvider({ children }: { children: React.ReactNode }) {
    return <Provider>{children}</Provider>;
}
