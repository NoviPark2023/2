import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Input, Space, Popconfirm } from 'antd';
import { api } from 'api/api';
import Klijenta from 'Modal/Klijenta/Klijenta';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Spin } from 'antd';

function ClientsReview() {
  const [client, setClient] = useState('');
  const [editClient, setEditClient] = useState(false);
  const [createClient, setCreateClient] = useState(false);
  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  /////modal za dodaj
  const showModal = id => {
    setEditClient(id);
  };

  const handleOk = () => {
    setEditClient(false);
  };

  const handleCancel = () => {
    setEditClient(false);
  };

  //state za API
  const [data, setData] = useState([]);

  //// API lista klijenata
  const getData = async () => {
    setLoaderPage(true);
    api
      .get('/kupci/')
      .then(res => {
        setData(res.data.results);
      })
      .finally(() => {
        setLoaderPage(false);
      });
  };

  /// Api za brisanje kupca
  const deleteClient = id_kupca => {
    api.delete(`/kupci/obrisi-kupca/${id_kupca}/`).then(res => {
      getData();
    });
  };

  ////Api Lista Korisnika
  const getDetailClient = id_kupca => {
    api.get(`/kupci/detalji-kupca/${id_kupca}/`).then(res => {
      getData();
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
      title: 'ID Kupca',
      align: 'center',
      dataIndex: 'id_kupca',
      ...getColumnSearchProps('id_kupca'), /////pozivanje search-a u tabeli
    },
    {
      key: '2',
      title: 'Lice',
      align: 'center',
      dataIndex: 'lice',
      filters: [
        {
          text: 'Pravno',
          value: 'Pravno',
        },
        {
          text: 'Fizicko',
          value: 'Fizicko',
        },
      ],
      onFilter: (value, record) => record.lice.indexOf(value) === 0,
    },
    {
      key: '3',
      title: 'Ime i Prezime',
      align: 'center',
      dataIndex: 'ime_prezime',
      ...getColumnSearchProps('ime_prezime'),
    },
    {
      key: '4',
      title: 'E-mail',
      align: 'center',
      dataIndex: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      key: '5',
      title: 'Broj telefona',
      align: 'center',
      dataIndex: 'broj_telefona',
      ...getColumnSearchProps('broj_telefona'),
    },
    {
      key: '6',
      title: 'PIB/JMBG',
      align: 'center',
      dataIndex: 'Jmbg_Pib',
      ...getColumnSearchProps('Jmbg_Pib'),
    },
    {
      key: '7',
      title: 'Adresa',
      align: 'center',
      dataIndex: 'adresa',
      ...getColumnSearchProps('adresa'),
    },
    {
      title: 'Detalji',
      align: 'center',
      key: '9',
      render: (text, record) => (
        <Link to={`/klijenti/${record.id_kupca}`}>
          <Button style={{ color: 'blue', border: '1px solid black' }} onClick={() => getDetailClient(record.id_kupca)}>
            Detalji
          </Button>
        </Link>
      ),
    },
    {
      key: '8',
      title: 'Izmeni',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              showModal(true);
              setClient(record);
            }}
          >
            Izmeni
          </Button>
        </div>
      ),
    },

    {
      key: '10',
      title: 'Obriši',
      align: 'center',
      render: (text, record) => (
        <>
          <Popconfirm
            title="Da li ste sigurni da želite da izbrišete klijenta?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteClient(record.id_kupca)}
          >
            <Button type="danger">Obriši</Button>
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
            setCreateClient(true);
          }}
        >
          Dodaj novog klijenta
        </Button>
      </div>

      <Table columns={columns} dataSource={data} pagination={{ pageSize: [6] }} rowKey="id_kupca" />

      <Modal title="Izmeni klijenta" visible={editClient} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Klijenta edit propsklijenta={client} getData={getData} closeModal={() => showModal(false)} />
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Kreiranje klijenta"
        visible={createClient}
        onOk={handleOk}
        onCancel={() => setCreateClient(false)}
        footer={null}
      >
        <Klijenta propsklijenta={client} getData={getData} closeModal={() => setCreateClient(false)} />
      </Modal>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large" />}
      </div>
    </div>
  );
}

export default ClientsReview;
