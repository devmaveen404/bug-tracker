import React from 'react'
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
import { Grid, Flex } from '@radix-ui/themes';
import Image from 'next/image';
import newIssueImage from '../../assets/idea.svg'

// render issueform dynamically
const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
);

const newIssuePage = () => {
  return (
    <Grid columns={{ initial: '1', md: '2' }} className='pt-20'>
      <IssueForm />
      <Flex justify={'center'}>
        <Image
          src={newIssueImage}
          width={450}
          height={450}
          alt='add new issue page'
          objectFit='contain'
          className='hidden lg:flex'
        />
      </Flex>
    </Grid>
  )
}

export default newIssuePage