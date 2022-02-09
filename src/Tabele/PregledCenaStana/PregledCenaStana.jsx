import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, Space, Popconfirm } from 'antd';
import { api } from 'api/api';
import CeneKvadrata from 'Modal/CeneKvadrata/CeneKvadrata';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Spin } from 'antd';

function ApartmentsPriceReview() {
  const [selectedApartments, setSelectedApartments] = useState('');
  const [isEditPriceVisible, setIsEditPriceVisible] = useState(false);
  const [isCreatePriceVisible, setIsCreatePriceVisible] = useState(false);

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  ///modal za dodaj
  const showModal = id => {
    setIsEditPriceVisible(id);
  };

  const handleOk = () => {
    setIsEditPriceVisible(false);
  };

  const handleCancel = () => {
    setIsEditPriceVisible(false);
  };

  //state za API
  const [data, setData] = useState([]);

  /// lista (tabela) cene kvadrata
  const listOfPrice = () => {
    setLoaderPage(true);
    api
      .get(`/stanovi/listing-cena-kvadrata`)
      .then(res => {
        setData(res.data);
      })
      .finally(() => {
        setLoaderPage(false);
      });
  };

  ////brisanje cene kvadrata
  const deletePrice = id_azur_cene => {
    api.delete(`/stanovi/izbrisi-cenu-kvadrata/${id_azur_cene}`).then(res => {
      listOfPrice();
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
      title: 'ID Cene',
      align: 'center',
      dataIndex: 'id_azur_cene',
      ...getColumnSearchProps('id_azur_cene'),
    },
    {
      key: '2',
      title: 'Sprat',
      align: 'center',
      dataIndex: 'sprat',
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
      key: '3',
      title: 'Broj soba',
      align: 'center',
      dataIndex: 'broj_soba',
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
      key: '4',
      title: 'Orijentacija',
      align: 'center',
      dataIndex: 'orijentisanost',
      filters: [
        {
          text: 'Jug',
          value: 'Jug',
        },
        {
          text: 'Sever',
          value: 'Sever',
        },
      ],
      onFilter: (value, record) => record.orijentisanost.indexOf(value) === 0,
    },
    {
      key: '5',
      title: 'Cena Kvadrata',
      align: 'center',
      dataIndex: 'cena_kvadrata',
      filters: [
        {
          text: '1500-1600',
          value: [1500, 1600],
        },
        {
          text: '1600-1700',
          value: [1600, 1700],
        },
        {
          text: '1700-1800',
          value: [1700, 1800],
        },
        {
          text: '1800-1900',
          value: [1800, 1900],
        },
        {
          text: '1900-2000',
          value: [1900, 2000],
        },
      ],
      onFilter: (value, record) => record.cena_kvadrata >= value[0] && record.cena_kvadrata <= value[1],
      sorter: (a, b) => a.cena_kvadrata - b.cena_kvadrata,
    },

    {
      key: '6',
      title: 'Izmeni',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              showModal(true);
              setSelectedApartments(record);
            }}
          >
            Izmeni
          </Button>
        </div>
      ),
    },
    {
      key: '7',
      title: 'Obriši',
      align: 'center',
      render: (text, record) => (
        <>
          <Popconfirm
            title="Da li ste sigurni da želite da izbrišete cenu stana?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deletePrice(record.id_azur_cene)}
          >
            <Button type="danger">Obriši</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    listOfPrice();
  }, []);

  return (
    <>
      <div>
        <div style={{ margin: 20 }}>
          <Button
            type="primary"
            onClick={() => {
              setIsCreatePriceVisible(true);
            }}
          >
            Kreiraj novu cenu
          </Button>
        </div>
        <Table dataSource={data} columns={columns} pagination={{ pageSize: [5] }} rowKey="id_azur_cene" />
        <Modal
          title="Izmeni cenu kvadrata"
          visible={isEditPriceVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <CeneKvadrata
            edit
            propscenakvadrata={selectedApartments}
            listOfPrice={listOfPrice}
            closeModal={() => showModal(false)}
          />
        </Modal>
        <Modal
          destroyOnClose={true}
          title="Kreiranje nove cene kvadrata"
          visible={isCreatePriceVisible}
          onOk={handleOk}
          onCancel={() => setIsCreatePriceVisible(false)}
          footer={null}
        >
          <CeneKvadrata
            propscenakvadrata={selectedApartments}
            listOfPrice={listOfPrice}
            closeModal={() => setIsCreatePriceVisible(false)}
          />
        </Modal>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loaderPage && <Spin tip="Loading page" size="large" />}
        </div>
      </div>
    </>
  );
}

export default ApartmentsPriceReview;
