import React from 'react'
import { Skeleton } from '@/app/components';

const IssueFormSkeleton = () => {
    return (
        <div className='max-w-xl p-5 pt-8 space-y-5'>
            < Skeleton height='2rem' className='mb-2' />
            <Skeleton height="20rem" />
        </div >
    )
}

export default IssueFormSkeleton