import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, Space, Popconfirm, Tag } from 'antd';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Lokali from 'Modal/Lokali/Lokali';
import { api } from 'api/api';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { authService } from 'auth/auth.service';

function ReviewLocal() {
  const activeRole = authService.getRole();

  const [createLocal, setCreateLocal] = useState(false);
  const [editLocal, setEditLocal] = useState(false);

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  /// Api za dovlacenje podataka stana
  const [selectedLocal, setSelectedLocal] = useState('');

  // ///api za dovlacenje ponuda lokala
  // const [, setSelectedOffers] = useState('');

  ///modal za dodaj
  const showModal = id => {
    setEditLocal(id);
  };

  const handleOk = () => {
    setEditLocal(false);
  };

  const handleCancel = () => {
    setEditLocal(false);
  };

  ///API state
  const [data, setData] = useState([]);

  //// API lista lokala
  const getData = async () => {
    setLoaderPage(true);
    api
      .get('/lokali/')
      .then(res => {
        if (res) {
          setData(res.data.results);
        }
      })
      .finally(() => {
        setLoaderPage(false);
      });
  };

  ////Api za brisanje stanova
  const deleteLocal = id_lokala => {
    api.delete(`/lokali/obrisi-lokal/${id_lokala}/`).then(res => {
      getData();
    });
  };

  ////izmene i detalji stana
  const getLocalObj = id_lokala => {
    api.get(`/lokali/detalji-lokala/${id_lokala}/`).then(res => {
      setSelectedLocal(res.data);
    });
  };

  ///ponude lokala
  // const getListOffers = id_lokala => {
  //   api.get(`/ponude-lokali/lista-ponuda-lokala/${id_lokala}/`).then(res => {
  //     setSelectedOffers(res.data);
  //   });
  // };

  ////hooks za search u tabeli
  const [searchText, setSearchText] = useState();
  const [searchedColumn, setSearchedColumn] = useState();

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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 100 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 100 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
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
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
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
      align: 'center',
      dataIndex: 'id_lokala',
      ...getColumnSearchProps('id_lokala'),
    },
    {
      key: '2',
      title: 'Lamela',
      align: 'center',
      dataIndex: 'lamela_lokala',
      ...getColumnSearchProps('lamela_lokala'),
    },
    {
      key: '3',
      title: 'Adresa',
      align: 'center',
      dataIndex: 'adresa_lokala',
      ...getColumnSearchProps('adresa_lokala'),
    },
    {
      key: '4',
      title: 'Kvadratura',
      align: 'center',
      dataIndex: 'kvadratura_lokala',
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
        {
          text: '120-170',
          value: [120, 170],
        },
      ],
      onFilter: (value, record) => record.kvadratura_lokala >= value[0] && record.kvadratura_lokala <= value[1],
      sorter: (a, b) => a.kvadratura_lokala - b.kvadratura_lokala,
    },

    {
      key: '5',
      title: 'Broj prostorija',
      align: 'center',
      dataIndex: 'broj_prostorija',
      filters: [
        {
          text: '1',
          value: [1, 1],
        },
        {
          text: '1.5',
          value: [1.5, 1.5],
        },
        {
          text: '2',
          value: [2, 2],
        },
        {
          text: '2.5',
          value: [2.5, 2.5],
        },
        {
          text: '3',
          value: [3, 3],
        },
        {
          text: '3.5',
          value: [3.5, 3.5],
        },
        {
          text: '4',
          value: [4, 4],
        },
        {
          text: '4.5',
          value: [4.5, 4.5],
        },
        {
          text: '5',
          value: [5, 5],
        },
      ],
      onFilter: (value, record) => record.broj_prostorija >= value[0] && record.broj_prostorija <= value[1],
      sorter: (a, b) => a.broj_prostorija - b.broj_prostorija,
    },
    {
      key: '6',
      title: 'Orijentisanost',
      align: 'center',
      dataIndex: 'orijentisanost_lokala',
      filters: [
        {
          text: 'Sever',
          value: 'Sever',
        },
        {
          text: 'Jug',
          value: 'Jug',
        },
      ],
      onFilter: (value, record) => record.orijentisanost_lokala.indexOf(value) === 0,
    },

    {
      key: '7',
      title: 'Cena',
      align: 'center',
      dataIndex: 'cena_lokala',
      filters: [
        {
          text: '50000-70000',
          value: [50000, 70000],
        },
        {
          text: '70000-85000',
          value: [70000, 85000],
        },
        {
          text: '85000-95000',
          value: [85000, 95000],
        },
        {
          text: '95000-105000',
          value: [95000, 105000],
        },
        {
          text: '105000-120000',
          value: [105000, 120000],
        },
        {
          text: '120000-150000',
          value: [120000, 150000],
        },
        {
          text: '150000-200000',
          value: [150000, 200000],
        },
      ],
      onFilter: (value, record) => record.cena_lokala >= value[0] && record.cena_lokala <= value[1],
      sorter: (a, b) => a.cena_lokala - b.cena_lokala,
    },
    {
      key: '8',
      title: 'Status',
      align: 'center',
      dataIndex: 'status_prodaje_lokala',
      render(text) {
        let color = text === 'dostupan' ? 'geekblue' : 'green';
        if (text === 'dostupan') {
          color = 'green';
        } else if (text === 'rezervisan') {
          color = 'blue';
        } else if (text === 'prodat') {
          color = 'red';
        }
        return (
          <Tag color={color} style={{ width: '100%', textAlign: 'center' }} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
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
      onFilter: (value, record) => record.status_prodaje_lokala.indexOf(value) === 0,
    },
    {
      key: '9',
      title: 'Ponude',
      align: 'center',
      render: (text, record) => (
        <Link to={`/ponude-lokala?id=${record.id_lokala}`}>
          <Button
            style={{ color: '#092b00', border: '1px solid green' }}
            onClick={() => {
              setSelectedLocal(record.id_ponude_lokala);
            }}
          >
            Ponude
          </Button>
        </Link>
      ),
    },
    {
      key: '10',
      title: 'Detalji',
      align: 'center',
      render: (text, record) => (
        <Link to={`/lokali/${record.id_lokala}`}>
          <Button
            style={{ color: 'blue', border: '1px solid black' }}
            onClick={() => {
              setSelectedLocal(record.id_lokala);
            }}
          >
            Detalji
          </Button>
        </Link>
      ),
    },
    {
      key: '11',
      title: 'Izmeni',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button
            disabled={activeRole === 'Prodavac'}
            type="primary"
            onClick={() => {
              showModal(true);
              getLocalObj(record.id_lokala);
            }}
          >
            Izmeni
          </Button>
        </div>
      ),
    },
    {
      key: '12',
      title: 'Obriši',
      align: 'center',
      render: (text, record) => (
        <>
          <Popconfirm
            disabled={activeRole === 'Prodavac'}
            title="Da li ste sigurni da želite da izbrišete lokal?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteLocal(record.id_lokala)}
          >
            <Button disabled={activeRole === 'Prodavac'} type="danger">
              Obriši
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div style={{ margin: 20 }}>
        <Button
          disabled={activeRole === 'Prodavac'}
          type="primary"
          onClick={() => {
            setCreateLocal(true);
          }}
        >
          Dodaj novi lokal
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 'calc(100vh - 265px)' }}
        rowKey="id_lokala"
      />
      <Modal title="Izmeni podatke lokala" visible={editLocal} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Lokali edit propslokala={selectedLocal} getData={getData} closeModal={() => showModal(false)} />
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Kreiraj novi lokal"
        visible={createLocal}
        onOk={handleOk}
        onCancel={() => setCreateLocal(false)}
        footer={null}
      >
        <Lokali propslokala={selectedLocal} getData={getData} closeModal={() => setCreateLocal(false)} />
      </Modal>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large" />}
      </div>
    </div>
  );
}

export default ReviewLocal;
