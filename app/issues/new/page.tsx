import React from 'react'
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
import { Grid } from '@radix-ui/themes';
import Image from 'next/image';
import newIssueImage from '../../assets/join.png'

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
    <Grid columns={{ initial: '1', md: '2' }}>
      <IssueForm />
      <div className='justify-left items-right align-middle object-contain'>
        <Image
          src={newIssueImage}
          width={500}
          height={500}
          alt='add new issue page'
        />
      </div>
    </Grid>

  )
}

export default newIssuePage