"use client";

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Skeleton } from '@/app/components';
import SearchBar from './components/SearchBar';


const NavBar = () => {

    return (
        <Container maxWidth={'1440px'}>
            <div className='font-serif font-bold bg-[var-(accent--9)] flex justify-center items-center p-1'>MAVEN</div>
            <nav className='sticky top-0 z-10 bg-black p-3'>
                <Flex>
                    <Flex align={'center'}>
                        <NavLinks />
                    </Flex>
                    {/* <SearchBar /> */}
                    <AuthStatus />
                </Flex>
            </nav >
        </Container>
    )
};

//a sub component for navbar implementaion details
//a) sub component for the nav links(issues, dashboard) implementation 
const NavLinks = () => {

    //select the active link
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/issueList' }
    ]

    return (
        <ul className='flex flex-row rounded-md space-x-3'>
            {links.map(link => <li key={link.href}>
                <Link className={`${link.href == currentPath ? "!bg-[var(--accent-11)] text-white" : "text-white"} nav-links`} href={link.href}>{link.label}</Link></li>)}
        </ul>
    )
}

// b) auth session status session for login and logout pages
const AuthStatus = () => {

    //access auth session, i.e signin signout
    const { status, data: session } = useSession();

    if (status === 'loading') return <Skeleton width={'2rem'} height={'1rem'} />;


    return (
        <Box>
            {session && (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Avatar
                            src={session.user!.image || "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"}
                            fallback='#'
                            size={'2'}
                            radius='full' />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Label>
                            <Text size={'2'}>{session.user!.email}</Text>
                        </DropdownMenu.Label>
                        <DropdownMenu.Item>
                            <Link href={'/api/auth/signout'}>Log out</Link>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            )}
            {!session && <Link className='text-white' href={'/api/auth/signin'}>Log in</Link>}
        </Box>
    )
}

export default NavBar