import { Flex } from "@chakra-ui/react";
import colors from "../Colors";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
    ScatterChart, Scatter,ResponsiveContainer 
  } from "recharts";
  import React, { PureComponent } from 'react';
  import { } from 'recharts';
  
  const scattereddata = [
    { age: 12,clients:10 },
    { age: 16,clients:15 },
    { age: 20,clients:20 },
    { age: 25,clients:30 },
    { age: 30,clients:80 },
    { age: 35,clients:25 },
    { age: 40,clients:50 },
    { age: 45,clients:40 },
    { age: 50,clients:70 },
    { age: 55,clients:30 },
    { age: 60,clients:60 },
  ];
    
  const data = [
    { monthname: "Jan", clients: 132},
    { monthname: "Feb", clients: 132},
    { monthname: "March", clients: 312},
    { monthname: "April", clients: 302},
    { monthname: "May", clients: 132},
    { monthname: "June", clients: 222},
    { monthname: "July", clients: 320},
    { monthname: "Aug", clients: 50},
    { monthname: "Sep", clients: 50},
    { monthname: "Oct", clients: 50},
    { monthname: "Nov", clients: 50},
    { monthname: "Dec", clients: 50},
  ];

  const RechartsExample = () => {
    return (
      <Flex style={{flexDirection:"row"}}width={'auto'}>      
      <LineChart width={450} height={300} data={data} margin={{
            top: 20,
            right: 20,
            bottom:20,
            left: 20,
          }}>
        <Line type="monotone" dataKey="clients" stroke={colors.secondary} strokeWidth={3} name="Monthly Appointments" interval={0}/>
        <CartesianGrid stroke="#ccc"/>
        <XAxis dataKey="monthname" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>        
      </Flex>
   );    
  };
  
  export default RechartsExample;