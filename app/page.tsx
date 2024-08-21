import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Em, Heading } from '@radix-ui/themes';
import Pagination from './components/pagination';
import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

export default async function Home() {

  //access session on server
  const session = await getServerSession(authOptions);

  // fetch issue status from database\
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })

  return (
    <>
      <Heading mb={'8'}>Welcome{session && <Em>{`, ${session.user!.name}`}</Em>}</Heading>
      {/* <LatestIssues /> */}
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
    </>
  )
}
