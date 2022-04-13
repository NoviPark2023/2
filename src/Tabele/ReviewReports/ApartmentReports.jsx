import React, { useEffect, useState } from 'react';
import { Row, Col, Typography } from 'antd/lib';
import { Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import 'antd/dist/antd.css';
import { Card, Divider } from 'antd';
import { Statistic } from 'antd/es';
import { api } from 'api/api';
import Scroll from 'components/Scroll/Scroll';
import stanovi_izvestaji_icon from '../../assets/apartments/apartments-icon-reports.png';

const { Title } = Typography;

function ReportsApartments() {
  const [data, setData] = useState({});
  const [, setUsers] = useState([]);

  const getData = async () => {
    api.get('/reports/').then(res => {
      setData(res.data);
    });
  };

  const getUsers = async () => {
    api.get('/reports/korisnici/').then(res => {
      if (res.data && res.data.length) {
        const data = res.data.map(item => {
          return { name: item.ime, Prodaja: item.prodati_stanovi_korisnici };
        });
        setUsers(data);
      }
    });
  };
  useEffect(() => {
    getData();
    getUsers();
  }, []);

  /*Podaci za PieChar Stanova BROJEVI*/

  const COLORS_BROJEVI = ['#0088FE', '#0062c4', '#28beff', '#2aaecc'];
  const data_stanovi_brojevi = [
    { name: 'Dostupnih', value: data.dostupan },
    { name: 'Rezervisanih', value: data.rezervisano },
    { name: 'Prodatih', value: data.prodat },
  ];

  /*Podaci za PieChar Lokala PROCENTI*/

  const COLORS_PROCENTI = ['#0088FE', '#0062c4', '#28beff', '#2aaecc'];
  const data_stanovi_procenti = [
    { name: 'Dostupnih (%)', value: data.procenat_dostupan },
    { name: 'Rezervisanih (%)', value: data.procenat_rezervisan },
    { name: 'Prodatih (%)', value: data.procenat_prodat },
  ];

  const dataProdajaPoMesecima = data.prodaja_po_mesecima
    ? [
        { name: 'jan', stanovi: data.prodaja_po_mesecima[0].jan },
        { name: 'feb', stanovi: data.prodaja_po_mesecima[0].feb },
        { name: 'mart', stanovi: data.prodaja_po_mesecima[0].mart },
        { name: 'april', stanovi: data.prodaja_po_mesecima[0].apr },
        { name: 'maj', stanovi: data.prodaja_po_mesecima[0].maj },
        { name: 'jun', stanovi: data.prodaja_po_mesecima[0].jun },
        { name: 'jul', stanovi: data.prodaja_po_mesecima[0].jul },
        { name: 'avgust', stanovi: data.prodaja_po_mesecima[0].avg },
        { name: 'sep', stanovi: data.prodaja_po_mesecima[0].sep },
        { name: 'okt', stanovi: data.prodaja_po_mesecima[0].okt },
        { name: 'nov', stanovi: data.prodaja_po_mesecima[0].nov },
        { name: 'dec', stanovi: data.prodaja_po_mesecima[0].dec },
      ]
    : [];

  const dataSumaProdatoMeseci = data.ukupna_suma_prodatih_stanova
    ? [
        {
          name: 'jan',
          prihod: data.ukupna_suma_prodatih_stanova[0].jan,
        },
        {
          name: 'feb',
          prihod: data.ukupna_suma_prodatih_stanova[0].feb,
        },
        {
          name: 'mart',
          prihod: data.ukupna_suma_prodatih_stanova[0].mart,
        },
        {
          name: 'april',
          prihod: data.ukupna_suma_prodatih_stanova[0].apr,
        },
        {
          name: 'maj',
          prihod: data.ukupna_suma_prodatih_stanova[0].maj,
        },
        {
          name: 'jun',
          prihod: data.ukupna_suma_prodatih_stanova[0].jun,
        },
        {
          name: 'jul',
          prihod: data.ukupna_suma_prodatih_stanova[0].jul,
        },
        {
          name: 'avg',
          prihod: data.ukupna_suma_prodatih_stanova[0].avg,
        },
        {
          name: 'sep',
          prihod: data.ukupna_suma_prodatih_stanova[0].sep,
        },
        {
          name: 'okt',
          prihod: data.ukupna_suma_prodatih_stanova[0].okt,
        },
        {
          name: 'nov',
          prihod: data.ukupna_suma_prodatih_stanova[0].nov,
        },
        {
          name: 'dec',
          prihod: data.ukupna_suma_prodatih_stanova[0].dec,
        },
      ]
    : [];

  return (
    <Scroll>
      {/*Title with Icon*/}
      <Row>
        <Col span={24}>
          <Title level={3}>
            {' '}
            <img src={stanovi_izvestaji_icon} alt="icon stanovi" />
            Izveštaji Stanovi
          </Title>
          <Divider />
        </Col>
      </Row>
      {/*STANOVI STATISTIKA BROJEVI*/}
      <Row gutter={24} style={{ padding: '0px', marginTop: '0px', marginRight: '0px' }}>
        <Col span={24}>
          <Card
            style={{
              width: '100%',
              margin: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Statistic
              title="UKUPAN BROJ STANOVA"
              value={data.ukupno_stanova}
              valueStyle={{ color: '#3f8600', textAlign: 'center' }}
              s
            />
          </Card>
        </Col>
        {/*DOSTUPNI STANOVI BROJEVI*/}
        <Col span={12}>
          <Row gutter={24} style={{ padding: '0px', marginTop: '0px', marginRight: '0px' }}>
            <Col span={8}>
              <Card
                style={{
                  width: '100%',
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Statistic
                  style={{ textAlign: 'center' }}
                  title="Dostupnih"
                  value={data.dostupan}
                  valueStyle={{ color: '#3f8600', textAlign: 'center' }}
                />
              </Card>
            </Col>
            {/*END Dostupn Stanovi BROJEVI*/}

            {/*REZERVISANI STANOVI BROJEVI*/}
            <Col span={8}>
              <Card
                style={{
                  width: '100%',
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Statistic
                  style={{ textAlign: 'center' }}
                  title="Rezervisanih"
                  value={data.rezervisano}
                  valueStyle={{ color: '#3f8600', textAlign: 'center' }}
                />
              </Card>
            </Col>
            {/*END Rezervisani Stanova BROJEVI*/}

            {/*PRODATI LOKALI BROJEVI*/}
            <Col span={8}>
              <Card
                style={{
                  width: '100%',
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Statistic
                  style={{ textAlign: 'center' }}
                  title="Prodatih"
                  value={data.prodat}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            {/*END Prodati Stanovi BROJEVI*/}

            {/*Pie Char Stanovi BROJEVI*/}
            <Col span={24}>
              <Card
                style={{
                  width: '100%',
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <PieChart width={700} height={400}>
                  <Pie
                    data={data_stanovi_brojevi}
                    dataKey="value"
                    cx={320}
                    cy={270}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={120}
                    outerRadius={200}
                    fill="#8884d8"
                    label
                  >
                    {data_stanovi_brojevi.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_BROJEVI[index % COLORS_BROJEVI.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Card>
            </Col>
            {/*END Pie Char Stanovi BROJEVI*/}

            {/*TOK PRODAJE LOKALA PO MESECIMA*/}
            <Col
              span={24}
              style={{
                width: '100%',
                margin: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card
                style={{
                  width: '100%',
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {' '}
                <Title level={5} align="center">
                  Broj prodatih stanova po mesecima
                </Title>
                <BarChart width={550} height={300} data={dataProdajaPoMesecima}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stanovi" fill="#1890ff" background={{ fill: '#eee' }} />
                </BarChart>
              </Card>
            </Col>
            {/*END tok prodaje Stanova po mesecima*/}
          </Row>
        </Col>

        {/*STANOVI STATISTIKA PROCENTI*/}
        <Col span={12}>
          <Row gutter={24}>
            {/*DOSTUPNI STANOVI PROCENTI*/}
            <Col span={8}>
              <Card
                style={{
                  width: '100%',
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Statistic
                  title="Dostupnih"
                  value={data.procenat_dostupan}
                  valueStyle={{ color: '#3f8600' }}
                  suffix="%"
                />
              </Card>
            </Col>
            {/*END Dostupni Stanovi PROCENTI*/}

            {/*REZERVISANI STANOVI PROCENTI*/}
            <Col span={8}>
              <Card
                style={{
                  width: '100%',
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Statistic
                  title="Rezervisanih"
                  value={data.procenat_rezervisan}
                  precision={2}
                  valueStyle={{ color: '#4d4dff' }}
                  suffix="%"
                />
              </Card>
            </Col>
            {/*END Rezervisani Stanovi PROCENTI*/}

            {/*PRODATI STANOVI PROCENTI*/}
            <Col span={8}>
              <Card
                style={{
                  width: '100%',
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Statistic
                  title="Prodatih"
                  value={data.procenat_prodat}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  suffix="%"
                />
              </Card>
            </Col>
            {/*END Prodati Stanovi PROCENTI*/}

            {/*Pie Char STANOVI PROCENTI*/}
            <Col span={24}>
              <Card
                style={{
                  width: '100%',
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <PieChart width={400} height={400}>
                  <Pie data={data_stanovi_procenti} dataKey="value" fill="#8884d8" label>
                    {data_stanovi_procenti.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_PROCENTI[index % COLORS_PROCENTI.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Card>
            </Col>
            {/*END Pie Char STANOVI PROCENTI*/}

            {/*UKUPNA SUMA PRODAJE STANOVA PO MESECIMA*/}
            <Col
              span={24}
              style={{
                width: '100%',
                margin: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Card
                style={{
                  width: '100%',
                  margin: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {' '}
                <Title level={5} align="center">
                  Ukupna suma prodaja po mesecima
                </Title>
                <BarChart width={550} height={300} data={dataSumaProdatoMeseci}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="prihod" fill="#1890ff" background={{ fill: '#eee' }} />
                </BarChart>
              </Card>
            </Col>
            {/*END ukupna suma prodaje Stanova po mesecima*/}
          </Row>
        </Col>
      </Row>
      <Divider />
    </Scroll>
  );
}

export default ReportsApartments;
