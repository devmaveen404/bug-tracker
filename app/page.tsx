import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Em, Flex, Grid, Heading } from '@radix-ui/themes';
import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';
import { PrismaClient } from '@prisma/client';
import IssueBarChart from './IssueBarChart';


const prisma = new PrismaClient()

export default async function Home() {

  //access session on server
  const session = await getServerSession(authOptions);

  // fetch issue status from database\
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })

  return (
    <div className='p-7'>
      <Heading mb={'8'}>Welcome{session && <Em>{`, ${session.user!.name}`}</Em>}</Heading>
      {/* <IssuePieChart open={open} inProgress={inProgress} closed={closed}/> */}
      <Grid columns={{ initial: '1', md: '2' }} gap={'5'}>
        <Flex direction='column' gap={'5'}>
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueBarChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssues />
      </Grid>
    </div>
  )
}
