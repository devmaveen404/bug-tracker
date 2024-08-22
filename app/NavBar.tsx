"use client";

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { GoIssueTracks } from "react-icons/go";
import { Skeleton } from '@/app/components';



const NavBar = () => {

    return (
        <nav className='border-b mb-5 px-5 py-3 bg-black m-3 rounded-md'>
            <Container>
                <Flex justify={'between'}>
                    <Flex align={'center'} gap={'3'}>
                        <Link href="/"><GoIssueTracks style={{ fill: 'var(--accent-9)' }} /></Link>
                        <NavLinks />
                    </Flex>
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

    if (status === 'loading') return <Skeleton width={'3rem'} />;
    return (
        <Box>
            {status === 'authenticated' && (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Avatar
                            src={session.user!.image!}
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
            {status === 'unauthenticated' && <Link href={'/api/auth/signin'}>Log in</Link>}
        </Box>
    )
}

export default NavBar