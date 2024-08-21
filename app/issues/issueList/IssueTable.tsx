import { IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { IoArrowUp, IoArrowDown } from 'react-icons/io5'

// interface for fetching issues
export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue
    sort: 'asc' | 'desc'
    page: string;
}

interface Props {
    searchParams: IssueQuery
    issues: Issue[]
}

const IssueTable = ({ searchParams, issues }: Props) => {

    const toggleOrder = () => {
        return !searchParams.sort || searchParams.sort === "desc" ? "asc" : "desc";
    };

    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {columns.map((column) => (
                        <Table.ColumnHeaderCell key={column.value} className={column.className}>
                            <Link href={{
                                query: {
                                    ...searchParams, orderBy: column.value, sort: toggleOrder()
                                }
                            }}
                            >
                                {column.label}
                            </Link>
                            {column.value === searchParams.orderBy && (searchParams.sort === 'asc' ? <IoArrowUp className='inline' /> : <IoArrowDown className='inline' />)}
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
    )
}

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

// export column names needed in the issue table 
export const columnNames = columns.map(column => column.value)

export default IssueTable