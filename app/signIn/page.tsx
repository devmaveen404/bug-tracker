'use client'
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Box, Grid } from '@radix-ui/themes';
import { signInFormSchema, signUpFormSchema } from '../validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { signIn } from 'next-auth/react';


type signUpFormData = z.infer<typeof signUpFormSchema>

type signInFormData = z.infer<typeof signInFormSchema>




const AuthForm = () => {

    const router = useRouter()

    // logic for signup user
    const { register, handleSubmit, reset, formState: { errors } } = useForm<signUpFormData>({ resolver: zodResolver(signUpFormSchema) })
    const onSubmitSignUp = async (data: z.infer<typeof signUpFormSchema>) => {
        const response = await axios.post('/api/register', data)
        // if response is ok, redirect user to the sign in page
        if (response) {
            toast.success('User registered successfully')
            reset()
            router.refresh()
        } else {
            toast.error('Registration failed')
        }
    };


    // logic for signin user
    const { register: register2, handleSubmit: handleSubmit2, reset: reset2, formState: { errors: errors2 } } = useForm<signInFormData>({ mode: 'onBlur', resolver: zodResolver(signInFormSchema) })
    const onSubmitSignIn = async (data: z.infer<typeof signInFormSchema>) => {
        const signInData = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (signInData?.error) {
            toast.error('Incorrect credentials')
        } else {
            router.push('/')
            reset2()
        }
    }

    return (
        <>
            < Grid columns={{ initial: '1', md: '2' }}>
                <div className='hidden lg:inline-grid'>
                    <div> ghddhdshbsdnsdff</div>
                </div>
                <div className='flex justify-center items-center content-center'>
                    <Tabs.Root
                        className="flex flex-col w-[50%] lg:w-[70%] shadow-md rounded-lg p-4"
                        defaultValue="tab1"
                    >
                        <GoogleSignInButton>SignIn with Google</GoogleSignInButton>

                        <div className='relative flex mb-4 items-center'>
                            <div className='flex-grow border-t border-gray-400'></div>
                            <span className='flex-shrink mx-2 italic text-sm text-gray-400'>or</span>
                            <div className='flex-grow border-t border-gray-400'></div>
                        </div>

                        <Tabs.List className="flex transition-all duration-200" aria-label="Manage your account">
                            <Tabs.Trigger
                                className="bg-white h-[30px] focus:outline-none data-[state=active]:underline data-[state=active]:underline-offset-8 first:border-none last:border-top-left-1px flex-1 flex items-center justify-center text-base cursor-default"
                                value="tab1"
                            >
                                Sign In
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                className="bg-white h-[30px] focus:outline-none data-[state=active]:underline data-[state=active]:underline-offset-8 flex-1 flex items-center justify-center text-base shadow-none cursor-default"
                                value="tab2"
                            >
                                Sign Up
                            </Tabs.Trigger>
                        </Tabs.List>
                        <form onSubmit={handleSubmit2(onSubmitSignIn)}>
                            <Tabs.Content
                                className="grow p-5 bg-white outline-none"
                                value="tab1"
                            >
                                <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                                    <label className="text-base font-bold leading-none block my-3" htmlFor="email">
                                        Email*
                                    </label>
                                    <input
                                        {...register2('email')}
                                        className="grow rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] focus:shadow-[0_0_0_2px] outline-none"
                                        id="email"
                                        placeholder='example@.com'
                                    />
                                    {errors2.email && <ErrorMessage>{errors2.email.message}</ErrorMessage>}
                                </fieldset>
                                <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                                    <label className="text-base font-bold leading-none block my-3" htmlFor="password">
                                        Password*
                                    </label>
                                    <input
                                        {...register2('password')}
                                        className="grow rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] focus:shadow-[0_0_0_2px] outline-none"
                                        id="password"
                                        placeholder="*******"
                                        type='password'
                                    />
                                    {errors2.password && <ErrorMessage>{errors2.password.message}</ErrorMessage>}
                                </fieldset>
                                <div className="flex justify-end mt-8">
                                    <button className="inline-flex items-center justify-center rounded text-base font-medium leading-none h-[35px] bg-black text-white p-3 hover:text-white hover:bg-[var(--accent-11)] outline-none cursor-pointer transform transition duration-200">
                                        Sign In
                                    </button>
                                </div>
                            </Tabs.Content>
                        </form>
                        <form onSubmit={handleSubmit(onSubmitSignUp)}>
                            <Tabs.Content
                                className="grow p-5 bg-white outline-none"
                                value="tab2"
                            >
                                <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                                    <label
                                        className="text-base font-bold leading-none block my-3"
                                        htmlFor="name"
                                    >
                                        Username*
                                    </label>
                                    <input
                                        {...register('name')}
                                        className="rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] focus:shadow-[0_0_0_2px] outline-none"
                                        id="name"
                                        placeholder='e.g Maven'
                                    />
                                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                                </fieldset>
                                <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                                    <label
                                        className="text-base font-bold leading-none my-3 text-violet12"
                                        htmlFor="email"
                                    >
                                        Email*
                                    </label>
                                    <input
                                        {...register('email')}
                                        className="grow rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] focus:shadow-[0_0_0_2px] outline-none"
                                        id="email"
                                        placeholder='example@.com'
                                    />
                                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                                </fieldset>
                                <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                                    <label
                                        className="text-base font-bold leading-none my-3"
                                        htmlFor="Password"
                                    >
                                        Password*
                                    </label>
                                    <input
                                        {...register('password')}
                                        className="grow rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] focus:shadow-[0_0_0_2px] outline-none"
                                        id="Password"
                                        placeholder='enter password'
                                    />
                                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                                </fieldset>
                                <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                                    <label
                                        className="text-base font-bold leading-none my-3"
                                        htmlFor="confirmPassword"
                                    >
                                        Confirm Password*
                                    </label>
                                    <input
                                        {...register('confirmPassword')}
                                        className="rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] focus:shadow-[0_0_0_2px] outline-none"
                                        id="confirmPassword"
                                        placeholder='re-enter password'
                                    />
                                    {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
                                </fieldset>
                                <div className="flex justify-end mt-8">
                                    <button className="inline-flex items-center justify-center rounded text-base font-medium leading-none h-[35px] bg-black text-white p-3 hover:text-white hover:bg-[var(--accent-11)] outline-none cursor-pointer transform transition duration-200">
                                        Sign Up
                                    </button>
                                </div>
                            </Tabs.Content>
                        </form>
                    </Tabs.Root>
                </div>
            </Grid >
            <Toaster />
        </>
    )
};

export default AuthForm;

// usefull tailwind classes
// line under text = data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0]