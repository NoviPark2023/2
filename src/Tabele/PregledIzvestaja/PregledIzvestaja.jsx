import React, {useState} from 'react';
import {Divider, Layout, Menu} from 'antd';
import {AreaChartOutlined, PieChartOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import IzvestajiStanovi from './IzvestajiStanovi';
import IzvestajKlijenti from './IzvestajiKlijenti';
import RoiIzvestaji from './RoiIzvestaji';
import {Col, Row} from 'antd/lib';
import IzvestajiGaraze from "./IzvestajiGaraze";

const {Sider, Content} = Layout;

function ReportReview() {
    const [menuItem, setMenuItem] = useState(1);
    return (
        <Layout style={{height: '100%', position: 'relative', backgroundColor: 'red'}}>
            <Sider trigger={null}>
                <Divider />

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key={1} onClick={() => setMenuItem(1)} icon={<PieChartOutlined/>}>
                        Izveštaji Stanovi
                    </Menu.Item>
                    <Menu.Item key={2} onClick={() => setMenuItem(2)} icon={<PieChartOutlined/>}>
                        Izveštaji Garaže
                    </Menu.Item>
                    <Menu.Item key={3} onClick={() => setMenuItem(3)} icon={<PieChartOutlined/>}>
                        Izveštaji Klijenti
                    </Menu.Item>
                    <Menu.Item key={4} onClick={() => setMenuItem(4)} icon={<AreaChartOutlined/>}>
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
                        <IzvestajiStanovi/>
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
                        <IzvestajiGaraze/>
                    </Content>
                )}
                {menuItem === 3 && (
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            position: 'relative',
                        }}
                    >
                        <IzvestajKlijenti/>
                    </Content>
                )}
                {menuItem === 4 && (
                    <Row style={{height: '100%'}}>
                        <Col span={24}>
                            <Content
                                style={{
                                    height: '100%',
                                    margin: '24px 16px',
                                    padding: 24,
                                    position: 'relative',
                                }}
                            >
                                <RoiIzvestaji/>
                            </Content>
                        </Col>
                    </Row>
                )}
            </Layout>
        </Layout>
    );
}

export default ReportReview;
