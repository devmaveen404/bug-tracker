import React from 'react'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from './issueStatusFilter';

const IssueActions = () => {
    return (
        <Flex justify={'between'}>
            <IssueStatusFilter />
            <Button>
                <Link href='/issues/new'>New issue</Link>
            </Button>
        </Flex>
    )
};

export default IssueActions