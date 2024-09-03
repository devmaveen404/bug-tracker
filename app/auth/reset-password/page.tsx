'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

import { z } from 'zod';

// Define the Zod schema for the new password
const newPasswordSchema = z.string().min(8, "Password must be at least 8 characters long").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Password must include uppercase, lowercase, and a number");

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [passwordStrength, setPasswordStrength] = useState(''); // Password strength indicator
  const router = useRouter();
  // accessing query parameters
  const searchParams = useSearchParams();
  // retrieve token from the url
  const token = searchParams.get('token') as string;

  // validate inputted password
  const checkPasswordStrength = (password: string) => {
    if (password.length < 8) return 'Weak';
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) return 'Strong';
    return 'Moderate';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the newPassword input
    const validation = newPasswordSchema.safeParse(newPassword);
    if (!validation.success) {
      setMessage(validation.error.errors[0].message);
      return;
    }

    setLoading(true); // Start loading

    try {
      await axios.post('/api/auth/reset-password', { token, newPassword });
      setMessage('Password updated successfully!');
      router.push('/auth/signIn');
    } catch (error: any) {
      // Enhanced error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        setMessage('Error updating password: ' + error.response.data.message);
      } else if (error.request) {
        // No response received
        setMessage('Error updating password: No response from server.');
      } else {
        // Something else caused the error
        setMessage('Error updating password: ' + error.message);
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordStrength(checkPasswordStrength(password));
  };

  return (
    <div className="flex items-center mx-2 justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
              required
              placeholder="Enter new password"
              className="mt-1 block w-full px-3 py-2 border border-gray-100 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            />
            {/* Password strength indicator */}
            {newPassword && (
              <p className={`mt-1 text-sm ${passwordStrength === 'Strong' ? 'text-green-600' : passwordStrength === 'Moderate' ? 'text-yellow-600' : 'text-red-600'}`}>
                Password strength: {passwordStrength}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#cb1d63] text-white font-semibold rounded-md shadow-sm hover:bg-[#e93d82] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Resetting...' : 'Reset Password'}
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
