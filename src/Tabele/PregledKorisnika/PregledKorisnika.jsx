import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, Space, Popconfirm } from 'antd';
import { api } from 'api/api';
import Korisnika from 'Modal/Korisnika/Korisnika';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Spin } from 'antd';

function ReviewUser() {
  const [user, setUser] = useState('');
  const [editUser, setEditUser] = useState(false);
  const [createUser, setCreateUser] = useState(false);

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  /////modal za dodaj
  const showModal = id => {
    setEditUser(id);
  };

  const handleOk = () => {
    setEditUser(false);
  };

  const handleCancel = () => {
    setEditUser(false);
  };

  //state za API
  const [data, setData] = useState([]);

  ////Api Lista Korisnika
  const getData = () => {
    setLoaderPage(true);
    api
      .get('/korisnici/')
      .then(res => {
        setData(res.data);
      })
      .finally(() => {
        setLoaderPage(false);
      });
  };

  ///api za brisanje korisnika
  const deleteUser = id => {
    api.delete(`/korisnici/obrisi-korisnika/${id}/`).then(res => {
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
      title: 'ID',
      align: 'center',
      dataIndex: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      key: '2',
      title: 'Ime',
      align: 'center',
      dataIndex: 'ime',
      ...getColumnSearchProps('ime'),
    },
    {
      key: '3',
      title: 'Prezime',
      align: 'center',
      dataIndex: 'prezime',
      ...getColumnSearchProps('prezime'),
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
      title: 'Korisničko ime',
      align: 'center',
      dataIndex: 'username',
      ...getColumnSearchProps('username'),
    },
    {
      key: '6',
      title: 'Tip korisnika',
      align: 'center',
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
      align: 'center',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              showModal(true);
              setUser(record);
            }}
          >
            Izmeni
          </Button>
        </div>
      ),
    },

    {
      title: 'Obriši',
      align: 'center',
      key: '9',
      render: (text, record) => (
        <>
          <Popconfirm
            title="Da li ste sigurni da želite da izbrišete korisnika?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteUser(record.id)}
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
            setCreateUser(true);
          }}
        >
          Dodaj novog korisnika
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: [5] }} rowKey="id"></Table>
      <Modal title="Izmeni korisnika" visible={editUser} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Korisnika edit propskorisnika={user} getData={getData} closeModal={() => showModal(false)} />
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Kreiranje korisnika"
        visible={createUser}
        onOk={handleOk}
        onCancel={() => setCreateUser(false)}
        footer={null}
      >
        <Korisnika propskorisnika={user} getData={getData} closeModal={() => setCreateUser(false)} />
      </Modal>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large"></Spin>}
      </div>
    </div>
  );
}

export default ReviewUser;
