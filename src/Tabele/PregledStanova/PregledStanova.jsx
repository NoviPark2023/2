import React, {useState, useEffect} from 'react';
import {Button, Table, Modal, Input, Space, Statistic, Card, Row, Col} from 'antd';
import IzmeneStanova from 'Form/IzmeneStanova/IzmeneStanova';
import {api} from 'api/api';
import Highlighter from 'react-highlight-words';
import {ArrowDownOutlined, ArrowUpOutlined, SearchOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
    Line,
    Bar,
    Legend,
    PieChart, Pie,
} from "recharts";

function PregledStanova() {
    const data1 = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100
        }
    ];
    const data2 = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const data3 = [
        {name: 'Group A', value: 400},
        {name: 'Group B', value: 300},
        {name: 'Group C', value: 300},
        {name: 'Group D', value: 200},
    ];


    //// modal brisanje
    const [modalTaskId, setModalTaskId] = useState(null);

    /////state za izmeni
    const [isEditPlaceVisible, setIsEditPlaceVisible] = useState(false);
    const [isCreatePlaceVisible, setIsCreatePlaceVisible] = useState(false);

    /// Api za dovlacenje podataka stana
    const [selectedPlace, setSelectedPlace] = useState('');

    ///api za dovlacenje ponuda
    const [, setSelectedPonude] = useState('');

    ///modal za dodaj
    const showModal = id => {
        setIsEditPlaceVisible(id);
    };

    const handleOk = () => {
        setIsEditPlaceVisible(false);
    };

    const handleCancel = () => {
        setIsEditPlaceVisible(false);
    };

    ///modal za brisanje
    const showModalDelete = id => {
        setModalTaskId(id);
    };

    ///API state
    const [data, setData] = useState([]);

    //// API lista stanova
    const getData = async () => {
        api.get('/stanovi/').then(res => {
            setData(res.data.results);
        });
    };

    ////Api za brisanje stanova
    const deleteStan = id_stana => {
        api.delete(`/stanovi/obrisi-stan/${modalTaskId}`).then(res => {
            showModalDelete(false);
            getData();
        });
    };

    ////izmene stana
    const getStanaObj = id_stana => {
        api.get(`/stanovi/detalji-stana/${id_stana}`).then(res => {
            setSelectedPlace(res.data);
        });
    };

    ///ponude stana
    const getListaPonuda = id_stana => {
        api.get(`/ponude/lista-ponuda-stana/${id_stana}/`).then(res => {
            setSelectedPonude(res.data);
        });
    };
    ////hooks za search u tabeli
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    ////funkcionanost za search u tabeli
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
    };

    let searchInput;

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 100}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 100}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            key: '1',
            title: 'ID',
            dataIndex: 'id_stana',
            ...getColumnSearchProps('id_kupca'), /////pozivanje search-a u tabeli
        },
        {
            key: '2',
            title: 'Lamela',
            dataIndex: 'lamela',
            ...getColumnSearchProps('lamela'),
        },
        {
            key: '3',
            title: 'Adresa',
            dataIndex: 'adresa_stana',
            ...getColumnSearchProps('adresa_stana'),
        },
        {
            key: '4',
            title: 'Kvadratura',
            dataIndex: 'kvadratura',
            filters: [
                {
                    text: '10-30',
                    value: [10, 30],
                },
                {
                    text: '30-40',
                    value: [30, 40],
                },
                {
                    text: '40-50',
                    value: [40, 50],
                },
                {
                    text: '50-60',
                    value: [50, 60],
                },
                {
                    text: '60-80',
                    value: [60, 80],
                },
                {
                    text: '80-120',
                    value: [80, 120],
                },
            ],
            onFilter: (value, record) => record.kvadratura >= value[0] && record.kvadratura <= value[1],
            sorter: (a, b) => a.kvadratura - b.kvadratura,
        },
        {
            key: '5',
            title: 'Sprat',
            dataIndex: 'sprat',
            filters: [
                {
                    text: '0-3',
                    value: [0, 3],
                },
                {
                    text: '4-6',
                    value: [4, 6],
                },
                {
                    text: '7-10',
                    value: [7, 10],
                },
                {
                    text: '11-20',
                    value: [11, 20],
                },
            ],
            onFilter: (value, record) => record.sprat >= value[0] && record.sprat <= value[1],
            sorter: (a, b) => a.sprat - b.sprat,
        },
        {
            key: '6',
            title: 'Broj soba',
            dataIndex: 'broj_soba',
            filters: [
                {
                    text: '1-3',
                    value: [1, 3],
                },
                {
                    text: '3-5',
                    value: [5, 5],
                },
                {
                    text: '5-8',
                    value: [5, 8],
                },
            ],
            onFilter: (value, record) => record.broj_soba >= value[0] && record.broj_soba <= value[1],
            sorter: (a, b) => a.broj_soba - b.broj_soba,
        },
        {
            key: '7',
            title: 'Orijentisanost',
            dataIndex: 'orijentisanost',
            filters: [
                {
                    text: 'Istok',
                    value: 'Istok',
                },
                {
                    text: 'Zapad',
                    value: 'Zapad',
                },
                {
                    text: 'Sever',
                    value: 'Sever',
                },
                {
                    text: 'Jug',
                    value: 'Jug',
                },
            ],
            onFilter: (value, record) => record.orijentisanost.indexOf(value) === 0,
        },
        {
            key: '8',
            title: 'Broj terasa',
            dataIndex: 'broj_terasa',
            filters: [
                {
                    text: '0',
                    value: [0],
                },
                {
                    text: '1',
                    value: [1],
                },
                {
                    text: '2',
                    value: [2],
                },
            ],
            onFilter: (value, record) => record.broj_terasa >= value[0] && record.broj_terasa <= value[1],
            sorter: (a, b) => a.broj_terasa - b.broj_terasa,
        },
        {
            key: '9',
            title: 'Cena',
            dataIndex: 'cena_stana',
            filters: [
                {
                    text: '20.000e-40.000e',
                    value: [20000, 40000],
                },
                {
                    text: '45.000e-65.000e',
                    value: [45000, 65000],
                },
                {
                    text: '70.000e-120.000e',
                    value: [70000, 120000],
                },
            ],
            onFilter: (value, record) => record.cena_stana >= value[0] && record.cena_stana <= value[1],
            sorter: (a, b) => a.cena_stana - b.cena_stana,
        },
        {
            key: '10',
            title: 'Status',
            dataIndex: 'status_prodaje',
            filters: [
                {
                    text: 'prodat',
                    value: ['prodat'],
                },
                {
                    text: 'rezervisan',
                    value: ['rezervisan'],
                },
                {
                    text: 'dostupan',
                    value: ['dostupan'],
                },
            ],
            onFilter: (value, record) => record.status_prodaje.indexOf(value) === 0,
        },
        {
            key: '11',
            title: 'Ponude',
            render: (text, record) => (
                <Link to={`/ponude?id=${record.id_stana}&price=${record.cena_stana}`}>
                    <Button
                        style={{color: '#092b00', border: '1px solid green'}}
                        onClick={() => {
                            getListaPonuda(record.id_stana);
                        }}
                    >
                        Ponude
                    </Button>
                </Link>
            ),
        },
        {
            key: '12',
            title: 'Detalji',
            render: (text, record) => (
                <Link to={`/stanovi/${record.id_stana}`}>
                    <Button style={{color: 'blue', border: '1px solid black'}}>Detalji</Button>
                </Link>
            ),
        },
        {
            key: '13',
            title: 'Izmeni',
            render: (text, record) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            showModal(true);
                            getStanaObj(record.id_stana);
                        }}
                    >
                        Izmeni
                    </Button>
                </div>
            ),
        },
        {
            key: '14',
            title: 'Obrisi',
            render: (text, record) => (
                <>
                    <Button type="danger" onClick={() => showModalDelete(record.id_stana)}>
                        Obrisi
                    </Button>

                    <Modal
                        centered
                        visible={!!modalTaskId}
                        onOk={() => deleteStan()}
                        onCancel={() => setModalTaskId(null)}
                        width={400}
                        okText="DA"
                        cancelText="NE"
                    >
                        <p>Da li ste sigurni da želite da obrisete stan?</p>
                    </Modal>
                </>
            ),
        },
    ];

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="site-statistic-demo-card">
            {/*Dodaj novi stan BTN*/}
            <div style={{margin: 20}}>

                <Row gutter={16}>
                    <Col span={8} align="left">
                            <Button
                                type="primary"
                                size='large'
                                onClick={() => {
                                    setIsCreatePlaceVisible(true);
                                }}
                            >
                                Dodaj Novi stan
                            </Button>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Active"
                                value={11.28}
                                precision={2}
                                valueStyle={{color: '#3f8600'}}
                                prefix={<ArrowUpOutlined/>}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Idle"
                                value={9.3}
                                precision={2}
                                valueStyle={{color: '#cf1322'}}
                                prefix={<ArrowDownOutlined/>}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            <Row gutter={[0, 0]}>
                <Col span={24}>
                    <Table columns={columns} dataSource={data} pagination={{pageSize: [5]}}/>
                </Col>
            </Row>
            <Row gutter={[0, 0]}>
                <Col span={8}>
                    <div style={{width: '100%', height: 250}}>
                        <ResponsiveContainer>
                            <AreaChart
                                data={data2}
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
                                <Area type="natural" dataKey="uv" stroke="#8884d8" fill="#1890ff"/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{width: '100%', height: 250}}>
                        <ResponsiveContainer>
                            <AreaChart
                                data={data2}
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
                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8"/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Col>


                <Col span={8}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie dataKey="value" data={data3} fill="#8884d8" label/>
                        </PieChart>
                    </ResponsiveContainer>
                </Col>

            </Row>

            <Modal title="Izmeni" visible={isEditPlaceVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <IzmeneStanova edit propsstan={selectedPlace} getData={getData} closeModal={() => showModal(false)}/>
            </Modal>

            <Modal
                title="Kreiraj novi stan"
                visible={isCreatePlaceVisible}
                onOk={handleOk}
                onCancel={() => setIsCreatePlaceVisible(false)}
                footer={null}
            >
                <IzmeneStanova propsstan={selectedPlace} getData={getData}
                               closeModal={() => setIsCreatePlaceVisible(false)}/>
            </Modal>
        </div>
    );
}

export default PregledStanova;
