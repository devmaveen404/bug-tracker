import React from 'react'
import { prisma } from '@/prisma/prismaClient'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { IssueStatusBadge } from './components'

// render issues in descending order
const LatestIssues = async () => {
	const issues = await prisma.issue.findMany({
		orderBy: { createdAt: 'desc' },
		take: 5,
		include: {
			assignedToUser: true
		}
	})

	return (
		<Card className='hover:shadow transition duration-400'>
			<Heading size={'4'} mb={'3'}>Most Recent Issues</Heading>
			<Table.Root>
				<Table.Body>
					{issues.map(issue => (
						<Table.Row>
							<Table.Cell>
								<Flex justify={'between'}>
									<Flex direction={'column'} align={'start'} gap={'2'}>
										<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
										<IssueStatusBadge status={issue.status} />
									</Flex>
									{/* if issue is assigned to a user */}
									{issue.assignedToUserId && (
										<Avatar src={issue.assignedToUser!.image!}
											fallback='#'
											size={'2'}
											radius='full'
										/>
									)}
								</Flex>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Card>
	)
}

export default LatestIssues