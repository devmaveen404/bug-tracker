"use client";

import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Skeleton } from '@/app/components';
import SearchBar from './SearchBar';


const NavBar = () => {

    // sticky navbar
    const [isScrolled, setIsScrolled] = useState(false);

    // Effect to detect scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Container maxWidth={'1440px'}>
            <nav className={`w-full max-w-[1440px] fixed top-0 z-20 p-4 transition-all duration-300 
                ${isScrolled ? 'bg-black/90 backdrop-blur-md shadow-md' : 'bg-black'}`}
            >
                <Flex justify={'between'}>
                    <Flex align={'center'}>
                        <NavLinks />
                    </Flex>
                    <Flex className='grow max-w-lg px-1'>
                        <SearchBar />
                    </Flex>
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
        <ul className='flex flex-row space-x-3'>
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
                            <button className='' onClick={() => signOut({ callbackUrl: '/auth/signout' })}> Log out</button>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            )
            }
            {!session && <Link className='text-white' href={'/api/auth/signin'}>Log in</Link>}
        </Box >
    )
}

export default NavBar