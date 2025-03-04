import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { db } from "@/app/lib/db"
import { eq } from "drizzle-orm"
import ProfileForm from "./profile-form"
import { authOptions } from "@/app/lib/authOptions"
import { users } from "@/app/lib/schema"

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    const user = await db.query.users.findFirst({
        where: eq(users.email, session.user?.email || ""),
    })

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
            <ProfileForm user={user} />
        </div>
    )
}

