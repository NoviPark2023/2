import React, { useEffect, useState } from 'react';
import { Row, Col, Typography } from 'antd/lib';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import 'antd/dist/antd.css';
import { api } from 'api/api';
import Scroll from 'components/Scroll/Scroll';

const { Title } = Typography;

function ReportsClients() {
  const [dataReserve, setDataReserve] = useState([]);
  const [dataSale, setdataSale] = useState([]);

  const getData = async () => {
    api.get('/reports/kupci/').then(res => {
      if (res.data && res.data.length) {
        const dataReserve = res.data.map(item => {
          return {
            name: item.ime_prezime,
            pv: item.rezervisani_stanovi_klijenti,
            amt: 250,
          };
        });
        const dataSale = res.data.map(item => {
          return {
            name: item.ime_prezime,
            pv: item.prodati_stanovi_klijenti,
            amt: 250,
          };
        });
        setDataReserve(dataReserve);
        setdataSale(dataSale);
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Scroll>
      <Row>
        <Col span={24}>
          <Title level={3}>1.Broj rezervisan stanova po kupcu</Title>
          <BarChart
            width={900}
            height={400}
            data={dataReserve}
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
          <Title level={3}>2.Broj prodatih stanova po kupcu</Title>
          <BarChart
            width={900}
            height={400}
            data={dataSale}
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
    </Scroll>
  );
}
export default ReportsClients;
