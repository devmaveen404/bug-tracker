"use client";

import { Box, Container, Flex } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { GoIssueTracks } from "react-icons/go";



const NavBar = () => {

    //select the active link
    const currentPath = usePathname();
    //access auth session
    const { status, data } = useSession();


    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/issueFiles' }
    ]

    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify={'between'}>
                <Flex align={'center'} gap={'3'}>
                    <Link href="/"><GoIssueTracks color='orange' /></Link>
                    <ul className='flex space-x-6'>
                        {links.map(link => <li key={link.href}>
                            <Link className={`${link.href == currentPath ? "text-zinc-900" : "text-zinc-500"} hover:text-zinc-800 transition-colors`} href={link.href}>{link.label}</Link></li>)}
                    </ul>
                </Flex>
                <Box>
                    {status === 'authenticated' && <Link href={'/api/auth/signout'}>Log out</Link>}
                    {status === 'unauthenticated' && <Link href={'/api/auth/signin'}>Log in</Link>}
                </Box>
            </Flex>
            </Container> 
        </nav>
    )
}

export default NavBar