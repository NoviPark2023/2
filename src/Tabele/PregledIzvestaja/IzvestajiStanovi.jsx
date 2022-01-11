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
      if (res.data && res.data.length) {
        const data = res.data.map(item => {
          return { name: item.ime, pv: item.prodati_stanovi_korisnici };
        });
        setUsers(data);
      }
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
    { name: 'Rezervisani', value: data.procenat_rezervisan, fill: '#47d147' },
    { name: 'Dostupni', value: data.procenat_dostupan, fill: '#4080bf' },
    { name: 'Prodati', value: data.procenat_prodat, fill: ' #661400' },
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

  const data05 = data.ukupna_suma_prodatih_stanova
    ? [
        {
          name: 'jan',
          uv: data.ukupna_suma_prodatih_stanova[0].jan.ukupna_suma_prodatih_stanova,
        },
        {
          name: 'feb',
          uv: data.ukupna_suma_prodatih_stanova[0].feb.ukupna_suma_prodatih_stanova,
        },
        {
          name: 'mart',
          uv: data.ukupna_suma_prodatih_stanova[0].mart.ukupna_suma_prodatih_stanova,
        },
        {
          name: 'april',
          uv: data.ukupna_suma_prodatih_stanova[0].apr.ukupna_suma_prodatih_stanova,
        },
        {
          name: 'maj',
          uv: data.ukupna_suma_prodatih_stanova[0].maj.ukupna_suma_prodatih_stanova,
        },
        {
          name: 'jun',
          uv: data.ukupna_suma_prodatih_stanova[0].jun.ukupna_suma_prodatih_stanova,
        },
        {
          name: 'jul',
          uv: data.ukupna_suma_prodatih_stanova[0].jul.ukupna_suma_prodatih_stanova,
        },
        {
          name: 'avg',
          uv: data.ukupna_suma_prodatih_stanova[0].avg.ukupna_suma_prodatih_stanova,
        },
        {
          name: 'sep',
          uv: data.ukupna_suma_prodatih_stanova[0].sep.ukupna_suma_prodatih_stanova,
        },
        {
          name: 'okt',
          uv: data.ukupna_suma_prodatih_stanova[0].okt.ukupna_suma_prodatih_stanova,
        },
        {
          name: 'nov',
          uv: data.ukupna_suma_prodatih_stanova[0].nov.ukupna_suma_prodatih_stanova,
        },
        {
          name: 'dec',
          uv: data.ukupna_suma_prodatih_stanova[0].dec.ukupna_suma_prodatih_stanova,
        },
      ]
    : [];

  return (
    <>
      <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Col span={12}>
          <Title className={styles.styleTitle} level={3}>
            1.Ukupan broj stanova <InputNumber readOnly min={1} max={250} value={data.ukupno_stanova} />
          </Title>

          <BarChart width={300} height={300} data={data01}>
            <Bar dataKey="uv" fill="#e74c3c" />
          </BarChart>
          <Row>
            <Col span={4}>
              <InputNumber className={styles.styleNumber} readOnly min={1} max={250} value={data.dostupan} />
              <Title className={styles.styleSubtitle} level={5}>
                Dostupni
              </Title>
            </Col>
            <Col span={4}>
              <InputNumber className={styles.styleNumber} readOnly min={1} max={250} value={data.rezervisano} />
              <Title className={styles.styleSubtitle} level={5}>
                Rezervisani
              </Title>
            </Col>
            <Col span={4}>
              <InputNumber className={styles.styleNumber} readOnly min={1} max={250} value={data.prodat} />
              <Title className={styles.styleSubtitle} level={5}>
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
            <Pie dataKey="value" isAnimationActive={true} data={data02} cx={180} cy={170} outerRadius={150} label />
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
            data={users}
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
    </>
  );
}
export default IzvestajiStanovi;
