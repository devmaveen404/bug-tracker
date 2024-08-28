import React from 'react'

const SearchBar = () => {

    return (

        <form className='flex grow'>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-950 sr-only">Search</label>
            <div className="relative flex grow">
                <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className=" p-1 grow ps-10 text-sm text-white border border-gray-800 rounded-lg bg-gray-800" placeholder="Search issues..." />
            </div>
        </form>

    )
}

export default SearchBar