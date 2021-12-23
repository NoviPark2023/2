import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, Space, Popconfirm } from 'antd';
import { api } from 'api/api';
import NoviKorisnikForm from 'Form/NoviKorisnik/NoviKorisnikForm';
import IzmenaKorisnika from 'Form/IzmenaKorisnika/IzmenaKorisnika';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

function PregledKorisnika() {
  ///// modal za dodaj
  const [isModalVisible, setIsModalVisible] = useState(null);
  //// state za izmeni
  const [, setIsNewClientVisible] = useState(false);
  /// Api za dovlacenje podataka podataka
  const [selectedKorisnika, setSelectedKorisnika] = useState('');

  /////modal za dodaj
  const showModal = isShow => {
    setIsModalVisible(isShow);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  ///modal za izmeni
  const showModalIzmeni = (id, isVisible) => {
    const list = data.map(item => {
      if (+item.id === +id) return { ...item, modal: isVisible };
      return item;
    });
    setData(list);
  };

  const handleOkIzmeni = () => {
    setIsNewClientVisible(false);
  };

  //state za API
  const [data, setData] = useState([]);

  ////Api Lista Korisnika
  const getData = async () => {
    api.get('/korisnici/').then(res => {
      const list = res.data.map(item => ({ ...item, modal: false }));
      setData(list);
    });
  };

  ///api za brisanje korisnika
  const deleteKorisnika = id => {
    api.delete(`/korisnici/obrisi-korisnika/${id}/`).then(res => {
      getData();
    });
  };

  /// Api za dovlacenje podataka
  const getKorisnikaObj = id => {
    api.get(`/korisnici/detalji-korisnika/${id}/`).then(res => {
      setSelectedKorisnika(res.data);
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
      dataIndex: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      key: '2',
      title: 'Ime',
      dataIndex: 'ime',
      ...getColumnSearchProps('ime'),
    },
    {
      key: '3',
      title: 'Prezime',
      dataIndex: 'prezime',
      ...getColumnSearchProps('prezime'),
    },
    {
      key: '4',
      title: 'Email',
      dataIndex: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      key: '5',
      title: 'Korisnicko ime',
      dataIndex: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      key: '6',
      title: 'Tip korisnika',
      dataIndex: 'role',
      filters: [
        {
          text: 'Prodavac',
          value: 'Prodavac',
        },
        {
          text: 'Finansije',
          value: 'Finansije',
        },
        {
          text: 'Administrator',
          value: 'Administrator',
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },

    {
      key: '8',
      title: 'Izmeni',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              showModalIzmeni(record.id, true);
              getKorisnikaObj(record.id);
            }}
          >
            Izmeni
          </Button>
          <Modal
            title="Izmeni"
            visible={record.modal}
            onOk={handleOkIzmeni}
            onCancel={() => showModalIzmeni(record.id, false)}
            footer={null}
          >
            <IzmenaKorisnika
              propskorisnika={selectedKorisnika}
              getData={getData}
              closeModal={() => showModalIzmeni(record.id, false)}
            />
          </Modal>
        </div>
      ),
    },

    {
      title: 'Obrisi',
      key: '9',
      render: (text, record) => (
        <>
          <Popconfirm
            title="Da li ste sigurni da zelite da izbrisete korisnika?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteKorisnika(record.id)}
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
      <div style={{ marginBottom: '0.5rem' }}>
        <Button type="primary" onClick={() => showModal(true)}>
          Dodaj Novog Korisnika
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: [4] }}></Table>
      <Modal title="Novi Korisnik" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <NoviKorisnikForm closeModal={() => showModal(false)} fetchUsers={() => getData()} />
      </Modal>
    </div>
  );
}

export default PregledKorisnika;
