'use client'
import { Card } from "@radix-ui/themes";
import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

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

    const COLORS = ['#E5484D', '#E54D2E', '#46A758'];

    return (
        <div style={{ marginTop: '12px ', marginLeft: '12px', marginRight: '12px' }} >
            <Card className="hover:shadow transition duration-400 border border-1 bg-black" variant="ghost">
                <ResponsiveContainer width={'100%'} height={300} >
                    <PieChart >
                        <Pie
                            data={data}
                            dataKey="value"
                            outerRadius={100}
                            innerRadius={65}
                            fill='#8884d8'
                            // style={{ fill: 'var(--accent-11)', outline: 'none' }}
                            label={({ label, value }) =>
                                `${label}: ${value}`
                            }
                        >
                            {/* <Label
                                value="6" position="centerBottom" className='label-top' fontSize='27px'
                            />
                            <Label
                                value="tasks left" position="centerTop" className='label'
                            /> */}
                            {
                                data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default IssueBarChart;
