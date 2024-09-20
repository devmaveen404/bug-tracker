import { Flex } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import { FcGoogle } from "react-icons/fc";

interface GoogleSignInButtonProps {
    children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
    const loginWithGoogle = () => signIn('google', { callbackUrl: '/' });

    return (
        <Flex justify={'center'}>
            <button onClick={loginWithGoogle} className='flex justify-center shadow py-3 mb-7 rounded-md w-[90%]'>
                <Flex align={'center'} justify={'center'}>
                    <Flex gap={'3'}>
                        <FcGoogle size={'1.5rem'} />
                        {children}
                    </Flex>
                </Flex>
            </button>
        </Flex>
    );
};

export default GoogleSignInButton;