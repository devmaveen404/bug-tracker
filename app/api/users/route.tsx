//fetching users from the backend
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

// fetching users from the backend
export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany({ orderBy: { name: 'asc' }, })
    return NextResponse.json(users)
}


