import React, {useEffect, useState} from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    const chartColors = ['#61dbfb', '#F0DB4F', '#4ccf75', '#0769ad', '#dd1b16']

    const getData = () => {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const data = genres.map((genre) => {
            const value = events.filter((event) => event.summary.split(' ').includes(genre)).length;
            return { name: genre, value};
        })
        return data;
    }

    useEffect(() => { setData(() => getData()) }, [events]);

    return (
        <ResponsiveContainer height={400}>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill='#8884d8'
                    stroke='transparent'
                    dataKey='value'
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                        ))
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenre;