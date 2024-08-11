'use client'
import { Button, Callout, TextField, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
// handling form submission
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios';// submit data to database
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { IoInformationCircleOutline } from "react-icons/io5";
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage';
import { Spinner } from '@radix-ui/themes';

// shape of the issue form
// interface IssueForm {
//     title: string
//     description: string
// }
// shape of issue form based on schema
type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {

    //redirect user to issue page
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        //zod integration with hookform
        resolver: zodResolver(createIssueSchema)
    });
    //Handle Error when empty fiel is sumbitted
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className='max-w-xl'>
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
                        await axios.post('/api/issues', data)
                        router.push('/issues')
                    } catch (error) {
                        setIsSubmitting(false)
                        setError('Input details properly.')
                    }
                })}>
                <TextField.Root placeholder='Title...' {...register('title')} />
                {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description..." {...field} />}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                <Button disabled={isSubmitting}>
                    Submit New Issue {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default NewIssuePage