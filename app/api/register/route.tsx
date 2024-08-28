// registering users in application
import { prisma } from '@/prisma/prismaClient';
import { NextRequest, NextResponse } from 'next/server';
import bycrpt from 'bcrypt'

// to validate post request sent to the backend
import { signUpFormSchema } from '@/app/validationSchemas';



//create api endpoint for creating(register) new user
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = signUpFormSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });

    const user = await prisma.user.findUnique({
        where: { name: body.name, email: body.email },
    })

    if (user)
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })

    // if user does not exist, create new user with hashed password
    const hashedPassword = await bycrpt.hash(body.password, 10)
    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            hashedPassword
        }
    });

    return NextResponse.json({ name: newUser.name, email: newUser.email });
}