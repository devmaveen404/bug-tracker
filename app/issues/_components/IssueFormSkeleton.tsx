import React from 'react'
import { Skeleton } from '@/app/components';

const IssueFormSkeleton = () => {
    return (
        <div className='max-w-xl px-5 pt-2 space-y-3'>
            < Skeleton height='2rem' className='mb-2' />
            <Skeleton height="20rem" />
        </div >
    )
}

export default IssueFormSkeleton