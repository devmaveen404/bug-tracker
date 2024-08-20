import { Button, Flex, Text } from '@radix-ui/themes';
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

    //total number of pages
    const pageCount = Math.ceil(itemCount / pageSize)
    if (pageCount <= 1) return null

    return (
        <Flex align={'center'} gap={'2'}>
            <Text size={'2'}>Page {currentPage} of {pageCount}</Text>
            <Button color='gray' variant='soft' disabled={currentPage === 1}>
                <MdOutlineKeyboardDoubleArrowLeft />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === 1}>
                <MdOutlineKeyboardArrowLeft />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === pageCount}>
                <MdOutlineKeyboardArrowRight />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === pageCount}>
                <MdOutlineKeyboardDoubleArrowRight />
            </Button>
        </Flex>
    )
}

export default pagination