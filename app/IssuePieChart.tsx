'use client'
import { Card } from "@radix-ui/themes";
import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueBarChart = ({ open, inProgress, closed }: Props) => {

    const data = [
        { label: 'Open', value: open },
        { label: 'Ongoing', value: inProgress },
        { label: 'Closed', value: closed }
    ]

    return (
        <Card>
            <ResponsiveContainer width={'35%'} height={300}>
                <PieChart >
                    <Tooltip />
                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={100}
                        innerRadius={50}
                        style={{ fill: 'var(--accent-8)' }}
                        label={({ label, value }) =>
                            `${label}: ${value}`
                        }
                    />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default IssueBarChart;
