import React from 'react'
import { prisma } from '@/prisma/prismaClient'
import { Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { IssueStatusBadge } from './components'

// render issues in descending order
const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        where: { status: 'CLOSED' },
        orderBy: { status: 'desc' },
        take: 5,
    })

    return (
        <Card className='hover:shadow transition duration-400'>
            <Heading size={'4'} mb={'3'}>Recently Resolved Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex direction={'column'} align={'start'} gap={'2'}>
                                    <Link key={issue.id} href={`/issues/${issue.id}`}>{issue.title}</Link>
                                    <IssueStatusBadge status={issue.status} />
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestIssues