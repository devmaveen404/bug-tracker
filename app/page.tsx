import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Em, Heading } from '@radix-ui/themes';
import Pagination from './components/pagination';
import LatestIssues from './LatestIssues';

export default async function Home({ searchParams }: { searchParams: { page: string }; }) {

  //access session on server
  const session = await getServerSession(authOptions);

  return (
    <>
      <Heading mb={'8'}>Welcome{session && <Em>{`, ${session.user!.name}`}</Em>}</Heading>
      <LatestIssues />
    </>
  )
}
