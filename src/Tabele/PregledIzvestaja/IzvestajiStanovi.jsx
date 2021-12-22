import { InputNumber } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { PieChart, Pie, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend } from 'recharts';

const data01 = [
  { name: 'Group A', value: 150 },
  { name: 'Group B', value: 100 },
];

const data = [
  { name: 'jan', uv: 0 },
  { name: 'feb', uv: 2390 },
  { name: 'mart', uv: 2000 },
  { name: 'april' },
  { name: 'maj', uv: 1890 },
  { name: 'jun', uv: 2390 },
  { name: 'jul', uv: 3490 },
  { name: 'avgust', uv: 3000 },
  { name: 'sep', uv: 2000 },
  { name: 'okt' },
  { name: 'nov', uv: 3490 },
  { name: 'dec', uv: 2390 },
];

const data02 = [
  {
    name: 'Korisnici',
    prvi: 100,
    drugi: 200,
    amt: 2400,
  },
];

const data03 = [
  {
    name: '5',
    uv: 0,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '10',
    uv: 900,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '15',
    uv: 1000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '20',
    uv: 1780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '25',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '30',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '35',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const data04 = [
  {
    name: 'Dostupni',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Rezervisani',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Prodati',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
];

export default function IzvestajiStanovi() {
  return (
    <>
      <h1>1.Ukupan broj stanova</h1>
      <BarChart width={300} height={300} data={data04}>
        <Bar dataKey="uv" fill="#e74c3c" />
      </BarChart>
      {/* <h4>dostupni rezervisani prodati</h4> */}
      <h1>2.Prodaja stanova izrazena u procentima</h1>
      <PieChart width={900} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data01}
          cx={200}
          cy={200}
          outerRadius={150}
          fill="#1890ff"
          label
        />
        <Tooltip />
      </PieChart>
      <h1>3.Tok prodaje po mesecima</h1>
      <LineChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line connectNulls type="monotone" dataKey="uv" stroke="#e74c3c" fill="#1890ff" />
      </LineChart>
      <h1>4.Ostvaren rezultat prodaje po korisniku</h1>
      <BarChart
        width={900}
        height={400}
        data={data02}
        margin={{
          top: 5,
          right: 40,
          left: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="prvi" fill="#e74c3c" />
        <Bar dataKey="drugi" fill="#1890ff" />
      </BarChart>

      <h1>5.Rast prodaje</h1>

      <LineChart
        width={900}
        height={400}
        data={data03}
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

        <Line type="monotone" dataKey="uv" stroke="#e74c3c" fill="#1890ff" />
      </LineChart>
    </>
  );
}
