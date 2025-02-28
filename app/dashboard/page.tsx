import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect("/login");
    }

    return <div>Bienvenido al Dashboard, {session.user.name}!</div>;
}
