'use client'
// build issue charts
import { Card, Inset } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts'

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
    const data = [
        { label: 'Open', value: open },
        { label: 'Ongoing', value: inProgress },
        { label: 'Closed', value: closed }
    ]

    return (
        <div style={{ marginTop: '6px', marginLeft: '12px', marginRight: '12px' }}>
            <Card className="hover:shadow transition duration-400 border border-1" variant="ghost">
                <ResponsiveContainer width={'100%'} height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey='label' />
                        <YAxis />
                        <Bar dataKey={'value'} barSize={60} style={{ fill: 'var(--accent-11)', width: '100%', border: 'none' }} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    )
}

export default IssueChart