'use client'
import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {

    // using reactquery to fetch user from the backend(server) and cache user to the client side
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(res => res.data),
        // set duration for which fetched data should be cached for, after the duration, the user(data) is refetched
        staleTime: 60 * 1000, //60s
        retry: 3
    });

    if (isLoading) return <Skeleton />

    if (error) return null;

    return (
        <Select.Root
            defaultValue={issue.assignedToUserId || ''}
            onValueChange={(userId) => {
                axios.patch('/api/issues/' + issue.id, { assignedToUserId: userId || null })
            }}>
            <Select.Trigger placeholder='Assign..' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value=''>Unassigned</Select.Item>
                    {users?.map(user => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect