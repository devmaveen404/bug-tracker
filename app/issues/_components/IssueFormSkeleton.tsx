import { Box, Container } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components';

const IssueFormSkeleton = () => {
    return (
            <Box className='max-w-xl p-5'>
                < Skeleton height='3rem' />
                <Skeleton height="20rem" />
            </Box >
    )
}

export default IssueFormSkeleton