'use client'
import { Status } from '@prisma/client'
import { Box, Flex, Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const statuses: { label: string, value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' }
]

const issueStatusUpdate = () => {
    const router = useRouter();

    //access current query parameters with this hook
    const searchParams = useSearchParams();

    return (
        <Flex mr={'4'} justify={'end'}>
            <Select.Root
                defaultValue={searchParams.get('status') || ''}
                onValueChange={(status) => {
                    //implement query parameters
                    const params = new URLSearchParams();
                    // filter status, query params
                    if (status) params.append('status', status);
                    // sort issues, query params
                    if (searchParams.get('orderBy'))
                        params.append('orderBy', searchParams.get('orderBy')!)

                    //status filter query string parameter
                    const query = params.size ? '?' + params.toString() : ''
                    router.push('/issues/issueList' + query);
                }}
            >
                <Select.Trigger placeholder='Edit status...' />
                <Select.Content>
                    {statuses.map(status => (
                        <Select.Item key={status.value} value={status.value ?? 'All'}>
                            {status.label}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
        </Flex>
    )
};

export default issueStatusUpdate