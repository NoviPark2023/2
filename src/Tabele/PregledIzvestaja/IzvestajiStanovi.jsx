import React, { useEffect, useState } from 'react';
import { InputNumber, Row, Col, Typography } from 'antd/lib';
import { PieChart, Pie, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend } from 'recharts';
import 'antd/dist/antd.css';
import styles from './PregledIzvestaja.module.css';
import { api } from 'api/api';

const { Title } = Typography;

function IzvestajiStanovi() {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);

  const getData = async () => {
    api.get('/reports/').then(res => {
      setData(res.data);
    });
  };

  const getUsers = async () => {
    api.get('/reports/korisnici/').then(res => {
      const list = res.data.map(item => ({ ...item, modal: false }));
      setUsers(list);
    });
  };
  useEffect(() => {
    getData();
    getUsers();
  }, []);

  const data01 = [
    {
      name: 'Dostupni',
      uv: data.dostupan,
      pv: 2400,
      amt: 2290,
    },
    {
      name: 'Rezervisani',
      uv: data.rezervisano,
      pv: 2400,
      amt: 2290,
    },
    {
      name: 'Prodati',
      uv: data.prodat,
      pv: 2400,
      amt: 2290,
    },
  ];

  const data02 = [
    { name: 'Rezervisani', value: data.procenat_rezervisan },
    { name: 'Dostupni', value: data.procenat_dostupan },
    { name: 'Prodati', value: data.procenat_prodat },
  ];

  const data03 = data.prodaja_po_mesecima
    ? [
        { name: 'jan', uv: data.prodaja_po_mesecima[0].jan },
        { name: 'feb', uv: data.prodaja_po_mesecima[0].feb },
        { name: 'mart', uv: data.prodaja_po_mesecima[0].mart },
        { name: 'april', uv: data.prodaja_po_mesecima[0].apr },
        { name: 'maj', uv: data.prodaja_po_mesecima[0].maj },
        { name: 'jun', uv: data.prodaja_po_mesecima[0].jun },
        { name: 'jul', uv: data.prodaja_po_mesecima[0].jul },
        { name: 'avgust', uv: data.prodaja_po_mesecima[0].avg },
        { name: 'sep', uv: data.prodaja_po_mesecima[0].sep },
        { name: 'okt', uv: data.prodaja_po_mesecima[0].okt },
        { name: 'nov', uv: data.prodaja_po_mesecima[0].nov },
        { name: 'dec', uv: data.prodaja_po_mesecima[0].dec },
      ]
    : [];

  const users01 = [
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

  const data05 = [
    {
      name: 'jan',
      uv: 0,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'feb',
      uv: 900,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'mart',
      uv: 1000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'april',
      uv: 1780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'maj',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'jun',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'jul',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'avg',
      uv: 1780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'sep',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'okt',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'nov',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'dec',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <>
      <Row>
        <Col span={12}>
          <Title className={styles.styleTitle} level={3}>
            1.Ukupan broj stanova <InputNumber readOnly min={1} max={250} value={data.ukupno_stanova} />
          </Title>

          <BarChart width={300} height={300} data={data01}>
            <Bar dataKey="uv" fill="#e74c3c" />
          </BarChart>
          <InputNumber className={styles.styleNumber} readOnly min={1} max={250} value={data.dostupan} />
          <InputNumber className={styles.styleNumber} readOnly min={1} max={250} value={data.rezervisano} />
          <InputNumber className={styles.styleNumber} readOnly min={1} max={250} value={data.prodat} />
          <Row>
            <Col span={6}>
              <Title style={{ marginLeft: '10px', marginTop: '5px' }} level={5}>
                Dostupni
              </Title>
            </Col>
            <Col span={6}>
              <Title style={{ marginLeft: '-10px', marginTop: '5px' }} level={5}>
                Rezervisani
              </Title>
            </Col>
            <Col span={6}>
              <Title style={{ marginLeft: '-30px', marginTop: '5px' }} level={5}>
                Prodati
              </Title>
            </Col>
            <Col span={6} />
          </Row>
        </Col>
        <Col span={12}>
          <Title className={styles.styleTitle} level={3}>
            2.Prodaja stanova izrazena u procentima
          </Title>
          <PieChart width={900} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data02}
              cx={180}
              cy={170}
              outerRadius={150}
              fill="#1890ff"
              label
            />
            <Tooltip />
          </PieChart>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title className={styles.styleTitle} level={3}>
            3.Tok prodaje po mesecima
          </Title>
          <LineChart
            width={900}
            height={400}
            data={data03}
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
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title className={styles.styleTitle} level={3}>
            4.Ostvaren rezultat prodaje po korisniku
          </Title>
          <BarChart
            width={900}
            height={400}
            data={users01}
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
            5.Rast prodaje
          </Title>

          <LineChart
            width={900}
            height={400}
            data={data05}
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
        </Col>
      </Row>
    </>
  );
}
export default IzvestajiStanovi;
