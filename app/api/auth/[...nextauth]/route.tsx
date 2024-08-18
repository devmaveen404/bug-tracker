//a catch all segment, to catch all auth related pages i.e signin, signout etc
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
//prisma adapter, to store user authentication info in the database
import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            //validate authorization
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) return null;

                const user = await prisma.user.findUnique({
                    where: { username: credentials.username, email: credentials.email }
                })

                if (!user) return null;

                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword!)

                return passwordMatch ? user : null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    theme: {
        colorScheme: "light",
    },
    // since database strategy does not work with prisma adapter
    session: {
        strategy: "jwt",
    },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }