import 'antd/dist/antd.css';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: 'Kupac1',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Kupac2',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Kupac3',
    pv: 9800,
    amt: 2290,
  },
];

export default function IzvestajKlijenti() {
  return (
    <>
      <h1> 1.Broj rezervisan stanova po kupcu</h1>
      <BarChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#e74c3c" />
      </BarChart>
      <h1> 2.Broj prodatih stanova po kupcu</h1>
      <BarChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#1890ff" />
      </BarChart>
    </>
  );
}
