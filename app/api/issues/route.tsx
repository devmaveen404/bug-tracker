import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from '@/app/validationSchemas'

// data validation

// api for creating data
export async function POST(request: NextRequest) {
    const body = await request.json();
    // validate body of the request
    const validation = IssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })
    // if validation is successful
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description }
    })

    return NextResponse.json(newIssue, { status: 201 })
}
