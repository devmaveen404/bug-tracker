'use client'
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"

interface Props {
    // total number of issues
    itemCount: number;
    // issues to show on each page
    pageSize: number;
    // current page
    currentPage: number
}

const pagination = ({ itemCount, pageSize, currentPage }: Props) => {

    // total number of pages
    const pageCount = Math.ceil(itemCount / pageSize)
    if (pageCount <= 1) return null

    // update the current url
    const router = useRouter();
    // access current query parameter
    const searchParams = useSearchParams();

    // update, current page (query string)
    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }


    return (
        <Flex align={'center'} gap={'2'}>
            <Text size={'2'}>Page {currentPage} of {pageCount}</Text>
            <Button
                color='gray'
                variant='soft'
                disabled={currentPage === 1}
                onClick={() => changePage(1)}
            >
                <MdOutlineKeyboardDoubleArrowLeft />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
                <MdOutlineKeyboardArrowLeft />
            </Button>
            <Button
                color='gray'
                variant='soft'
                disabled={currentPage === pageCount}
                onClick={() => changePage(currentPage + 1)}
            >
                <MdOutlineKeyboardArrowRight />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
                <MdOutlineKeyboardDoubleArrowRight />
            </Button>
        </Flex>
    )
}

export default pagination