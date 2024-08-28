import React from 'react'
import { Status } from '@prisma/client'
import { prisma } from '@/prisma/prismaClient'
import IssueActions from './IssueActionButtons'
import Pagination from '@/app/components/Pagination'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import { Flex, Grid } from '@radix-ui/themes'
import issueListImage from '../../assets/completed.png'
import Image from 'next/image'


interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {


  // validate issues, issues status, before rendering
  //returns status properties
  const statuses = Object.values(Status)
  // a) filter issues by status
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  //sort issues in asc or desc
  const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: searchParams.sort } : undefined;

  //  const toggleOrder = () => {
  //     return !searchParams.sort || searchParams.sort === "desc" ? "asc" : "desc";
  // };

  // Pagination
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10

  //fetch all issues in the database
  const issues = await prisma.issue.findMany({
    where: {
      // b)
      status
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  // get total number of issues
  const issueCount = await prisma.issue.count({
    where: { status }
  })

  return (
    <Grid columns={{ initial: '1', md: '2' }} className='p-7'>
      <Flex direction={'column'} gap={'4'} className='max-w-2xl'>
        <IssueActions />
        <IssueTable searchParams={searchParams} issues={issues} />
        <Pagination itemCount={issueCount} currentPage={page} pageSize={pageSize} />
      </Flex>
      <Flex className='lg:hidden object-contain justify-center items-center ml-12'>
        <Image
          src={issueListImage}
          width={500}
          height={500}
          alt='add new issue page' />
      </Flex>
    </Grid>
  )
}

// cache on the server
// to render page dynamically at build time
export const dynamic = 'force-dynamic';

export default IssuesPage