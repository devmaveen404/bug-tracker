import React from 'react'
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
import { Grid } from '@radix-ui/themes';
import Image from 'next/image';
import newIssueImage from '../../../assets/edit.svg'
import { prisma } from '@/prisma/prismaClient';
import { notFound } from 'next/navigation';

// render issueform dynamically
const IssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />
    }
);

interface Props {
    params: { id: string }
}

const newIssuePage = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    // if no issue, redirect to the notfound page.
    if (!issue) notFound();

    return (
        <Grid columns={{ initial: '1', md: '2' }} className='pt-20'>
            <div className='flex '>
                <IssueForm issue={issue}  />
            </div>
            <div className='justify-center items-center object-contain'>
                <Image
                    src={newIssueImage}
                    width={450}
                    height={450}
                    alt='add new issue page'
                />
            </div>
        </Grid>
    )
}

export default newIssuePage