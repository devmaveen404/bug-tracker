//a catch all segment, to catch all auth related pages i.e signin, signout etc
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
//prisma adapter, to store user authentication info in the database
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    // since database strategy does not work with prisma adapter
    session: {
        strategy: "jwt"
    }
})

export { handler as GET, handler as POST }