'use client'
// Request Password Reset Page
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; ``

export default function RequestReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/request-reset', { email });
            setMessage('Reset email sent! Check your inbox.');
            // router.push('/auth/reset-password')
        } catch (error) {
            setMessage('Error sending reset email.');
            console.error('Error:', error); // Log the error

        }
    };

    return (
        <div className="flex items-center mx-2 justify-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Request Password Reset</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-100 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-[#cb1d63] text-white font-semibold rounded-md shadow-sm hover:bg-[#e93d82] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cb1d63] transition duration-200"
                    >
                        Send Reset Link
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
// #e93d82
// #cb1d63