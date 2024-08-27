import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Heading, Flex, Card, Box, Text } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'

const loadingIssueDetailsPage = () => {
    return (
        <Box className='max-w-xl p-7'>
            < Skeleton />
            <Flex gap='3' my='2'>
                {/* bagde */}
                <Skeleton width='5rem' />
                {/* text */}
                <Skeleton width='8rem' />
            </Flex>
            <Card className='prose' mt='4'>
                <Skeleton count={3} />
            </Card>
        </Box >
    )
}

export default loadingIssueDetailsPage