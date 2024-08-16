// issue details page
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    //get current user session, from auth/route.tsx 
    const session = await getServerSession(authOptions);

    //redirect user to the not found page
    // if (typeof params.id != 'number') notFound();

    //fetch an issue from prisma
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    // if issue doesn't exist redirect user to the no found page
    if (!issue)
        notFound();

    return (
        //apply 
        <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session && <Box>
                <Flex direction={"column"} gap={"4"} className='max-w-xs'>
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>}
        </Grid>
    )
};

export default IssueDetailsPage; 