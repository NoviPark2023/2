import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import {PieChartOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import IzvestajiStanovi from './IzvestajiStanovi';
import IzvestajKlijenti from './IzvestajiKlijenti';
import RoiIzvestaji from "./RoiIzvestaji";
import {Col, Row} from "antd/lib";

const {Sider, Content} = Layout;

function PregledIzvestaja() {
    const [menuItem, setMenuItem] = useState(1);
    return (
        <Layout>
            <Sider trigger={null}>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item onClick={() => setMenuItem(1)} icon={<PieChartOutlined/>}>
                        Izvestaj o stanovima
                    </Menu.Item>
                    <Menu.Item onClick={() => setMenuItem(2)} icon={<PieChartOutlined/>}>
                        Izvestaj o klijentima
                    </Menu.Item>
                    <Menu.Item onClick={() => setMenuItem(3)} icon={<PieChartOutlined/>}>
                        ROI Izeštaji
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                {menuItem === 1 && (
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 900,
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
                            minHeight: 900,
                        }}
                    >
                        <IzvestajKlijenti/>
                    </Content>
                )}
                {menuItem === 3 && (
                    <Row>
                        <Col span={24}>
                            <Content
                                className="site-layout-background"
                                style={{
                                    margin: '24px 16px',
                                    padding: 24,
                                    minHeight: 900,
                                }}>
                                <RoiIzvestaji/>
                            </Content>
                        </Col>
                    </Row>
                )}
            </Layout>
        </Layout>
    );
}

export default PregledIzvestaja;
