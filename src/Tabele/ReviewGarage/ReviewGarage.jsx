/* eslint-disable default-case */
import React, { useEffect, useState, useContext } from 'react';
import { Button, Input, Modal, Popconfirm, Space, Spin, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Garage from 'Modal/Garage/Garage';
import { api } from 'api/api';
import 'antd/dist/antd.css';
import { authService } from 'auth/auth.service';
import { GlobalStoreContext } from 'components/Views/Views';

function GarageReview() {
  const [client, setClient] = useState('');
  const [editClient, setEditClient] = useState(false);
  const [createClient, setCreateClient] = useState(false);

  //////reducer
  const [state, dispatch] = useContext(GlobalStoreContext);

  const activeRole = authService.getRole();

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
  const [data, setData] = useState({});

  // PAGINATION GARAZE
  const handleChangePagination = (pagination, filter) => {
    const stringFilters = ['jedinstveni_broj_garaze', 'ime_kupca', 'cena_garaze', 'status_prodaje_garaze'];
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

  //// API lista Garaza
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
      .get(`/garaze/?${queryParams.toString()}`)
      .then(res => {
        setData(res.data);
      })
      .finally(() => {
        setLoaderPage(false);
      });
  };

  /// Api za brisanje kupca
  const deleteGarage = id_garaze => {
    api.delete(`/garaze/obrisi-garazu/${id_garaze}/`).then(res => {
      getData();
    });
  };

  ////ugovor
  const Contract = id_garaze => {
    api.get(`/garaze/preuzmi-ugovor-garaze/${id_garaze}/`).then(res => {
      const link = document.createElement('a');
      link.href = res.data;
      link.download = 'Ugovor';
      link.click();
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
      key: 'jedinstveni_broj_garaze',
      title: 'Broj garaže',
      align: 'center',
      dataIndex: 'jedinstveni_broj_garaze',
      ...getColumnSearchProps('jedinstveni_broj_garaze'),
    },
    {
      key: 'cena_garaze',
      title: 'Cena',
      align: 'center',
      dataIndex: 'cena_garaze',
    },
    {
      key: 'ime_kupca',
      title: 'Kupac',
      align: 'center',
      dataIndex: 'ime_kupca',
      // ...getColumnSearchProps('ime_kupca'),
    },
    {
      key: 'status_prodaje_garaze',
      title: 'Status',
      align: 'center',
      dataIndex: 'status_prodaje_garaze',
      render(text) {
        let color = text === 'dostupna' ? 'geekblue' : 'green';
        if (text === 'dostupna') {
          color = 'green';
        } else if (text === 'prodata') {
          color = 'red';
        } else if (text === 'rezervisana') {
          color = 'blue';
        }
        return (
          <Tag color={color} style={{ width: '70%', textAlign: 'center' }} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        {
          text: 'prodata',
          value: 'prodata',
        },
        {
          text: 'dostupna',
          value: 'dostupna',
        },
        {
          text: 'rezervisana',
          value: 'rezervisana',
        },
      ],
      // onFilter: (value, record) => record.status_prodaje_garaze.indexOf(value) === 0,
    },
    {
      key: 'datum_ugovora_garaze',
      title: 'Datum',
      align: 'center',
      dataIndex: 'datum_ugovora_garaze',
    },
    {
      key: '7',
      title: 'Način plaćanja',
      align: 'center',
      dataIndex: 'nacin_placanja_garaze',
      render: (text, record) => <span>{record.nacin_placanja_garaze}</span>,
      // filters: [
      //   {
      //     text: 'Ceo iznos',
      //     value: 'Ceo iznos',
      //   },
      //   {
      //     text: 'Kredit',
      //     value: 'Kredit',
      //   },
      //   {
      //     text: 'Na rate',
      //     value: 'Na rate',
      //   },
      //   {
      //     text: 'Ucešće',
      //     value: 'Ucesce',
      //   },
      // ],
      // onFilter: (value, record) => record.nacin_placanja_garaze.indexOf(value) === 0,
    },

    {
      key: '8',
      title: 'Ugovor',
      align: 'center',
      render: (text, record) => (
        <>
          <Button
            disabled={record.status_prodaje_garaze === 'dostupna'}
            onClick={() => {
              Contract(record.id_garaze);
            }}
          >
            Ugovor
          </Button>
        </>
      ),
    },
    {
      key: '9',
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
            disabled={activeRole === 'Prodavac'}
            title="Da li ste sigurni da želite da izbrišete garažu?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteGarage(record.id_garaze)}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div>
      <div style={{ margin: 20 }}>
        <Button
          disabled={activeRole === 'Prodavac'}
          type="primary"
          onClick={() => {
            setCreateClient(true);
          }}
        >
          Dodaj novu garažu
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
        rowKey="id_garaze"
      />

      <Modal title="Izmeni podatke garaže" visible={editClient} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Garage edit propsgaraze={client} getData={getData} closeModal={() => showModal(false)} />
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Kreiranje garaže"
        visible={createClient}
        onOk={handleOk}
        onCancel={() => setCreateClient(false)}
        footer={null}
      >
        <Garage propsgaraze={client} getData={getData} closeModal={() => setCreateClient(false)} />
      </Modal>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large" />}
      </div>
    </div>
  );
}

export default GarageReview;
