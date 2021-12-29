import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, Space, Popconfirm } from 'antd';
import IzmeneStanova from 'Form/IzmeneStanova/IzmeneStanova';
import { api } from 'api/api';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function PregledStanova() {
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
    api.delete(`/stanovi/obrisi-stan/${id_stana}`).then(res => {
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
            style={{ color: '#092b00', border: '1px solid green' }}
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
          <Button
            style={{ color: 'blue', border: '1px solid black' }}
            onClick={() => {
              getListaPonuda(record.id_stana);
            }}
          >
            Detalji
          </Button>
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
          <Popconfirm
            title="Da li ste sigurni da zelite da izbrisete stan?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteStan(record.id_stana)}
          >
            <Button type="danger">Obrisi</Button>
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
          type="primary"
          onClick={() => {
            setIsCreatePlaceVisible(true);
          }}
        >
          Dodaj Novi stan
        </Button>
      </div>

      <Table columns={columns} dataSource={data} pagination={{ pageSize: [6] }}></Table>

      <Modal title="Izmeni" visible={isEditPlaceVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <IzmeneStanova edit propsstan={selectedPlace} getData={getData} closeModal={() => showModal(false)} />
      </Modal>

      <Modal
        title="Kreiraj novi stan"
        visible={isCreatePlaceVisible}
        onOk={handleOk}
        onCancel={() => setIsCreatePlaceVisible(false)}
        footer={null}
      >
        <IzmeneStanova propsstan={selectedPlace} getData={getData} closeModal={() => setIsCreatePlaceVisible(false)} />
      </Modal>
    </div>
  );
}

export default PregledStanova;
