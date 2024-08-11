'use client'
import React from 'react'
import newIssueButton from '../components/IssueActionButtons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'


const IssuesPage = () => {

    return (
        <div>
            <Button>
                <Link href='/issues/new'></Link>New issue</Button>
        </div>
    )
}

export default IssuesPage