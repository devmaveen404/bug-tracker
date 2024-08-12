import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    //redirect user to the not found page
    // if (typeof params.id != 'number') notFound();

    //fetch an issue from prisma
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    // if issue doesn't exist redirect user to the no found page
    if (!issue)
        notFound();

    return (
        <Grid columns={{ initial: '1', md: '2' }} gap='5'>
            <Box>
               <IssueDetails issue={issue}/>
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>
        </Grid>
    )
};

export default IssueDetailsPage; 