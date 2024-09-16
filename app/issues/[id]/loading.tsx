import { Flex, Card, Box } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'


const loadingIssueDetailsPage = () => {
    return (
        <Box className='p-7 pt-24'>
            < Skeleton />
            <Flex gap='3' my='2'>
                {/* bagde */}
                <Skeleton width='8rem' />
                {/* text */}
                <Skeleton width='10rem' />
            </Flex>
            <Card mt='4'>
                <Skeleton count={3} />
            </Card>
        </Box >
    )
}

export default loadingIssueDetailsPage