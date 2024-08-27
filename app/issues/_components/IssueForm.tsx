'use client'
import { Button, Callout, TextField, Text } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
// handling form submission
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios';// submit data to database
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { IoInformationCircleOutline } from "react-icons/io5";
import { zodResolver } from '@hookform/resolvers/zod';
import { IssueSchema } from '@/app/validationSchemas';
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage';
import { Spinner } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';

// since markdown editor(client component) is rendered on server, markdown should be lazy loaded
// const SimpleMDE = dynamic(() => import('react-simplemde-editor'),
//     { ssr: false }
// );

// shape of the issue form
// interface IssueForm {
//     title: string
//     description: string
// }
// shape of issue form based on schema
type IssueFormData = z.infer<typeof IssueSchema>

interface Props {
    issue?: Issue
}

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
                onSubmit={handleSubmit(async (data) => {
                    try {
                        setIsSubmitting(true)
                        if (issue)
                            axios.patch('/api/issues' + issue.id, data)
                        else
                            await axios.post('/api/issues', data)
                        router.push('/issues/issueList')
                        // to refresh the issues 
                        router.refresh();
                    } catch (error) {
                        setIsSubmitting(false)
                        setError('Input details properly.')
                    }
                })}>
                <TextField.Root defaultValue={issue?.title} placeholder='Title...' {...register('title')} />
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