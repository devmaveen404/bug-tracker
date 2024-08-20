import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Em, Heading } from '@radix-ui/themes';

export default async function Home() {

  //access session on server
  const session = await getServerSession(authOptions);

  return (
    <Heading>Welcome{session && <Em>{`, ${session.user!.name}`}</Em>}</Heading>
  )
}
