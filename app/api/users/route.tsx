//fetching users from the backend
import { prisma } from "@/prisma/prismaClient"
import { NextRequest, NextResponse } from "next/server"


// fetching users from the backend
export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany({ orderBy: { name: 'asc' }, })
    return NextResponse.json(users)
}


