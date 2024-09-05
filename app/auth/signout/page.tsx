'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOut() {
    const router = useRouter();

    const handleSignOut = () => {
        signOut({ redirect: false }).then(() => {
            router.push('/auth/signIn');
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Out</h1>
                <p className="text-center text-gray-600">Are you sure you want to sign out?</p>
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleSignOut}
                        className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-4"
                    >
                        Sign Out
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
