import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import IzvestajiStanovi from './IzvestajiStanovi';
import IzvestajKlijenti from './IzvestajiKlijenti';

function PregledIzvestaja() {
  const { Sider, Content } = Layout;
  return (
    <Layout>
      <Sider trigger={null}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Izvestaj o stanovima
          </Menu.Item>
          <Menu.Item key="2" icon={<PieChartOutlined />}>
            Izvestaj o klijentima
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 900,
          }}
        >
          <IzvestajiStanovi /> <IzvestajKlijenti />
        </Content>
      </Layout>
    </Layout>
  );
}

export default PregledIzvestaja;
