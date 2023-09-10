import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import colors from "./Colors";
const data = [
  { age: '16-19', count: 10 },
  { age: '20-23', count: 20 },
  { age: '24-27', count: 30 },
  { age: '28-31', count: 40 },
  { age: '32-35', count: 50 },
  { age: '36-39', count: 45 },
  { age: '40-42', count: 35 },
];

const BarGraph = () => {
  return (
    <BarChart width={450} height={290} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="age" />
      <YAxis />
      <Tooltip />
      <Legend formatter={(value) => `Clients by Age`} />
      <Bar dataKey="count" fill={colors.secondary} />
    </BarChart>
  );
};

export default BarGraph;
