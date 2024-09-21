import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';

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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To control the dropdown visibility
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.length < 3) {
            setResults([]);
            setIsDropdownOpen(false); // Close dropdown if query is less than 3 characters
            return;
        }

        // displaying results as user types
        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            const searchResults = await fetchSearchResults(query);
            setResults(searchResults);
            setIsDropdownOpen(true); // Open dropdown when results are fetched
            setLoading(false);
        }, 300); // Debounce delay

        return () => clearTimeout(delayDebounceFn); // Cleanup
    }, [query]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false); // Close dropdown when clicking outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleResultClick = () => {
        setIsDropdownOpen(false); // Close dropdown when clicking on a result
    };

    return (
        <div ref={wrapperRef} className='flex grow'>
            <form onSubmit={(e: FormEvent) => e.preventDefault()} className='relative flex grow'>
                <div className="flex grow">
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
                        className="grow ps-10 text-sm text-white border border-gray-800 rounded-md bg-gray-800 transition duration-300 ease-in-out shrink focus:outline-none focus:shadow-[0_0_0_2px_rgba(255,255,255,0.8)]"
                        placeholder="Search issues..." />
                </div>
                <div
                    className={`absolute opacity-95 z-10 backdrop-blur-2xl top-12 w-full bg-gray-800 rounded-md text-gray-300 flex grow transition-all duration-300 ease-in-out overflow-hidden ${isDropdownOpen ? 'opacity-100 max-h-64' : 'opacity-0 max-h-0'
                        }`}
                    style={{ transitionProperty: 'opacity, max-height', transitionDuration: '300ms', transitionTimingFunction: 'ease-in-out' }} // Ensure smooth transition
                >
                    {loading ? (
                        <p className='text-sm p-4'>Loading...</p>
                    ) : results.length > 0 ? (
                        <ul className='p-4 w-full'>
                            {results.map((result: any) => (
                                <li
                                    className='text-wrap transition duration-100 text-sm ease-in-out hover:bg-gray-700 rounded-md p-2 '
                                    key={result.id}
                                    onClick={handleResultClick} // Close dropdown on result click
                                >
                                    <Link href={`/issues/${result.id}`}>
                                        <h2>{result.title}</h2>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        (query.length >= 3 && results.length === 0 && <p className='text-sm p-4'>No results found</p>)
                    )}
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
