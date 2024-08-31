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
        style?: string
    }[] = [
            { label: 'Open Issues', value: open, status: 'OPEN' },
            { label: 'Ongoing Issues', value: inProgress, status: 'IN_PROGRESS', style: 'bg-black text-white' },
            { label: 'Closed Issues', value: closed, status: 'CLOSED' }
        ];

    return (
        <Flex gap={'4'}>
            {statuses.map(status => (
                <div style={{ margin: '10px ' }}>
                    <Card key={status.label} className={`hover:shadow border border-gray-200 transition duration-400 ${status.style} m-0`} variant='ghost'>
                        <Flex direction={'column'} gap={'2'}>
                            <div
                                className={`text-sm font-medium`}
                            // href={`/issues/issue?status=${status.status}`}
                            >
                                {status.label}
                            </div>
                            <Text size={'5'} className='font-bold'>{status.value}</Text>
                        </Flex>
                    </Card>
                </div>
            ))
            }
        </Flex >
    )
}

export default IssueSummary