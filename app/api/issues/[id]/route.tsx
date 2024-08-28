// update issue

import { patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


//update issue, update issue to assigned user  
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    //protecting the api endpoint
    const session = await getServerSession(authOptions);

    if (!session)
        return NextResponse.json({}, { status: 401 })
    // sending request to the api endpoint
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    // if userId is valid, assign to a valid user
    if (body.assignedToUserId) {
        const user = await prisma.user.findUnique({ where: { id: body.assignedToUserId } })
        if (!user)
            return NextResponse.json({ error: 'Invalid user.' }, { status: 400 })
    }

    // if body is valid;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 400 })

    const updatedIssue = await prisma.issue.update({
        //update id parameter
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description,
            assignedToUserId: body.assignedToUserId
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