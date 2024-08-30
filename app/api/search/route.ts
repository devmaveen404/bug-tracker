import { prisma } from '@/prisma/prismaClient';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    try {
        const results = await prisma.issue.findMany({
            where: {
                title: { contains: query },
            }
        })
        return NextResponse.json(results);
    }   catch (error) {
        return  NextResponse.error();
    }
}
