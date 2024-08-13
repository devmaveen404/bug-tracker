import React from 'react'
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

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
    <IssueForm />
  )
}

export default newIssuePage