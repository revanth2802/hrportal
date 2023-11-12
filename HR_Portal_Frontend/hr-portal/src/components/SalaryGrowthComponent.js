import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ResponsiveContainer } from 'recharts';

function SalaryGrowthComponent() {
    const [salaryGrowthData, setSalaryGrowthData] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:5000/salary_growth')
        .then(response => {
            setSalaryGrowthData(response.data.data.map(item => ({
                month: item.month,
                avgSalary: item.avg_salary
            })));
        })
        .catch(error => {
            console.error('Error fetching salary growth:', error);
        });
    }, []);

    return (
        <div style={{ width: '100%', minHeight: '280px' }}>
            {/* <h3>Salary Growth Over Time</h3> */}
            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={salaryGrowthData}>
                    <Line type="monotone" dataKey="avgSalary" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
    
}

export default SalaryGrowthComponent;
