import React from 'react';
import { Row, Col, Typography } from 'antd/lib';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import 'antd/dist/antd.css';
import styles from './PregledIzvestaja.module.css';

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
const { Title } = Typography;

function IzvestajKlijenti() {
  return (
    <>
      <Row>
        <Col span={24}>
          <Title className={styles.styleTitle} level={3}>
            {' '}
            1.Broj rezervisan stanova po kupcu
          </Title>
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
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title className={styles.styleTitle} level={3}>
            {' '}
            2.Broj prodatih stanova po kupcu
          </Title>
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
        </Col>
      </Row>
    </>
  );
}
export default IzvestajKlijenti;
