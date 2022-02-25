import React, {useEffect, useState} from 'react';
import {Row, Col, Typography} from 'antd/lib';
import 'antd/dist/antd.css';
import {Card, Divider, Tooltip} from 'antd';
import {Statistic} from 'antd/es';
import {api} from 'api/api';
import Scroll from 'components/Scroll/Scroll';
import stanovi_izvestaji_icon from "../../assets/garaze/garaze-izvestaji.png";
import {PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend} from 'recharts';

const {Title} = Typography;

function ReportsGaraze() {
    const [data, setData] = useState({});
    const [users, setUsers] = useState([]);

    const getData = async () => {
        api.get('/reports-garaze/').then(res => {
            setData(res.data);
        });
    };

    const getUsers = async () => {
        api.get('/reports/korisnici/').then(res => {
            if (res.data && res.data.length) {
                const data = res.data.map(item => {
                    return {name: item.ime, Prodaja: item.prodati_stanovi_korisnici};
                });
                setUsers(data);
            }
        });
    };
    useEffect(() => {
        getData();
        getUsers();
    }, []);

    {
        /*Podaci za Pie Char Garaze BROJEVI*/
    }
    const COLORS_BROJEVI = ['#0088FE', '#0062c4', '#28beff', '#2aaecc'];
    const data_garaze_brojevi = [
        {name: 'Dostupnih', value: data.dostupno_garaza},
        {name: 'Rezervisanih', value: data.rezervisano_garaza},
        {name: 'Prodatih', value: data.prodato_garaza},

    ];

    {
        /*Podaci za Pie Char Garaze PROCENTI*/
    }
    const COLORS_PROCENTI = ['#0088FE', '#0062c4', '#28beff', '#2aaecc'];
    const data_garaze_procenti = [
        {name: 'Dostupnih (%)', value: data.procenat_dostupnih_garaza},
        {name: 'Rezervisanih (%)', value: data.procenat_rezervisanih_garaza},
        {name: 'Prodatih (%)', value: data.procenat_prodatih_garaza},

    ];

    return (
        <Scroll>
            {/*Title with Icon*/}
            <Row>
                <Col span={24}>
                    <Title level={3}> <img src={stanovi_izvestaji_icon} alt="icon stanovi"/> Izveštaji
                        Garaže</Title>
                    <Divider/>
                </Col>
            </Row>
            {/*Garaze statistika BROJEVI*/}
            <Row gutter={24} style={{padding: '0px', marginTop: '0px', marginRight: '0px'}}>
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
                            title="UKUPAN BROJ GARAŽA"
                            value={data.ukupno_garaza}
                            valueStyle={{color: '#3f8600', textAlign: 'center'}}
                            s
                        />
                    </Card>
                </Col>
                {/*Dostupne Garaze BROJEVI*/}
                <Col span={12}>
                    <Row gutter={24} style={{padding: '0px', marginTop: '0px', marginRight: '0px'}}>
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
                                    style={{textAlign: 'center'}}
                                    title="Dostupnih"
                                    value={data.dostupno_garaza}
                                    valueStyle={{color: '#3f8600', textAlign: 'center'}}
                                />
                            </Card>
                        </Col>
                        {/*END Dostupne Garaze BROJEVI*/}

                        {/*Rezervisane Garaze BROJEVI*/}
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
                                    style={{textAlign: 'center'}}
                                    title="Rezervisanih"
                                    value={data.rezervisano_garaza}
                                    valueStyle={{color: '#3f8600', textAlign: 'center'}}
                                />
                            </Card>
                        </Col>
                        {/*END Rezervisane Garaze BROJEVI*/}

                        {/*Prodate Garaze BROJEVI*/}
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
                                    style={{textAlign: 'center'}}
                                    title="Prodatih"
                                    value={data.prodato_garaza}
                                    valueStyle={{color: '#3f8600'}}
                                />
                            </Card>
                        </Col>
                        {/*END Prodate Garaze BROJEVI*/}

                        {/*Pie Char Garaze BROJEVI*/}
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
                                    <Pie
                                        data={data_garaze_brojevi}
                                        dataKey="value"
                                        isAnimationActive={false}
                                        fill="#8884d8"
                                        label
                                    >
                                        {data_garaze_brojevi.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS_BROJEVI[index % COLORS_BROJEVI.length]}/>
                                        ))}
                                    </Pie>
                                    <Tooltip/>
                                    <Legend />
                                </PieChart>
                            </Card>
                        </Col>
                        {/*END Pie Char Garaze BROJEVI*/}
                    </Row>
                </Col>
                {/*Garaze statistika PROCENTI*/}
                <Col span={12}>
                    <Row gutter={24} style={{padding: '0px', marginTop: '0px', marginRight: '0px'}}>
                        {/*Dostupne Garaze PROCENTI*/}
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
                                    value={data.procenat_dostupnih_garaza}
                                    valueStyle={{color: '#3f8600'}}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        {/*END Dostupne Garaze PROCENTI*/}

                        {/*Rezervisane Garaze PROCENTI*/}
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
                                    value={data.procenat_rezervisanih_garaza}
                                    precision={2}
                                    valueStyle={{color: '#4d4dff'}}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        {/*END Rezervisane Garaze PROCENTI*/}

                        {/*Prodate Garaze PROCENTI*/}
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
                                    value={data.procenat_prodatih_garaza}
                                    precision={2}
                                    valueStyle={{color: '#cf1322'}}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        {/*END Prodate Garaze PROCENTI*/}

                        {/*Pie Char Garaze PROCENTI*/}
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
                                    <Pie
                                        data={data_garaze_procenti}
                                        dataKey="value"
                                        isAnimationActive={false}
                                        fill="#8884d8"
                                        label

                                    >
                                        {data_garaze_procenti.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS_PROCENTI[index % COLORS_PROCENTI.length]}/>
                                        ))}
                                    </Pie>
                                    <Tooltip/>
                                    <Legend />
                                </PieChart>
                            </Card>
                        </Col>
                        {/*END Pie Char Garaze PROCENTI*/}
                    </Row>
                </Col>
            </Row>
            <Divider/>
        </Scroll>
    );
}

export default ReportsGaraze;
