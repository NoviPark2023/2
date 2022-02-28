import React, {useEffect, useState} from 'react';
import {Row, Col, Typography} from 'antd/lib';
import {Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend} from 'recharts';
import 'antd/dist/antd.css';
import {Card, Divider} from 'antd';
import {Statistic} from 'antd/es';
import {api} from 'api/api';
import Scroll from 'components/Scroll/Scroll';
import stanovi_izvestaji_icon from "../../assets/stanovi/stanovi-icon-izvestaji.png";

const {Title} = Typography;

function ReportsApartments() {
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
        /*Podaci za PieChar Stanova BROJEVI*/
    }
    const COLORS_BROJEVI = ['#0088FE', '#0062c4', '#28beff', '#2aaecc'];
    const data_lokali_brojevi = [
        {name: 'Dostupnih', value: data.dostupan},
        {name: 'Rezervisanih', value: data.rezervisano},
        {name: 'Prodatih', value: data.prodat},
    ];
    {
        /*Podaci za PieChar Lokala PROCENTI*/
    }
    const COLORS_PROCENTI = ['#0088FE', '#0062c4', '#28beff', '#2aaecc'];
    const data_lokali_procenti = [
        {name: 'Dostupnih (%)', value: data.procenat_dostupan},
        {name: 'Rezervisanih (%)', value: data.procenat_rezervisan},
        {name: 'Prodatih (%)', value: data.procenat_prodat},

    ];

    const dataSalesByMonths = data.prodaja_po_mesecima
        ? [
            {name: 'jan', stanovi: data.prodaja_po_mesecima[0].jan},
            {name: 'feb', stanovi: data.prodaja_po_mesecima[0].feb},
            {name: 'mart', stanovi: data.prodaja_po_mesecima[0].mart},
            {name: 'april', stanovi: data.prodaja_po_mesecima[0].apr},
            {name: 'maj', stanovi: data.prodaja_po_mesecima[0].maj},
            {name: 'jun', stanovi: data.prodaja_po_mesecima[0].jun},
            {name: 'jul', stanovi: data.prodaja_po_mesecima[0].jul},
            {name: 'avgust', stanovi: data.prodaja_po_mesecima[0].avg},
            {name: 'sep', stanovi: data.prodaja_po_mesecima[0].sep},
            {name: 'okt', stanovi: data.prodaja_po_mesecima[0].okt},
            {name: 'nov', stanovi: data.prodaja_po_mesecima[0].nov},
            {name: 'dec', stanovi: data.prodaja_po_mesecima[0].dec},
        ]
        : [];

    const dataAmountOfApartmentsSold = data.ukupna_suma_prodatih_stanova
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
                    <Title level={3}> <img src={stanovi_izvestaji_icon} alt="icon stanovi"/>
                           Izveštaji Stanovi
                    </Title>
                    <Divider/>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Title level={3}>1.Ukupan broj stanova</Title>

                    <Card
                        style={{
                            width: '77%',
                            margin: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Statistic
                            title="UKUPAN BROJ STANOVA"
                            value={data.ukupno_stanova}
                            valueStyle={{color: '#3f8600', textAlign: 'center'}}
                            s
                        />
                    </Card>

                    <Row>
                        <Col span={6}>
                            <Card style={{margin: '10px'}}>
                                <Statistic
                                    style={{textAlign: 'center'}}
                                    title="Dostupni"
                                    value={data.dostupan}
                                    valueStyle={{color: '#3f8600', textAlign: 'center'}}
                                />
                            </Card>
                        </Col>
                        <Col style={{margin: '10px'}} span={6}>
                            <Card>
                                <Statistic
                                    style={{textAlign: 'center'}}
                                    title="Rezervisani"
                                    value={data.rezervisano}
                                    valueStyle={{color: '#3f8600', textAlign: 'center'}}
                                />
                            </Card>
                        </Col>
                        <Col style={{margin: '10px'}} span={6}>
                            <Card>
                                <Statistic
                                    style={{textAlign: 'center'}}
                                    title="Prodati"
                                    value={data.prodat}
                                    valueStyle={{color: '#3f8600'}}
                                />
                            </Card>
                        </Col>
                        <Col span={6}/>
                    </Row>
                </Col>
                <Col span={12}>
                    <Title style={{textAlign: 'center'}} level={3}>
                        2.Prodaja stanova izražena u procentima
                    </Title>

                    <Row gutter={24} style={{padding: '5px', marginTop: '100px', marginRight: '30px'}}>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Dostupni"
                                    value={data.procenat_dostupan}
                                    valueStyle={{color: '#3f8600'}}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Rezervisani"
                                    value={data.procenat_rezervisan}
                                    precision={2}
                                    valueStyle={{color: '#4d4dff'}}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Prodati"
                                    value={data.procenat_prodat}
                                    precision={2}
                                    valueStyle={{color: '#cf1322'}}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Divider/>
            <Row>
                <Col span={24}>
                    <Title level={3}>3.Tok prodaje po mesecima</Title>
                    <LineChart
                        width={900}
                        height={400}
                        data={dataSalesByMonths}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line connectNulls type="monotone" dataKey="stanovi" stroke="#e74c3c" fill="#1890ff"/>
                    </LineChart>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Title level={3}>4.Ostvaren rezultat prodaje po korisniku</Title>
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
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="Prodaja" fill="#e74c3c"/>
                    </BarChart>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Title level={3}>5.Rast prodaje</Title>
                    <LineChart
                        width={900}
                        height={400}
                        data={dataAmountOfApartmentsSold}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line connectNulls type="monotone" dataKey="prihod" stroke="#e74c3c" fill="#1890ff"/>
                    </LineChart>
                </Col>
            </Row>
        </Scroll>
    );
}

export default ReportsApartments;
