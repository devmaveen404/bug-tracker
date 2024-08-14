import React from 'react'
import { Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import { IssueStatusBadge } from '@/app/components'
import IssueActions from './IssueActionButtons'
import Link from 'next/link'


const IssuesPage = async () => {
    //fetch all uses in the database
    const issues = await prisma.issue.findMany();
    return (
        <div className='max-w-xl'>
            <IssueActions />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden sm:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`} className='hover:text-orange-800 hover:underline'>
                                    {issue.title}
                                </Link>
                                <div className='block md:hidden'><IssueStatusBadge status={issue.status} /></div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
                            <Table.Cell className='hidden sm:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

// cache on the server
// to render page dynamically at build time
export const dynamic = 'force-dynamic';

export default IssuesPage