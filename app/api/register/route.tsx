// registering users in application
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bycrpt from 'bcrypt'

const prisma = new PrismaClient()

// validation
const schema = z.object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(5)
});

//create api endpoint for creating new user
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });

    const user = await prisma.user.findUnique({
        where: { username: body.username, email: body.email },
    })

    if (user)
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })

    // if user does not exist, create new user with hashed password
    const hashedPassword = await bycrpt.hash(body.password, 10)
    const newUser = await prisma.user.create({
        data: {
            username: body.username,
            email: body.email,
            hashedPassword
        }
    });

    return NextResponse.json({ username: newUser.username, email: newUser.email });
}