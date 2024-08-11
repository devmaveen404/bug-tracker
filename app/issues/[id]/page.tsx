import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    //redirect user to the not found page
    if (typeof params.id != 'number') notFound();

    //fetch an issue from prisma
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    // if issue doesn't exist redirect user to the no found page
    if (!issue)
        notFound();

    return (
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    )
};

export default IssueDetailsPage;