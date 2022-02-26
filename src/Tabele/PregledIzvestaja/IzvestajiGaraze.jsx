import React, {useEffect, useState} from 'react';
import {Row, Col, Typography} from 'antd/lib';
import 'antd/dist/antd.css';
import {Card, Divider, Tooltip} from 'antd';
import {Statistic} from 'antd/es';
import {api} from 'api/api';
import Scroll from 'components/Scroll/Scroll';
import stanovi_izvestaji_icon from "../../assets/garaze/garaze-izvestaji.png";
import {PieChart, Pie, Sector, Cell, BarChart, Legend, CartesianGrid, XAxis, YAxis, Line, Bar} from 'recharts';

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
        getData().then(r => "");
        getUsers().then(r => "");
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

    const dataProdajaPoMesecima = data.prodaja_garaza_po_mesecima
        ? [
            {name: 'jan', garaze: data.prodaja_garaza_po_mesecima[0].jan},
            {name: 'feb', garaze: data.prodaja_garaza_po_mesecima[0].feb},
            {name: 'mart', garaze: data.prodaja_garaza_po_mesecima[0].mart},
            {name: 'april', garaze: data.prodaja_garaza_po_mesecima[0].apr},
            {name: 'maj', garaze: data.prodaja_garaza_po_mesecima[0].maj},
            {name: 'jun', garaze: data.prodaja_garaza_po_mesecima[0].jun},
            {name: 'jul', garaze: data.prodaja_garaza_po_mesecima[0].jul},
            {name: 'avgust', garaze: data.prodaja_garaza_po_mesecima[0].avg},
            {name: 'sep', garaze: data.prodaja_garaza_po_mesecima[0].sep},
            {name: 'okt', garaze: data.prodaja_garaza_po_mesecima[0].okt},
            {name: 'nov', garaze: data.prodaja_garaza_po_mesecima[0].nov},
            {name: 'dec', garaze: data.prodaja_garaza_po_mesecima[0].dec},
        ]
        : [];

      const dataSumaProdatoMeseci = data.ukupna_suma_prodatih_garaza
    ? [
        {
          name: 'jan',
          prihod: data.ukupna_suma_prodatih_garaza[0].jan,
        },
        {
          name: 'feb',
          prihod: data.ukupna_suma_prodatih_garaza[0].feb,
        },
        {
          name: 'mart',
          prihod: data.ukupna_suma_prodatih_garaza[0].mart,
        },
        {
          name: 'april',
          prihod: data.ukupna_suma_prodatih_garaza[0].apr,
        },
        {
          name: 'maj',
          prihod: data.ukupna_suma_prodatih_garaza[0].maj,
        },
        {
          name: 'jun',
          prihod: data.ukupna_suma_prodatih_garaza[0].jun,
        },
        {
          name: 'jul',
          prihod: data.ukupna_suma_prodatih_garaza[0].jul,
        },
        {
          name: 'avg',
          prihod: data.ukupna_suma_prodatih_garaza[0].avg,
        },
        {
          name: 'sep',
          prihod: data.ukupna_suma_prodatih_garaza[0].sep,
        },
        {
          name: 'okt',
          prihod: data.ukupna_suma_prodatih_garaza[0].okt,
        },
        {
          name: 'nov',
          prihod: data.ukupna_suma_prodatih_garaza[0].nov,
        },
        {
          name: 'dec',
          prihod: data.ukupna_suma_prodatih_garaza[0].dec,
        },
      ]
    : [];

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
                                <PieChart width={700} height={400}>
                                    <Pie
                                        data={data_garaze_brojevi}
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
                                        {data_garaze_brojevi.map((entry, index) => (
                                            <Cell key={`cell-${index}`}
                                                  fill={COLORS_BROJEVI[index % COLORS_BROJEVI.length]}/>
                                        ))}
                                    </Pie>
                                    <Tooltip/>
                                    <Legend/>
                                </PieChart>
                            </Card>
                        </Col>
                        {/*END Pie Char Garaze BROJEVI*/}

                        {/*TOK PRODAJE GARAZA PO MESECIMA*/}
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
                            > <Title level={5} align="center">Broj prodatih garaža po mesecima</Title>

                                <BarChart
                                    width={800}
                                    height={300}
                                    data={dataProdajaPoMesecima}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="garaze" fill="#1890ff" background={{fill: "#eee"}}/>
                                </BarChart>
                            </Card>
                        </Col>
                        {/*END tok prodaje garaza po mesecima*/}

                    </Row>
                </Col>
                {/*Garaze statistika PROCENTI*/}
                <Col span={12}>
                    <Row gutter={24}>
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
                                        fill="#8884d8"
                                        label
                                    >
                                        {data_garaze_procenti.map((entry, index) => (
                                            <Cell key={`cell-${index}`}
                                                  fill={COLORS_PROCENTI[index % COLORS_PROCENTI.length]}/>
                                        ))}
                                    </Pie>
                                    <Tooltip/>
                                    <Legend/>
                                </PieChart>
                            </Card>
                        </Col>
                        {/*END Pie Char Garaze PROCENTI*/}

                        {/*UKUPNA SUMA PRODAJE GARAZA PO MESECIMA*/}
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
                                    width={800}
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
                        {/*END ukupna suma prodaje garaza po mesecima*/}
                    </Row>
                </Col>
            </Row>
            <Divider/>
        </Scroll>
    );
}

export default ReportsGaraze;
