// import { requireAuth } from "../lib/auth"
// import { LogoutButton } from "../components/ui/logout-button"

// export default async function DashboardPage() {
//     const session = await requireAuth()

//     return (
//         <div className="p-8">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold">Dashboard</h1>
//                 <LogoutButton />
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow">
//                 <h2 className="text-xl font-semibold mb-2">Bienvenido, {session.user.name}</h2>
//                 <p className="text-gray-600">ID de usuario: {session.user.id}</p>
//                 <p className="text-gray-600">Email: {session.user.email}</p>
//             </div>
//         </div>
//     )
// }

