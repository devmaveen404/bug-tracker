import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { HiPencilAlt } from 'react-icons/hi'


const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button>
            <HiPencilAlt />
            <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
        </Button>
    )
}

export default EditIssueButton