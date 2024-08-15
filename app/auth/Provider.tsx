//a session provider to access user current session, i.e. signin, signout
import React, { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'

const AuthProvider = ({ children }: PropsWithChildren) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default AuthProvider