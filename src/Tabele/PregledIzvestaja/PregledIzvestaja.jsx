import React, { useState } from 'react';
import { Divider, Layout, Menu } from 'antd';
import { AreaChartOutlined, PieChartOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import IzvestajiStanovi from './IzvestajiStanovi';
import RoiIzvestaji from './RoiIzvestaji';
import { Col, Row } from 'antd/lib';
import IzvestajiGaraze from './IzvestajiGaraze';
import IzvestajiLokali from './IzvestajiLokali';

const { Sider, Content } = Layout;

function ReportReview() {
  const [menuItem, setMenuItem] = useState(1);
  return (
    <Layout>
      <Sider trigger={null} width={180}>
        <Divider />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
          <Menu.Item key={1} onClick={() => setMenuItem(1)} icon={<PieChartOutlined />}>
            Izveštaji Stanovi
          </Menu.Item>
          <Menu.Item key={2} onClick={() => setMenuItem(2)} icon={<PieChartOutlined />}>
            Izveštaji Lokali
          </Menu.Item>
          <Menu.Item key={3} onClick={() => setMenuItem(3)} icon={<PieChartOutlined />}>
            Izveštaji Garaže
          </Menu.Item>
          {/*<Menu.Item key={4} onClick={() => setMenuItem(4)} icon={<PieChartOutlined/>}>*/}
          {/*    Izveštaji Klijenti*/}
          {/*</Menu.Item>*/}
          <Menu.Item key={5} onClick={() => setMenuItem(5)} icon={<AreaChartOutlined />}>
            ROI Izeštaji
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {menuItem === 1 && (
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              position: 'relative',
            }}
          >
            <IzvestajiStanovi />
          </Content>
        )}
        {menuItem === 2 && (
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              position: 'relative',
            }}
          >
            <IzvestajiLokali />
          </Content>
        )}
        {menuItem === 3 && (
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              position: 'relative',
            }}
          >
            <IzvestajiGaraze />
          </Content>
        )}
        {/*{menuItem === 4 && (*/}
        {/*    <Content*/}
        {/*        style={{*/}
        {/*            margin: '24px 16px',*/}
        {/*            padding: 24,*/}
        {/*            position: 'relative',*/}
        {/*        }}*/}
        {/*    >*/}
        {/*        <IzvestajKlijenti/>*/}
        {/*    </Content>*/}
        {/*)}*/}
        {menuItem === 5 && (
          <Row style={{ height: '100%' }}>
            <Col span={24}>
              <Content
                style={{
                  height: '100%',
                  margin: '24px 16px',
                  padding: 24,
                  position: 'relative',
                }}
              >
                <RoiIzvestaji />
              </Content>
            </Col>
          </Row>
        )}
      </Layout>
    </Layout>
  );
}

export default ReportReview;
