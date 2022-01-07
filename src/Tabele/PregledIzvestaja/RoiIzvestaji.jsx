import React, {useEffect, useState} from 'react';
import {Row, Col, Typography} from 'antd/lib';
import 'antd/dist/antd.css';
import {api} from 'api/api';
import {Card, Divider} from "antd";
import {Statistic} from "antd/es";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    CalculatorOutlined,
    CaretRightOutlined,
    LoginOutlined
} from "@ant-design/icons";
import styles from "./PregledIzvestaja.module.css";
import Title from "antd/es/typography/Title";


function RoiIzvestaji() {

    // Set Ukupnu kvadraturu za sve Stanove
    const [kvadraturaStanova, setKvadraturaStanovi] = useState({});
    const getKvadraturaStanovi = async () => {
        api.get('/reports/roi/').then(res => {
            setKvadraturaStanovi(res.data.kvadratura_stanova);
        });
    };

    // Set Ukupan ROI Stanova
    const [roiStanovi, setRoiStanovi] = useState({});
    const getRoiStanovi = async () => {
        api.get('/reports/roi/').then(res => {
            setRoiStanovi(res.data.ukupan_roi_stanova);
        });
    };

    // Suma Ukupnih cena Stanova po Lamelama
    const [sumaCenaStanovaLamela, setCenaStanovaLamela] = useState({});
    const getSumaCenaStanovaLamela = async () => {
        api.get('/reports/roi/').then(res => {
            setCenaStanovaLamela(res.data.ukupna_cena_stanova_po_lamelama);
        });
    };


    useEffect(() => {
        getKvadraturaStanovi();
        getSumaCenaStanovaLamela();
        getRoiStanovi();

    }, []);

    return (
        <>
            {/*Kvadratura Stanova*/}
            <div className="site-card-wrapper">
                <Title className={styles.styleTitle} level={5}>
                    Kvadratura Stanova
                </Title>
                <Row gutter={24}>

                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Ukupno kvadrata"
                                value={kvadraturaStanova.stanovi_ukupno_kvadrata}

                                precision={2}
                                valueStyle={{color: '#3f8600'}}
                                prefix={<ArrowUpOutlined/>}
                                suffix="m2"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Ukupno kvadrata (-3%)"
                                value={kvadraturaStanova.stanovi_ukupno_korekcija_kvadrata}
                                precision={2}
                                valueStyle={{color: '#cf1322'}}
                                prefix={<ArrowDownOutlined/>}
                                suffix="m2"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Razlika (-3%)"
                                value={kvadraturaStanova.razlika_kvadrati_korekcija}
                                precision={2}
                                valueStyle={{color: '#cf1322'}}
                                prefix={<ArrowDownOutlined/>}
                                suffix="m2"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
            <Divider/>

            {/*UKUPNE SUMA I PROSECNA CENA KVADRATA*/}
            <div className="site-card-wrapper">
                <Row gutter={24}>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Ukupna Suma"
                                value={roiStanovi.ukupna_suma_cena_stanova}

                                precision={2}
                                valueStyle={{color: '#3f8600'}}
                                prefix={<CaretRightOutlined/>}
                                suffix="€"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Prosek cene kvadrata"
                                value={roiStanovi.prosecna_cena_kvadrata}
                                precision={2}
                                valueStyle={{color: '#3f8600'}}
                                prefix={<CaretRightOutlined/>}
                                suffix="€"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
            <Divider/>

            {/*UKUPNE SUME CENA STANOVA*/}
            <div className="site-card-wrapper">
                <Title className={styles.styleTitle} level={5}>
                    Ukupna suma po lamelama
                </Title>
                <Row gutter={24}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Lamela L1"
                                value={roiStanovi.suma_cena_stanova_lamela_l1}
                                precision={2}
                                valueStyle={{color: '#3f8600'}}
                                prefix={<CaretRightOutlined/>}
                                suffix="€"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Lamela L2"
                                value={roiStanovi.suma_cena_stanova_lamela_l2}
                                precision={2}
                                valueStyle={{color: '#3f8600'}}
                                prefix={<CaretRightOutlined/>}
                                suffix="€"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Lamela L3"
                                value={roiStanovi.suma_cena_stanova_lamela_l3}
                                precision={2}
                                valueStyle={{color: '#3f8600'}}
                                prefix={<CaretRightOutlined/>}
                                suffix="€"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
            <Divider/>


            {/*            <Row>
                <Col span={24}>
                    <Title className={styles.styleTitle} level={3}>
                        {' '}
                        2.Broj prodatih stanova po kupcu
                    </Title>
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
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="pv" fill="#1890ff"/>
                    </BarChart>
                </Col>
            </Row>*/}
        </>
    );
}

export default RoiIzvestaji;
