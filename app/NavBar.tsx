"use client";

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { GoIssueTracks } from "react-icons/go";
import { Skeleton } from '@/app/components';
import SearchBar from './components/SearchBar';


const NavBar = () => {

    return (
        <nav className='sticky top-0 z-10 border-b mb-5 px-5 py-3 bg-black m-3 rounded-md'>
            <Container>
                <Flex justify={'between'}>
                    <Flex align={'center'} gap={'3'}>
                        <Link href="/"><GoIssueTracks style={{ fill: 'var(--accent-9)' }} /></Link>
                        <NavLinks />
                    </Flex>
                    <SearchBar />
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
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
        <ul className='flex space-x-6'>
            {links.map(link => <li key={link.href}>
                <Link className={`${link.href == currentPath ? "!text-zinc-50" : "text-zinc-50"} nav-links`} href={link.href}>{link.label}</Link></li>)}
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