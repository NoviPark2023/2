import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Input, Space, Popconfirm } from 'antd';
import { api } from 'api/api';
import NoviKlijent from 'Form/NoviKlijent/NoviKlijent';
import IzmeneKlijenta from 'Form/IzmeneKlijenta/IzmeneKlijenta';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Spin } from 'antd';

function PregledKlijenta() {
  /// state za dodaj
  const [isModalVisible, setIsModalVisible] = useState(null);
  //state za izmeni
  const [, setIsNewClientVisible] = useState(false);
  /// Api za dovlacenje podataka podataka
  const [selectedUser, setSelectedUser] = useState('');
  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  ///modal za dodaj
  const showModal = isShow => {
    setIsModalVisible(isShow);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // modal za izmeni
  const showModalIzmeni = (id, isVisible) => {
    const list = data.map(item => {
      if (+item.id_kupca === +id) return { ...item, modal: isVisible };
      return item;
    });
    setData(list);
    console.log(list, 'klijenti');
  };

  const handleOkIzmeni = () => {
    setIsNewClientVisible(false);
  };

  //state za API
  const [data, setData] = useState([]);

  //// API lista klijenata
  const getData = async () => {
    setLoaderPage(true);
    api
      .get('/kupci/')
      .then(res => {
        const list = res.data.results.map(item => ({ ...item, modal: false }));
        setData(list);
      })
      .finally(() => {
        setLoaderPage(false);
      });
  };

  ////Api Lista Korisnika
  const getItem = id_kupca => {
    api.get(`/kupci/detalji-kupca/${id_kupca}/`).then(res => {
      getData();
    });
  };
  //  TODO: napraviti error funkciju za proveru servera
  /// Api za brisanje kupca
  const deleteItem = id_kupca => {
    api.delete(`/kupci/obrisi-kupca/${id_kupca}/`).then(res => {
      getData();
    });
  };

  /// Api za dovlacenje podataka
  const getClientObj = id_kupca => {
    api.get(`/kupci/detalji-kupca/${id_kupca}/`).then(res => {
      setSelectedUser(res.data);
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
      dataIndex: 'id_kupca',
      ...getColumnSearchProps('id_kupca'), /////pozivanje search-a u tabeli
    },
    {
      key: '2',
      title: 'Lice',
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
      dataIndex: 'ime_prezime',
      ...getColumnSearchProps('ime_prezime'),
    },
    {
      key: '4',
      title: 'Email',
      dataIndex: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      key: '5',
      title: 'Broj telefona',
      dataIndex: 'broj_telefona',
      ...getColumnSearchProps('broj_telefona'),
    },
    {
      key: '6',
      title: 'PIB/JMBG',
      dataIndex: 'Jmbg_Pib',
      ...getColumnSearchProps('Jmbg_Pib'),
    },
    {
      key: '7',
      title: 'Adresa',
      dataIndex: 'adresa',
      ...getColumnSearchProps('adresa'),
    },
    {
      title: 'Detalji',
      key: '9',
      render: (text, record) => (
        <Link to={`/klijenti/${record.id_kupca}`}>
          <Button style={{ color: 'blue', border: '1px solid black' }} onClick={() => getItem(record.id_kupca)}>
            Detalji
          </Button>
        </Link>
      ),
    },
    {
      key: '8',
      title: 'Izmeni',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              showModalIzmeni(record.id_kupca, true);
              getClientObj(record.id_kupca);
            }}
          >
            Izmeni
          </Button>

          <Modal
            title="Izmeni"
            visible={record.modal}
            onOk={handleOkIzmeni}
            onCancel={() => showModalIzmeni(record.id_kupca, false)}
            footer={null}
          >
            <IzmeneKlijenta
              propsklijenta={selectedUser}
              getData={getData}
              closeModal={() => showModalIzmeni(record.id_kupca, false)}
            />
          </Modal>
        </div>
      ),
    },

    {
      key: '10',
      title: 'Obrisi',
      render: (text, record) => (
        <>
          <Popconfirm
            title="Da li ste sigurni da zelite da izbrisete klijenta?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteItem(record.id_kupca)}
          >
            <Button type="danger">Obrisi</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  /// proveri USEeffeect
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div style={{ margin: 20 }}>
        <Button type="primary" onClick={() => showModal(true)}>
          Dodaj Novog Klijenta
        </Button>
      </div>

      <Table columns={columns} dataSource={data} pagination={{ pageSize: [4] }}></Table>

      <Modal title="Novi Klijent" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <NoviKlijent closeModal={() => showModal(false)} fetchUsers={getData} />
      </Modal>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large"></Spin>}
      </div>
    </div>
  );
}

export default PregledKlijenta;
