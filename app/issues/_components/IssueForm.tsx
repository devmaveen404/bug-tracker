'use client'
import { Button, Callout, Select, TextField } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
// handling form submission
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios';// submit data to database
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation';
import { IoInformationCircleOutline } from "react-icons/io5";
import { zodResolver } from '@hookform/resolvers/zod';
import { IssueSchema } from '@/app/validationSchemas';
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage';
import { Spinner } from '@radix-ui/themes';
import { Issue, Status } from '@prisma/client';
import dynamic from 'next/dynamic';
// import SimpleMDE from 'react-simplemde-editor';

// Lazy load the markdown editor
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

// shape of issue form based on schema
type IssueFormData = z.infer<typeof IssueSchema>

interface Props {
    issue?: Issue;
}

const statuses: { label: string, value?: Status }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' }
]

const IssueForm = ({ issue }: Props) => {

    //redirect user to issue page
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        //zod integration with hookform
        resolver: zodResolver(IssueSchema)
    });
    //Handle Error when empty field is sumbitted
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = useCallback(async (data: IssueFormData) => {
        try {
            setIsSubmitting(true)
            if (issue)
                axios.patch('/api/issues/' + issue.id, data)
            else
                await axios.post('/api/issues', data)
            router.push('/issues/issueList')
            // to refresh the issues 
            router.refresh();
        } catch (error) {
            setIsSubmitting(false)
            setError('Input details properly.')
        }
    }, [issue, router]);

    const handleStatusChange = useCallback(async (selectedStatus: Status) => {
        try {
            if (issue)
                await axios.patch(`/api/issues/${issue.id}`, { status: selectedStatus })
        } catch (error) {
            error
        }
    }, [issue]);

    return (
        <div className='max-w-xl p-7'>
            {error && <Callout.Root color='red' className='mb-5' >
                <Callout.Icon>
                    <IoInformationCircleOutline />
                </Callout.Icon>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form
                className='space-y-3'
                onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root style={{ paddingRight: '8rem' }} defaultValue={issue?.title} placeholder='Title...' {...register('title')}>
                    {issue && <TextField.Slot style={{ position: 'relative' }}>
                        <Select.Root
                            defaultValue={issue?.status}
                            onValueChange={handleStatusChange}
                        >
                            <Select.Trigger
                                placeholder='Edit status...'
                                style={{
                                    position: 'absolute',
                                    left: 410,
                                    height: '60%',
                                    padding: '0 0.5rem',
                                    border: 'none',
                                    background: 'transparent',
                                }}
                            />
                            <Select.Content>
                                {statuses.map(status => (
                                    <Select.Item key={status.value} value={status.value ?? 'All'}>
                                        {status.label}
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Root>
                    </TextField.Slot>}
                </TextField.Root>
                {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
                <Controller
                    name='description'
                    control={control}
                    // show text to be edited
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder="Description..." {...field} />}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}{' '}{isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>

    )
}

export default IssueForm