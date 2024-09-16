import React from 'react';



export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold mb-4 text-[var(--accent-11)]">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
        </div>
    );
}