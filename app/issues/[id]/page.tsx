import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

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
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt='4'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    )
};

export default IssueDetailsPage; 