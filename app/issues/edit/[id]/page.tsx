import React from 'react'
import { prisma } from '@/prisma/prismaClient'
import { notFound } from 'next/navigation'
import IssueFormSkeleton from './loading'
import dynamic from 'next/dynamic'
import IssueStatusUpdate from '../issueStatusUpdate'
import { Flex } from '@radix-ui/themes'


const IssueForm = dynamic(() => import('../../_components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />
    }
)

interface Props {
    params: { id: string }
}


const EditIssuePage = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issue) notFound();

    return (
        <div className='max-w-xl p-7 mt-16'>
            <IssueStatusUpdate />
            <div className='pt-4'>
                <IssueForm issue={issue} />
            </div>
        </div>
    )
}

export default EditIssuePage