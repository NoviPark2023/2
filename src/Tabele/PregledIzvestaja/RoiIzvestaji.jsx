import React, {useEffect, useState} from 'react';
import {Row, Col, Typography} from 'antd/lib';
import 'antd/dist/antd.css';
import {api} from 'api/api';
import {Card} from "antd";
import {Statistic} from "antd/es";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";


function RoiIzvestaji() {

    // Set Ukupnu kvadraturu za sve Stanove
    const [kvadraturaStanova, setKvadraturaStanovi] = useState({});
    const getKvadraturaStanovi = async () => {
        api.get('/reports/roi/').then(res => {
            setKvadraturaStanovi(res.data.kvadratura_stanova);
        });
    };

    // Suma Ukupnih cena Stanova po Lamelama
    const [sumaCenaStanovaLamela, setCenaStanovaLamela] = useState({});
    const getSumaCenaStanovaLamela = async () => {
        api.get('/reports/roi/').then(res => {
            setCenaStanovaLamela(res.data.ukupna_cena_stanova_po_lamelama);
        });
    };

    // const getRoiData = async () => {
    //     api.get('/reports/roi/').then(res => {
    //         console.log("############res.data#########")
    //         console.log(res.data)
    //         console.log("########res.data.kvadratura_stanova.stanovi_ukupno_kvadrata#############")
    //         console.log(res.data.kvadratura_stanova.stanovi_ukupno_kvadrata)
    //         if (res.data && res.data.length) {
    //             const data = res.data.map(item => {
    //                 return {name: item.ime, pv: item.stanovi_ukupno_kvadrata};
    //             });
    //             setDataRoi(data);
    //         } else {
    //             console.log('######## NO NO ##########')
    //         }
    //     });
    // };


    useEffect(() => {
        getKvadraturaStanovi();
        getSumaCenaStanovaLamela();

    }, []);

    return (
        <>
            <div className="site-statistic-demo-card">
                <Row gutter={16}>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Ukupna suma kvadrata bez korekcije 3%"
                                value={kvadraturaStanova.stanovi_ukupno_kvadrata}

                                precision={2}
                                valueStyle={{color: '#3f8600'}}
                                prefix={<ArrowUpOutlined/>}
                                suffix="m2"
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Ukupna suma kvadrata sa korekcijom od 3%"
                                value={kvadraturaStanova.stanovi_ukupno_korekcija_kvadrata}
                                precision={2}
                                valueStyle={{color: '#cf1322'}}
                                prefix={<ArrowDownOutlined/>}
                                suffix="m2"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
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
