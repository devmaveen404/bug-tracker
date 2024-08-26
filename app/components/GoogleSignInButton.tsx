import { Box, Flex } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import { FcGoogle } from "react-icons/fc";

interface GoogleSignInButtonProps {
    children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
    const loginWithGoogle = () => signIn('google');

    return (
        <button onClick={loginWithGoogle} className='shadow py-3 mt-2 mb-7 rounded-md w-full'>
            <Flex align={'center'} justify={'center'}>
                <Flex gap={'3'}>
                    <FcGoogle size={'1.5rem'} />
                    {children}
                </Flex>
            </Flex>

        </button>
    );
};

export default GoogleSignInButton;