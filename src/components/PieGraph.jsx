import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import colors from "./Colors";
const data = [
  { gender: 'Male', value: 40 },
  { gender: 'Female', value: 60 },
];

const COLORS = [colors.primary,colors.secondary];

const PieGraph = () => {
  return (
    <PieChart width={300} height={285} padding={0} margin={0}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={200}
        cy={120}
        outerRadius={80}
        fill={colors.secondary}

      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend formatter={(value, entry) => `${entry.payload.gender} - ${entry.payload.value}`} />
    </PieChart>
  );
};

export default PieGraph;
