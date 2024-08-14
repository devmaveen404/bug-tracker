'use client'
import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    //refresh the issues page
    const router = useRouter();
    //handle instance of an error when deleting issue
    const [error, setError] = useState(false);
    //show spinnner when deleting and issue
    const [isDeleting, setIsDeleting] = useState(false);


    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isDeleting}>Delete Issue{isDeleting && <Spinner />}</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>
                        This issue will be deleted permanently!
                    </AlertDialog.Description>
                    <Flex mt='4' gap={'3'} >
                        <AlertDialog.Cancel>
                            <Button variant='soft' color='gray'>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            {/* delete issue */}
                            <Button color='red' onClick={async () => {
                                try {
                                    // throw new Error
                                    setIsDeleting(true)
                                    await axios.delete('/api/issues/' + issueId);
                                    router.push('/issues/issueList')
                                    router.refresh();
                                } catch (error) {
                                    setIsDeleting(false)
                                    setError(true);
                                }
                            }}>Confirm</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
                    <Button color='gray' variant='soft' mt={'2'} onClick={() => setError(false)}>OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton