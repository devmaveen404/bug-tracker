import GoogleSignInButton from '@/app/components/GoogleSignInButton'
import React, { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs';
import { Flex, Grid } from '@radix-ui/themes';
import { signInFormSchema, signUpFormSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@/app/components';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import authImage from '@/app/assets/issue tracker.png'
import Link from 'next/link';
import logo from '@/app/assets/logo.png'


type signUpFormData = z.infer<typeof signUpFormSchema>

type signInFormData = z.infer<typeof signInFormSchema>


const AuthForm = () => {

    // track current tab to apply smooth transition
    const [currentTab, setCurrentTab] = useState("tab1");

    const router = useRouter()

    // logic for signup user
    const { register, handleSubmit, reset, formState: { errors } } = useForm<signUpFormData>({
        mode: 'onChange',  // Validate inputs as the user types
        resolver: zodResolver(signUpFormSchema)
    })
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
    const { register: register2, handleSubmit: handleSubmit2, reset: reset2, formState: { errors: errors2 } } = useForm<signInFormData>({
        mode: 'onChange',
        resolver: zodResolver(signInFormSchema)
    })
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
            <Grid columns={{ initial: '1', md: '3' }} >
                <div className='hidden lg:flex sticky'>
                    <Image
                        src={authImage}
                        width={500}
                        height={500}
                        alt='add new issue page' />
                </div>
                <div className='flex justify-center items-baseline mt-2 col-span-2'>
                    <Tabs.Root
                        className="flex flex-col w-[90%] sm:w-[60%] lg:w-[70%] p-4"
                        defaultValue="tab1"
                        onValueChange={(value) => setCurrentTab(value)}
                    >
                        <Flex justify={'center'} mb={'4'}>
                            <Image src={logo} alt='logo' width={45} height={45} className='lg:hidden' />
                        </Flex>

                        <GoogleSignInButton>SignIn with Google</GoogleSignInButton>

                        <div className='relative flex  px-10 mb-4 items-center'>
                            <div className='flex-grow border-t border-gray-300'></div>
                            <span className='flex-shrink mx-2 italic text-sm text-gray-300'>or</span>
                            <div className='flex-grow border-t border-gray-300'></div>
                        </div>

                        <Tabs.List className="flex" aria-label="Manage your account">
                            <Tabs.Trigger
                                className={`bg-white h-[30px] focus:outline-none transition duration-300 ease-in-out transform font-semibold ${currentTab === "tab1" ? "text-black scale-110" : "text-gray-500"
                                    } flex-1 flex items-center justify-center text-base cursor-pointer`}
                                // className="bg-white h-[30px] focus:outline-none data-[state=active]:underline data-[state=active]:underline-offset-8 first:border-none last:border-top-left-1px flex-1 flex items-center justify-center text-base cursor-default"
                                value="tab1"
                            >
                                Sign In
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                className={`bg-white h-[30px] focus:outline-none transition duration-300 ease-in-out transform font-semibold ${currentTab === "tab2" ? "text-black scale-110" : "text-gray-500"
                                    } flex-1 flex items-center justify-center text-base cursor-pointer`}
                                // className="bg-white h-[30px] focus:outline-none data-[state=active]:underline data-[state=active]:underline-offset-8 flex-1 flex items-center justify-center text-base shadow-none cursor-default"
                                value="tab2"
                            >
                                Sign Up
                            </Tabs.Trigger>
                        </Tabs.List>
                        <form onSubmit={handleSubmit2(onSubmitSignIn)}>
                            <Tabs.Content
                                className={`grow p-5 bg-white outline-none transition-opacity duration-300 transform ${currentTab === "tab1" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none absolute"
                                    }`}
                                value="tab1"
                            >
                                <fieldset className="mb-[15px] w-full flex flex-col justify-start">
                                    <label className="text-base font-bold leading-none block my-3" htmlFor="email">
                                        Email*
                                    </label>
                                    <input
                                        {...register2('email')}
                                        className={`grow rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] outline-none focus:outline-none
                                            ${errors2.email ? 'focus:shadow-[0_0_0_2px_rgba(200,0,0,1)]' : 'focus:shadow-[0_0_0_2px_rgba(0,0,0,0.5)]'}`}
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
                                        className={`grow rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] outline-none focus:outline-none
                                            ${errors2.password ? 'focus:shadow-[0_0_0_2px_rgba(200,0,0,1)]' : 'focus:shadow-[0_0_0_2px_rgba(0,0,0,0.5)]'}`}
                                        id="password"
                                        placeholder="*******"
                                        type='password'
                                    />
                                    {errors2.password && <ErrorMessage>{errors2.password.message}</ErrorMessage>}
                                </fieldset>
                                <div className="flex justify-between items-center mt-8">
                                    <Link className='text-sm hover:underline' href={'/auth/request-reset'}>forgot your password?</Link>
                                    <button className="inline-flex items-center justify-center rounded text-base font-medium leading-none h-[35px] bg-black text-white p-3 hover:text-white hover:bg-[var(--accent-11)] outline-none cursor-pointer transform transition duration-200">
                                        Sign In
                                    </button>
                                </div>
                            </Tabs.Content>
                        </form>
                        <form onSubmit={handleSubmit(onSubmitSignUp)}>
                            <Tabs.Content
                                className={`grow p-5 bg-white outline-none transition-opacity duration-300 transform ${currentTab === "tab2" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none absolute"
                                    }`}
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
                                        className={`grow rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] outline-none focus:outline-none
                                            ${errors.name ? 'focus:shadow-[0_0_0_2px_rgba(200,0,0,1)]' : 'focus:shadow-[0_0_0_2px_rgba(0,0,0,0.5)]'}`}
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
                                        className={`grow rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] outline-none focus:outline-none
                                            ${errors.email ? 'focus:shadow-[0_0_0_2px_rgba(200,0,0,1)]' : 'focus:shadow-[0_0_0_2px_rgba(0,0,0,0.5)]'}`}
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
                                        className={`grow rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] outline-none focus:outline-none
                                            ${errors.password ? 'focus:shadow-[0_0_0_2px_rgba(200,0,0,1)]' : 'focus:shadow-[0_0_0_2px_rgba(0,0,0,0.5)]'}`}
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
                                        className={`grow rounded px-2.5 text-[15px] leading-none bg-gray-100 h-[35px] outline-none focus:outline-none
                                            ${errors.confirmPassword ? 'focus:shadow-[0_0_0_2px_rgba(200,0,0,1)]' : 'focus:shadow-[0_0_0_2px_rgba(0,0,0,0.5)]'}`}
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
}

export default AuthForm