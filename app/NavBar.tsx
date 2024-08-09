"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { GoIssueTracks } from "react-icons/go";



const NavBar = () => {

    //select the active link
    const currentPath = usePathname();


    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' }
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/"><GoIssueTracks color='orange' /></Link>
            <ul className='flex space-x-6'>
                {links.map(link => <li key={link.href}>
                    <Link className={`${link.href == currentPath ? "text-zinc-900" : "text-zinc-500"} hover:text-zinc-800 transition-colors`} href={link.href}>{link.label}</Link></li>)}
            </ul>
        </nav>
    )
}

export default NavBar