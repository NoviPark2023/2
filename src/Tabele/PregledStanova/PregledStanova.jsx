import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, Space, Popconfirm, Tag } from 'antd';
import Stanova from 'Modal/Stanova/Stanova';
import { api } from 'api/api';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { authService } from 'auth/auth.service';

function ApartmentsReview() {
  const activeRole = authService.getRole();

  /////state za izmeni
  const [isEditPlaceVisible, setIsEditPlaceVisible] = useState(false);
  const [isCreatePlaceVisible, setIsCreatePlaceVisible] = useState(false);

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  /// Api za dovlacenje podataka stana
  const [selectedPlace, setSelectedPlace] = useState('');

  //   ///api za dovlacenje ponuda
  //   const [, setSelectedOffers] = useState('');

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

  // PAGINATION STANOVI
  const handleChangePagination = pagination => {
    const offset = pagination.current * pagination.pageSize - pagination.pageSize;
    const limit = pagination.pageSize;

    getData(offset, limit);
  };

  //// API lista stanova
  const getData = async (offset, limit) => {
    setLoaderPage(true);

    const queryParams = new URLSearchParams();

    queryParams.append('offset', offset);
    queryParams.append('limit', limit);
    queryParams.append('offset', offset);

    api
      .get(`/stanovi/?${queryParams.toString()}`)
      .then(res => {
        if (res) {
          setData(res.data);
        }
      })
      .finally(() => {
        setLoaderPage(false);
      });
  };

  ////Api za brisanje stanova
  const deleteApartment = id_stana => {
    api.delete(`/stanovi/obrisi-stan/${id_stana}`).then(res => {
      getData();
    });
  };

  ////izmene i detalji stana
  const getApartmentObj = id_stana => {
    api.get(`/stanovi/detalji-stana/${id_stana}`).then(res => {
      setSelectedPlace(res.data);
    });
  };

  //   ///ponude stana
  //   const getListOffers = id_stana => {
  //     api.get(`/ponude/lista-ponuda-stana/${id_stana}/`).then(res => {
  //       setSelectedOffers(res.data);
  //     });
  //   };

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
    // {
    //     key: '1',
    //     title: 'ID',
    //     dataIndex: 'id_stana',
    //     align: 'center',
    //     ...getColumnSearchProps('id_stana'),
    // },
    {
      key: '2',
      title: 'Lamela',
      dataIndex: 'lamela',
      align: 'center',
      ...getColumnSearchProps('lamela'), /////pozivanje search-a u tabeli
    },
    // {
    //     key: '3',
    //     title: 'Adresa',
    //     dataIndex: 'adresa_stana',
    //     align: 'center',
    //     ...getColumnSearchProps('adresa_stana'),
    // },
    {
      key: '4',
      title: 'Kvadratura',
      dataIndex: 'kvadratura',
      align: 'center',
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
      onFilter: (value, record) => record.kvadratura >= value[0] && record.kvadratura <= value[1],
      sorter: (a, b) => a.kvadratura - b.kvadratura,
    },
    {
      key: '5',
      title: 'Sprat',
      dataIndex: 'sprat',
      align: 'center',
      filters: [
        {
          text: '1',
          value: [0, 1],
        },
        {
          text: '2',
          value: [2, 2],
        },
        {
          text: '3',
          value: [3, 3],
        },
        {
          text: '4',
          value: [4, 4],
        },
        {
          text: '5',
          value: [5, 5],
        },
        {
          text: '6',
          value: [6, 6],
        },
        {
          text: '7',
          value: [7, 7],
        },
        {
          text: 'PS',
          value: 'PS',
        },
      ],
      onFilter: (value, record) => record.sprat >= value[0] && record.sprat <= value[1],
      sorter: (a, b) => a.sprat - b.sprat,
    },
    {
      key: '6',
      title: 'Sobe',
      dataIndex: 'broj_soba',
      align: 'center',
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
      onFilter: (value, record) => record.broj_soba >= value[0] && record.broj_soba <= value[1],
      sorter: (a, b) => a.broj_soba - b.broj_soba,
    },
    {
      key: '7',
      title: 'Orijentisanost',
      dataIndex: 'orijentisanost',
      align: 'center',
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
      onFilter: (value, record) => record.orijentisanost.indexOf(value) === 0,
    },
    {
      key: '8',
      title: 'Terase',
      dataIndex: 'broj_terasa',
      align: 'center',
      filters: [
        {
          text: '0',
          value: [0, 0],
        },
        {
          text: '1',
          value: [1, 1],
        },
        {
          text: '2',
          value: [2, 2],
        },
        {
          text: '3',
          value: [3, 3],
        },
      ],
      onFilter: (value, record) => record.broj_terasa >= value[0] && record.broj_terasa <= value[1],
      sorter: (a, b) => a.broj_terasa - b.broj_terasa,
    },
    {
      key: '9',
      title: 'Cena',
      backgroundColor: 'red',
      dataIndex: 'cena_stana',
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
        {
          text: 'Rucno',
          value: ['rucno'],
        },
      ],
      onFilter: (value, record) => {
        if (value[0] !== 'rucno') {
          return record.cena_stana >= value[0] && record.cena_stana <= value[1];
        } else {
          return record.unesena_mauelna_cena_stana;
        }
      },
      sorter: (a, b) => a.cena_stana - b.cena_stana,
    },
    {
      key: '10',
      title: 'Status',
      align: 'center',
      dataIndex: 'status_prodaje',
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
      onFilter: (value, record) => record.status_prodaje.indexOf(value) === 0,
    },
    {
      key: '11',
      title: 'Ponude',
      align: 'center',
      render: (text, record) => (
        <Link to={`/ponude?id=${record.id_stana}`}>
          <Button
            style={{ color: '#092b00', border: '1px solid green' }}
            // onClick={() => {
            //   getListOffers(record.id_stana);
            // }}
          >
            Ponude
          </Button>
        </Link>
      ),
    },
    {
      key: '12',
      title: 'Detalji',
      align: 'center',
      render: (text, record) => (
        <Link to={`/stanovi/${record.id_stana}`}>
          <Button
            style={{ color: 'blue', border: '1px solid black' }}
            // onClick={() => {
            //   getListOffers(record.id_stana);
            // }}
          >
            Detalji
          </Button>
        </Link>
      ),
    },
    {
      key: '13',
      title: 'Izmeni',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button
            disabled={activeRole === 'Prodavac'}
            type="primary"
            onClick={() => {
              showModal(true);
              getApartmentObj(record.id_stana);
            }}
          >
            Izmeni
          </Button>
        </div>
      ),
    },
    {
      key: '14',
      title: 'Obriši',
      align: 'center',
      render: (text, record) => (
        <>
          <Popconfirm
            disabled={activeRole === 'Prodavac'}
            title="Da li ste sigurni da želite da izbrišete stan?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteApartment(record.id_stana)}
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
            setIsCreatePlaceVisible(true);
          }}
        >
          Dodaj novi stan
        </Button>
      </div>

      <Table
        rowClassName={record => (record.unesena_mauelna_cena_stana ? 'active-row' : '')}
        columns={columns}
        dataSource={data.results}
        onChange={handleChangePagination}
        pagination={{
          total: data.count, // total count returned from backend
        }}
        scroll={{ y: 'calc(100vh - 265px)' }}
        rowKey="id_stana"
      />

      <Modal
        title="Izmeni podatke stana"
        visible={isEditPlaceVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Stanova edit propsstan={selectedPlace} getData={getData} closeModal={() => showModal(false)} />
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Kreiraj novi stan"
        visible={isCreatePlaceVisible}
        onOk={handleOk}
        onCancel={() => setIsCreatePlaceVisible(false)}
        footer={null}
      >
        <Stanova propsstan={selectedPlace} getData={getData} closeModal={() => setIsCreatePlaceVisible(false)} />
      </Modal>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large" />}
      </div>
    </div>
  );
}

export default ApartmentsReview;
