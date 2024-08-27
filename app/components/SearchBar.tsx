import { TextField } from '@radix-ui/themes'
import React from 'react'
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const SearchBar = () => {
    return (
        <div className='flex-grow mx-32'>
            <TextField.Root placeholder="Search issues…">
                <TextField.Slot>
                    <HiMiniMagnifyingGlass height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
        </div>
    )
}

export default SearchBar