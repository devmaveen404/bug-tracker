import { Container, Flex, Table } from '@radix-ui/themes'
import React from 'react'
import IssueActions from './IssueActionButtons'
import { Skeleton } from '@/app/components'


const loadingIssuePage = () => {

    const issues = [1, 2, 3, 4, 5, 6, 7, 8]

    return (
        <Flex direction={'column'} gap={'4'} className='max-w-2xl p-7'>
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
                        <Table.Row key={issue}>
                            <Table.Cell>
                                <Skeleton />
                                <div className='block md:hidden'><Skeleton /></div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
                            <Table.Cell className='hidden sm:table-cell'><Skeleton /></Table.Cell>
                        </Table.Row>
                    ))};
                </Table.Body>
            </Table.Root>
        </Flex>
    )
}

export default loadingIssuePage