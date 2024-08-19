// update issue

import { IssueSchema } from "@/app/validationSchemas";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient()

//update issue
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    //protecting the api endpoint
    const session = await getServerSession(authOptions);

    if (!session)
        return NextResponse.json({}, { status: 401 })
    // sending request to the api endpoint
    const body = await request.json();
    const validation = IssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })
    // if body is valid;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue)
        return NextResponse.json({ error: 'Ivalid issue' }, { status: 400 })

    const updatedIssue = await prisma.issue.update({
        //update id parameter
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description
        }
    })

    // return updated issue to the client
    return NextResponse.json(updatedIssue, { status: 201 })

}

// delete issue
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {

    //protecting the api endpoint
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 })

    // find issue
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    // if not issue return error
    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

    //if issue is found, delete it
    await prisma.issue.delete({
        where: { id: issue.id }
    })

    // return deleted user it the client
    return NextResponse.json({});
}