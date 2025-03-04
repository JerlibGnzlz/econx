import { authOptions } from "@/app/lib/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// import NextAuth, { DefaultSession, Session } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"


// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID || "",
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//         }),
//         // Add more providers here
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     callbacks: {
//         async session({ session, user }: { session: Session; user: any }) {
//             session.user.id = user.id
//             return session
//         },
//     },
// }

// export default NextAuth(authOptions)

