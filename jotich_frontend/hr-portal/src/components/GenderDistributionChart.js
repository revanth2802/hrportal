// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// function GenderDistributionChart({ data }) {
//   const COLORS = ["#FF6384", "#36A2EB"];

//   if (!data || data.length === 0) {
//     return <p>No data available for Gender Distribution.</p>;
//   }

//   return (
//     <div>
//       <h3>Gender Distribution</h3>
//       <PieChart width={280} height={280}>
//         <Pie
//           data={data}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// }

// export default GenderDistributionChart;

// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// function GenderDistributionChart({ data }) {
//   const COLORS = ["#FF6384", "#36A2EB"];

//   // Function to transform the data
//   const transformData = (data) => {
//     return Object.keys(data).map((key) => ({
//       name: key === "M" ? "Male" : "Female",
//       value: data[key],
//     }));
//   };

//   // Check if data exists and has keys 'M' and 'F'
//   if (!data || !data.M || !data.F) {
//     return <p>No data available for Gender Distribution.</p>;
//   }

//   // Transform the data
//   const transformedData = transformData(data);

//   return (
//     <div>
//       <h3>Gender Distribution</h3>
//       <PieChart width={280} height={280}>
//         <Pie
//           data={transformedData}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//           label
//         >
//           {transformedData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// }

// export default GenderDistributionChart;

// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// function GenderDistributionChart({ genderData }) {
//   const COLORS = ["#FF6384", "#36A2EB"];

//   // Assuming genderData is an object with 'M' and 'F' as keys
//   // This check ensures that 'genderData' is not null or undefined
//   if (!genderData || genderData.M == null || genderData.F == null) {
//     return <p>No data available for Gender Distribution.</p>;
//   }

//   // Transform the data for the Pie chart
//   // Now 'transformData' will handle any sort of key and convert it into a proper format for the chart
//   const transformData = (data) => {
//     return Object.keys(data).map(key => ({
//       name: key === "M" ? "Male" : "Female", // You can extend this logic for other gender identities if necessary
//       value: data[key],
//     }));
//   };

//   // Call 'transformData' to transform 'genderData' into the format required by Recharts
//   const transformedData = transformData(genderData);

//   return (
//     <div>
//       <h3>Gender Distribution</h3>
//       <PieChart width={280} height={280}>
//         <Pie
//           data={transformedData}
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//           fill="#8884d8"
//           dataKey="value"
//           nameKey="name"
//           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//         >
//           {transformedData.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip formatter={(value) => `${value} Employees`} />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// }

// export default GenderDistributionChart;

// import React from 'react';
// import { PieChart, Pie, Tooltip } from 'recharts';

// const GenderDistributionChart = ({ genderData }) => {
//   // Convert the gender data object into an array for the chart
//   const chartData = Object.keys(genderData).map(gender => ({
//     gender,
//     count: genderData[gender],
//   }));

//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         dataKey="count"
//         isAnimationActive={false}
//         data={chartData}
//         cx={200}
//         cy={200}
//         outerRadius={80}
//         fill="#82ca9d"
//         label
//       />
//       <Tooltip />
//     </PieChart>
//   );
// };

// export default GenderDistributionChart;

import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { ResponsiveContainer } from 'recharts';

const GenderDistributionChart = ({ genderData }) => {
  if (!genderData || !genderData.data) {
    return <div>No data available</div>;
  }

  const chartData = Object.keys(genderData.data).map(key => ({
    name: key,
    value: genderData.data[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
        <PieChart>
            <Pie
                dataKey="value"
                isAnimationActive={false}
                data={chartData}
                cx="50%"  // Center the pie in the container
                cy="50%"  // Center the pie in the container
                outerRadius={80}
                fill="#82ca9d"
                label
            />
            <Tooltip />
        </PieChart>
    </ResponsiveContainer>
);
};

export default GenderDistributionChart;
