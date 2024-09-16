import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Flex, Grid, Heading } from '@radix-ui/themes';
import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';
import { prisma } from '@/prisma/prismaClient';
import IssueBarChart from './IssueBarChart';
import IssuePieChart from './IssuePieChart';
import CompletedIssues from './CompletedIssues';
import OpenedIssues from './OpenedIssues';
import { Metadata } from 'next';


export default async function Home() {

  //access session on server
  const session = await getServerSession(authOptions);

  // fetch issue status from database\
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })

  return (
    <>
    <div className='px-7 pt-28 lg:bg-custom-background bg-white bg-no-repeat bg-center bg-cover pb-5'>
      <Heading mt={'7'} my={'8'}>Welcome{session && `, ${session.user!.name}.`}</Heading>
      {/* <IssuePieChart open={open} inProgress={inProgress} closed={closed}/> */}
      <Grid columns={{ initial: '1', md: '2' }} gap={'5'}>
        <Flex direction='column' gap={'5'}>
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueBarChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>

        <LatestIssues />
      </Grid>
      <Grid columns={{ initial: '1', md: '3' }} gap={'5'} className='mt-5'>
        <CompletedIssues />
        <OpenedIssues />
        <IssuePieChart open={open} inProgress={inProgress} closed={closed} />
      </Grid>
    </div>
    </>
  )
}

// adding metadata
export const metadata: Metadata = {
  title: 'Bug Tracker - Dashboard',
  description: 'This page contains the summary of bugs'
}