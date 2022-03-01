import React, {useEffect, useState} from 'react';
import {Col, Row, Typography} from 'antd/lib';
import 'antd/dist/antd.css';
import {Card, Divider, Tooltip} from 'antd';
import {Statistic} from 'antd/es';
import {api} from 'api/api';
import Scroll from 'components/Scroll/Scroll';
import lokali_izvestaji_icon from "../../assets/lokali/lokali-izvestaji.png";
import {Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, XAxis, YAxis} from 'recharts';

const {Title} = Typography;

function ReportsLokali() {
    const [data, setData] = useState({});


    const getData = async () => {
        api.get('/reports-lokali/').then(res => {
            setData(res.data);
        });
    };

    useEffect(() => {
        getData().then(r => "");
    }, []);

    {
        /*Podaci za PieChar Lokala BROJEVI*/
    }
    const COLORS_BROJEVI = ['#0088FE', '#0062c4', '#28beff', '#2aaecc'];
    const data_lokali_brojevi = [
        {name: 'Dostupnih', value: data.dostupno},
        {name: 'Rezervisanih', value: data.rezervisano},
        {name: 'Prodatih', value: data.prodato},
    ];
    {
        /*Podaci za PieChar Lokala PROCENTI*/
    }
    const COLORS_PROCENTI = ['#0088FE', '#0062c4', '#28beff', '#2aaecc'];
    const data_lokali_procenti = [
        {name: 'Dostupnih (%)', value: data.procenat_dostupnih},
        {name: 'Rezervisanih (%)', value: data.procenat_rezervisanih},
        {name: 'Prodatih (%)', value: data.procenat_prodatih},

    ];

    const dataProdajaPoMesecima = data.prodaja_po_mesecima
        ? [
            {name: 'jan', lokali: data.prodaja_po_mesecima[0].jan},
            {name: 'feb', lokali: data.prodaja_po_mesecima[0].feb},
            {name: 'mart', lokali: data.prodaja_po_mesecima[0].mart},
            {name: 'april', lokali: data.prodaja_po_mesecima[0].apr},
            {name: 'maj', lokali: data.prodaja_po_mesecima[0].maj},
            {name: 'jun', lokali: data.prodaja_po_mesecima[0].jun},
            {name: 'jul', lokali: data.prodaja_po_mesecima[0].jul},
            {name: 'avgust', lokali: data.prodaja_po_mesecima[0].avg},
            {name: 'sep', lokali: data.prodaja_po_mesecima[0].sep},
            {name: 'okt', lokali: data.prodaja_po_mesecima[0].okt},
            {name: 'nov', lokali: data.prodaja_po_mesecima[0].nov},
            {name: 'dec', lokali: data.prodaja_po_mesecima[0].dec},
        ]
        : [];

    const dataSumaProdatoMeseci = data.ukupna_suma_prodatih_lokala
        ? [
            {
                name: 'jan',
                prihod: data.ukupna_suma_prodatih_lokala[0].jan,
            },
            {
                name: 'feb',
                prihod: data.ukupna_suma_prodatih_lokala[0].feb,
            },
            {
                name: 'mart',
                prihod: data.ukupna_suma_prodatih_lokala[0].mart,
            },
            {
                name: 'april',
                prihod: data.ukupna_suma_prodatih_lokala[0].apr,
            },
            {
                name: 'maj',
                prihod: data.ukupna_suma_prodatih_lokala[0].maj,
            },
            {
                name: 'jun',
                prihod: data.ukupna_suma_prodatih_lokala[0].jun,
            },
            {
                name: 'jul',
                prihod: data.ukupna_suma_prodatih_lokala[0].jul,
            },
            {
                name: 'avg',
                prihod: data.ukupna_suma_prodatih_lokala[0].avg,
            },
            {
                name: 'sep',
                prihod: data.ukupna_suma_prodatih_lokala[0].sep,
            },
            {
                name: 'okt',
                prihod: data.ukupna_suma_prodatih_lokala[0].okt,
            },
            {
                name: 'nov',
                prihod: data.ukupna_suma_prodatih_lokala[0].nov,
            },
            {
                name: 'dec',
                prihod: data.ukupna_suma_prodatih_lokala[0].dec,
            },
        ]
        : [];

    return (
        <Scroll>
            {/*Title with Icon*/}
            <Row>
                <Col span={24}>
                    <Title level={3}> <img src={lokali_izvestaji_icon} alt="icon lokali"/>
                        Izveštaji Lokali
                    </Title>
                    <Divider/>
                </Col>
            </Row>
            {/*LOKALI STATISTIKA BROJEVI*/}
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
                            title="UKUPAN BROJ LOKALA"
                            value={data.ukupno_lokala}
                            valueStyle={{color: '#3f8600', textAlign: 'center'}}
                            s
                        />
                    </Card>
                </Col>
                {/*DOSTUPNI LOKALI BROJEVI*/}
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
                                    value={data.dostupno}
                                    valueStyle={{color: '#3f8600', textAlign: 'center'}}
                                />
                            </Card>
                        </Col>
                        {/*END Dostupn Lokali BROJEVI*/}

                        {/*REZERVISANI LOKALI BROJEVI*/}
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
                                    value={data.rezervisano}
                                    valueStyle={{color: '#3f8600', textAlign: 'center'}}
                                />
                            </Card>
                        </Col>
                        {/*END Rezervisani Lokali BROJEVI*/}

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
                                    style={{textAlign: 'center'}}
                                    title="Prodatih"
                                    value={data.prodato}
                                    valueStyle={{color: '#3f8600'}}
                                />
                            </Card>
                        </Col>
                        {/*END Prodati Lokali BROJEVI*/}

                        {/*Pie Char Lokali BROJEVI*/}
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
                                        data={data_lokali_brojevi}
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
                                        {data_lokali_brojevi.map((entry, index) => (
                                            <Cell key={`cell-${index}`}
                                                  fill={COLORS_BROJEVI[index % COLORS_BROJEVI.length]}/>
                                        ))}
                                    </Pie>
                                    <Tooltip/>
                                    <Legend/>
                                </PieChart>
                            </Card>
                        </Col>
                        {/*END Pie Char Lokali BROJEVI*/}

                        {/*TOK PRODAJE LOKALA PO MESECIMA*/}
                        <Col span={24} style={{
                            width: '100%',
                            margin: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Card
                                style={{
                                    width: '100%',
                                    margin: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            > <Title level={5} align="center">Broj prodatih lokala po mesecima</Title>

                                <BarChart
                                    width={550}
                                    height={300}
                                    data={dataProdajaPoMesecima}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="lokali" fill="#1890ff" background={{fill: "#eee"}}/>
                                </BarChart>
                            </Card>
                        </Col>
                        {/*END tok prodaje Lokala po mesecima*/}

                    </Row>
                </Col>

                {/*LOKALI STATISTIKA PROCENTI*/}
                <Col span={12}>
                    <Row gutter={24}>
                        {/*DOSTUPNI LOKALI PROCENTI*/}
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
                                    value={data.procenat_dostupnih}
                                    valueStyle={{color: '#3f8600'}}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        {/*END Dostupni Lokali PROCENTI*/}

                        {/*REZERVISANI LOKALI PROCENTI*/}
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
                                    value={data.procenat_rezervisanih}
                                    precision={2}
                                    valueStyle={{color: '#4d4dff'}}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        {/*END Rezervisani Lokali PROCENTI*/}

                        {/*PRODATI LOKALI PROCENTI*/}
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
                                    value={data.procenat_prodatih}
                                    precision={2}
                                    valueStyle={{color: '#cf1322'}}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                        {/*END Prodati Lokali PROCENTI*/}

                        {/*Pie Char LOKALI PROCENTI*/}
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
                                        data={data_lokali_procenti}
                                        dataKey="value"
                                        fill="#8884d8"
                                        label
                                    >
                                        {data_lokali_procenti.map((entry, index) => (
                                            <Cell key={`cell-${index}`}
                                                  fill={COLORS_PROCENTI[index % COLORS_PROCENTI.length]}/>
                                        ))}
                                    </Pie>
                                    <Tooltip/>
                                    <Legend/>
                                </PieChart>
                            </Card>
                        </Col>
                        {/*END Pie Char LOKALI PROCENTI*/}

                        {/*UKUPNA SUMA PRODAJE LOAKLA PO MESECIMA*/}
                        <Col span={24} style={{
                            width: '100%',
                            margin: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Card
                                style={{
                                    width: '100%',
                                    margin: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            > <Title level={5} align="center">Ukupna suma prodaja
                                po mesecima</Title>

                                <BarChart
                                    width={550}
                                    height={300}
                                    data={dataSumaProdatoMeseci}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="prihod" fill="#1890ff" background={{fill: "#eee"}}/>
                                </BarChart>
                            </Card>
                        </Col>
                        {/*END ukupna suma prodaje Lokala po mesecima*/}
                    </Row>
                </Col>
            </Row>
            <Divider/>
        </Scroll>
    );
}

export default ReportsLokali;
