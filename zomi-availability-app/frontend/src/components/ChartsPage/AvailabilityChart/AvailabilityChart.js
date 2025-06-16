import classes from './AvailabilityChart.module.css'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {getAvailablePlayerCount} from "../../../services/AvailabilityService";
import {useEffect, useState} from "react";

function AvailabilityChart() {
    const [availablePlayerCount, setAvailablePlayerCount] = useState([])

    useEffect(() => {
        async function fetchAvailablePlayerCount() {
            try {
                const availablePlayerCount = await getAvailablePlayerCount();
                setAvailablePlayerCount(availablePlayerCount);
            } catch (error) {
                console.error("failed to get available player count")
            }
        }
        fetchAvailablePlayerCount();
    }, [])


    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const date = label;
            const count = payload[0].value;

            return (
                <div style={{backgroundColor: '#fff', padding: '10px', borderRadius: '5px', border: '2px solid lightgray', color: '#ed7129'}}>
                    <p style={{ fontSize: '14px' }}>Date: {date}</p>
                    <p style={{ fontSize: '14px' }}>Available Players: {count}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <div className={classes.barChartContainer}>
                <ResponsiveContainer width="75%" height={300}>
                    <BarChart data={availablePlayerCount} style={{ fontSize: 12 }} margin={{ top: 20, right: 30, bottom: 30, left: 20 }}>
                        <XAxis dataKey="date" angle={-45} textAnchor="end"/>
                        <YAxis/>
                        <Tooltip content={customTooltip}/>
                        <Bar dataKey="count" fill="#ed7129" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default AvailabilityChart;