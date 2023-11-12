

// export default DepartmentDistributionChart;
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ResponsiveContainer } from 'recharts';

const DepartmentDistributionChart = ({ distributionData }) => {
  if (!distributionData || !Array.isArray(distributionData.data)) {
    return <div>No data available</div>;
  }

  // Since the data is an array, we map it directly to chartData
  const chartData = distributionData.data.map(dept => ({
    name: dept.dept_name, // Matched to your data's key
    count: dept.employee_count, // Matched to your data's key
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DepartmentDistributionChart;
