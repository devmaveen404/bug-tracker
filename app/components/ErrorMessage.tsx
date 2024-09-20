import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
    return (
        <Text mt={'2'} size={'2'} className='text-red-700' as='p'>{children}</Text>
    )
}

export default ErrorMessage