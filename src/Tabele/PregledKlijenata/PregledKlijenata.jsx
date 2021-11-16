import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Input, Space } from 'antd';
import { api } from 'api/api';
import NoviKlijent from 'Form/NoviKlijent/NoviKlijent';
import IzmeneKlijenta from 'Form/IzmeneKlijenta/IzmeneKlijenta';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import style from './PregledKlijenata.module.css';

function PregledKlijenta() {
  const [modalTaskId, setModalTaskId] = useState(null);
  /// state za dodaj
  const [isModalVisible, setIsModalVisible] = useState(null);
  //state za izmeni
  const [isNewClientVisible, setIsNewClientVisible] = useState(false);
  /// Api za dovlacenje podataka podataka
  const [selectedUser, setSelectedUser] = useState('');

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
  const showModalIzmeni = isShow => {
    setIsNewClientVisible(isShow);
  };

  const handleOkIzmeni = () => {
    setIsNewClientVisible(false);
  };

  const handleCancelIzmeni = () => {
    setIsNewClientVisible(false);
  };
  ///modal za brisanje
  const showModalDelete = id => {
    setModalTaskId(id);
  };
  //state za API
  const [data, setData] = useState([]);

  //// API lista klijenata
  const getData = async () => {
    api.get('/kupci/').then(res => {
      setData(res.data);
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
    api.delete(`/kupci/obrisi-kupca/${modalTaskId}/`).then(res => {
      getData();
      showModalDelete(false);
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
    // {
    //   title: 'Detalji',
    //   key: '9',
    //   render: (text, record) => <Button onClick={() => getItem(record.id_kupca)}>Detalji</Button>,
    // },
    {
      key: '8',
      title: 'Izmeni',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              showModalIzmeni(true);
              getClientObj(record.id_kupca);
            }}
          >
            Izmeni
          </Button>

          <Modal
            title="Izmeni"
            visible={isNewClientVisible}
            onOk={handleOkIzmeni}
            onCancel={handleCancelIzmeni}
            footer={null}
          >
            <IzmeneKlijenta propsklijenta={selectedUser} getData={getData} closeModal={() => showModalIzmeni(false)} />
          </Modal>
        </div>
      ),
    },

    {
      title: 'Obrisi',
      key: '10',
      render: (text, record) => (
        <>
          <Button type="danger" onClick={() => showModalDelete(record.id_kupca)}>
            Obrisi
          </Button>
          <Modal
            centered
            visible={!!modalTaskId}
            onOk={() => deleteItem()}
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

  /// proveri USEeffeect
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className={style.button}>
        <Button type="primary" onClick={() => showModal(true)}>
          Dodaj Novog Klijenta
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: [5] }}></Table>

      <Modal title="Novi Klijent" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <NoviKlijent closeModal={() => showModal(false)} fetchUsers={getData} />
      </Modal>
    </div>
  );
}

export default PregledKlijenta;
