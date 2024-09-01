'use client'
// Request Password Reset Page
import { useState } from 'react';
import axios from 'axios';

export default function RequestReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/request-reset', { email });
            setMessage('Reset email sent! Check your inbox.');
        } catch (error) {
            setMessage('Error sending reset email.');
        }
    };

    return (
        <div>
            <h1>Request Password Reset</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                />
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
