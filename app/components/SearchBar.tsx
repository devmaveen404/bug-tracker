import { TextField } from '@radix-ui/themes'
import React from 'react'
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const SearchBar = () => {

    return (
        <form className=' items-center max-w-full'>
            <input className='flex-grow max-w-full bg-gray-600' placeholder='Search issues'>
            </input>
            <HiMiniMagnifyingGlass height="16" width="16" />
        </form>
    )
}

export default SearchBar