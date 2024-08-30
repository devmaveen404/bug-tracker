import React from 'react'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';


const fetchSearchResults = async (query: string) => {
    try {
        const { data } = await axios.get('/api/search', {
            params: { query },
        });
        return data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
};

const SearchBar = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length < 3) {
            setResults([]);
            return;
        }


        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            const searchResults = await fetchSearchResults(query);
            setResults(searchResults);
            setLoading(false);
        }, 300); // Debounce delay

        return () => clearTimeout(delayDebounceFn); // Cleanup
    }, [query]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <form onSubmit={(e: FormEvent) => e.preventDefault()} className='relative flex grow'>
            <div className="relative flex grow">
                <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    value={query}
                    onChange={handleChange}
                    type="search"
                    id="default-search"
                    className=" p-1 grow ps-10 text-sm text-white border border-gray-800 rounded-lg bg-gray-800 transition duration-300 ease-in-out" placeholder="Search issues..." />
            </div>
            <div className='absolute opacity-95 z-10 backdrop-blur-2xl top-11 w-full bg-gray-800 rounded-md text-gray-300 flex grow'>
                {loading ? (
                    <p className='text-sm p-4'>Loading...</p>
                ) : results.length > 0 ? (
                    <ul className='p-4 w-full'>
                        {results.map((result: any) => (
                            <li className='text-wrap transition duration-100 text-sm ease-in-out hover:bg-gray-700 rounded-md p-2' key={result.id}>
                                <h2>{result.title}</h2>
                            </li>
                        ))}
                    </ul>
                ) : (
                    (query.length >= 3 && results.length === 0 && <p className='text-sm p-4'>No results found</p>)
                )}
            </div>
        </form>



    )
}

export default SearchBar