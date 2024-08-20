import React from 'react'
import { Table } from '@radix-ui/themes'
import { Issue, PrismaClient, Status } from '@prisma/client'
import { IssueStatusBadge } from '@/app/components'
import IssueActions from './IssueActionButtons'
import Link from 'next/link'
import { IoArrowUp } from 'react-icons/io5'


const prisma = new PrismaClient()

interface Props {
    searchParams: { status: Status, orderBy: keyof Issue };
}

const IssuesPage = async ({ searchParams }: Props) => {

    // pass issue headings dinamically
    const columns: {
        label: string,
        value: keyof Issue
        className?: string
    }[] = [
            { label: 'Issue', value: 'title' },
            { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
            { label: 'Created', value: 'createdAt', className: 'hidden sm:table-cell' },
        ]
    // validate issues, issues status, before rendering
    //returns status properties
    const statuses = Object.values(Status)
    // a)
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

    //fetch all uses in the database
    const issues = await prisma.issue.findMany({
        where: {
            // b)
            status
        }
    });
    return (
        <div className='max-w-xl'>
            <IssueActions />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => (
                            <Table.ColumnHeaderCell key={column.value}>
                                <Link href={{
                                    query: {
                                        ...searchParams, orderBy: column.value
                                    }
                                }}>
                                    {column.label}
                                </Link>
                                {column.value === searchParams.orderBy && <IoArrowUp className='inline' />}
                            </Table.ColumnHeaderCell>
                        ))}
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