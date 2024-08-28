import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes'
import React from 'react'

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {

    const statuses: {
        label: string;
        value: number;
        status: Status
    }[] = [
            { label: 'Open Issues', value: open, status: 'OPEN' },
            { label: 'Ongoing Issues', value: inProgress, status: 'IN_PROGRESS' },
            { label: 'Closed Issues', value: closed, status: 'CLOSED' }
        ];

    return (
        <Flex gap={'4'}>
            {statuses.map(status => (
                <Card key={status.label} className='backdrop-filter backdrop-blur-lg bg-opacity-50'>
                    <Flex direction={'column'} gap={'1'}>
                        <div
                            className='text-sm font-medium'
                        // href={`/issues/issue?status=${status.status}`}
                        >
                            {status.label}
                        </div>
                        <Text size={'5'} className='font-bold'>{status.value}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

export default IssueSummary