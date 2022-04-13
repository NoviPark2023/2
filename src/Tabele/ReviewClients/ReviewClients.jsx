import React, { useEffect, useState, useContext } from 'react';
import { Button, Table, Modal, Input, Space, Popconfirm } from 'antd';
import { api } from 'api/api';
import Clients from 'Modal/Clients/Clients';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { GlobalStoreContext } from 'components/Views/Views';

function ClientsReview() {
  const [client, setClient] = useState('');
  const [editClient, setEditClient] = useState(false);
  const [createClient, setCreateClient] = useState(false);

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  //////reducer
  const [state, dispatch] = useContext(GlobalStoreContext);

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
  const [data, setData] = useState({});

  // PAGINATION KLIJENTI
  const handleChangePagination = (pagination, filter) => {
    const stringFilters = ['lice', 'ime_prezime', 'email', 'broj_telefona', 'Jmbg_Pib', 'adresa'];
    Object.entries(filter).forEach(entry => {
      let key = entry[0];
      let value = entry[1];
      if (stringFilters.includes(key)) {
        filter[key] = value ? value[0] : null;
      } else {
        filter[key] = value ? value : null;
      }
    });

    const offset = pagination.current * pagination.pageSize - pagination.pageSize;
    const limit = pagination.pageSize;

    dispatch({
      type: 'update_filters_pagination',
      pagination: { offset: offset, limit: limit, current: pagination.current },
      filters: filter,
    });
  };

  //// API lista klijenata
  const getData = async () => {
    setLoaderPage(true);

    const queryParams = new URLSearchParams();
    let filter = state.filter;
    let offset = state.pagination.offset;
    let limit = state.pagination.limit;
    if (filter)
      Object.entries(filter).forEach(entry => {
        if (entry[1]) {
          queryParams.append(entry[0], entry[1]);
        }
      });
    if (offset) queryParams.append('offset', offset);
    if (limit) queryParams.append('limit', limit);

    api
      .get(`/kupci/?${queryParams.toString()}`)
      .then(res => {
        setData(res.data);
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

  ////hooks za search u tabeli
  const [searchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  ////funkcionanost za search u tabeli
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
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
      key: 'lice',
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
    },
    {
      key: 'ime_prezime__icontains',
      title: 'Ime i Prezime',
      align: 'center',
      dataIndex: 'ime_prezime',
      ...getColumnSearchProps('ime_prezime'),
    },
    {
      key: 'email__icontains',
      title: 'E-mail',
      align: 'center',
      dataIndex: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      key: 'broj_telefona__icontains',
      title: 'Broj telefona',
      align: 'center',
      dataIndex: 'broj_telefona',
      ...getColumnSearchProps('broj_telefona'),
    },
    {
      key: 'Jmbg_Pib__icontains',
      title: 'PIB/JMBG',
      align: 'center',
      dataIndex: 'Jmbg_Pib',
      ...getColumnSearchProps('Jmbg_Pib'),
    },
    {
      key: 'adresa__icontains',
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
          <Button style={{ color: 'blue', border: '1px solid black' }}>
            {/* onClick={() => getDetailClient(record.id_kupca)} */}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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

      <Table
        columns={columns}
        dataSource={data.results}
        onChange={handleChangePagination}
        pagination={{
          total: data.count,
          current: state.pagination.current,
        }}
        scroll={{ y: 'calc(100vh - 265px)' }}
        rowKey="id_kupca"
      />

      <Modal title="Izmeni klijenta" visible={editClient} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Clients edit propsklijenta={client} getData={getData} closeModal={() => showModal(false)} />
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Kreiranje klijenta"
        visible={createClient}
        onOk={handleOk}
        onCancel={() => setCreateClient(false)}
        footer={null}
      >
        <Clients propsklijenta={client} getData={getData} closeModal={() => setCreateClient(false)} />
      </Modal>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large" />}
      </div>
    </div>
  );
}

export default ClientsReview;
