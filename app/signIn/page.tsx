'use client'
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Box, Grid } from '@radix-ui/themes';
import { authFormSchema } from '../validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';
import GoogleSignInButton from '../components/GoogleSignInButton';

type AuthFormData = z.infer<typeof authFormSchema>



const AuthForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>({ resolver: zodResolver(authFormSchema) })

    const onSubmit = (values: z.infer<typeof authFormSchema>) => {
        console.log(values);
    };

    return (
        < Grid columns={{ initial: '1', md: '2' }}>
            <div className='hidden lg:inline-grid'>
                <div> ghddhdshbsdnsdff</div>
            </div>
            <Box className='flex justify-center items-center content-center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Tabs.Root
                        className="flex flex-col w-[50%] lg:w-[70%] shadow-md rounded-lg p-4"
                        defaultValue="tab1"
                    >
                        <GoogleSignInButton>SignIn with Google</GoogleSignInButton>
                        <Tabs.List className="shrink-0 flex border-black" aria-label="Manage your account">
                            <Tabs.Trigger
                                className="bg-white h-[30px] flex-1 flex items-center justify-center text-base leading-none select-none first:rounded-tl-md last:rounded-tr-md cursor-default"
                                value="tab1"
                            >
                                Sign In
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                className="bg-white h-[30px] flex-1 flex items-center justify-center text-base leading-none select-none first:rounded-tl-md last:rounded-tr-md cursor-default"
                                value="tab2"
                            >
                                Sign Up
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content
                            className="grow p-5 bg-white outline-none"
                            value="tab1"
                        >
                            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                                <label className="text-base font-bold leading-none block my-3" htmlFor="name">
                                    Username*
                                </label>
                                <input
                                    {...register('username')}
                                    className="grow rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] focus:shadow-[0_0_0_2px] outline-none"
                                    id="username"
                                    placeholder='e.g Maven'
                                />
                                {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                            </fieldset>
                            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                                <label className="text-base font-bold leading-none block my-3" htmlFor="username">
                                    Password*
                                </label>
                                <input
                                    {...register('password')}
                                    className="grow rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] focus:shadow-[0_0_0_2px] outline-none"
                                    id="password"
                                    placeholder="*******"
                                    type='password'
                                />
                                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                            </fieldset>
                            <div className="flex justify-end mt-8">
                                <button className="inline-flex items-center justify-center rounded text-base font-medium leading-none h-[35px] bg-black text-white p-3 hover:text-white hover:bg-[var(--accent-11)] outline-none cursor-pointer transform transition duration-200">
                                    Sign In
                                </button>
                            </div>
                        </Tabs.Content>
                        <Tabs.Content
                            className="grow p-5 bg-white outline-none"
                            value="tab2"
                        >
                            <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                                <label
                                    className="text-base font-bold leading-none block my-3"
                                    htmlFor="Username"
                                >
                                    Username*
                                </label>
                                <input
                                    {...register('username')}
                                    className="rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] focus:shadow-[0_0_0_2px] outline-none"
                                    id="username"
                                    placeholder='e.g Maven'
                                />
                                {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
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
                    </Tabs.Root>
                </form>
            </Box>

        </Grid >
    )
};

export default AuthForm;
