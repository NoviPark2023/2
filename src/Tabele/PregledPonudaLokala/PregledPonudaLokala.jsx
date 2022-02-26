/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Popconfirm, Input, Space, Tag } from 'antd';
import { useLocation } from 'react-router';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { authService } from 'auth/auth.service';
import { Spin } from 'antd';
import { api } from 'api/api';
import PonudaLokala from 'Modal/PonudaLokala/PonudaLokala';

function PregledPonudaLokala() {
  const activeRole = authService.getRole();
  const browserLocation = useLocation();
  const queryParams = new URLSearchParams(browserLocation.search);
  const id = queryParams.get('id'); ///id lokala
  const [setPonude, setSelectedOffers] = useState('');
  const [offers, setOffers] = useState(null);

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  ///ponude lokala
  const getListOffers = (paramId = id) => {
    setLoaderPage(true);
    api
      .get(`/ponude-lokali/lista-ponuda-lokala/${paramId}/`)
      .then(res => {
        setSelectedOffers(res.data.results);
      })
      .finally(() => {
        setLoaderPage(false);
      });
  };

  ////api za brisanje ponude lokala
  const deleteOffers = id_ponude_lokala => {
    api.delete(`/ponude-lokali/obrisi-ponudu-lokala/${id_ponude_lokala}/`).then(res => {
      getListOffers();
    });
  };

  // modal dodaj lokal
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  ////modal izmeni lokal
  const [isModalVisible, setIsModalVisible] = useState(false);

  ////popconfirm delete button
  const [confirmLoading, setVisible] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOkModal = () => {
    setIsModalVisible(false);
  };

  ////ugovor
  const Contract = id_ponude_lokala => {
    api.get(`/ponude-lokali/preuzmi-ugovor-lokala/${id_ponude_lokala}/`).then(res => {
      const link = document.createElement('a');
      link.href = res.data;
      link.download = 'Ugovor';
      link.click();
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
      title: 'ID ponude',
      align: 'center',
      dataIndex: 'id_ponude_lokala',
      ...getColumnSearchProps('id_ponude_lokala'),
    },
    {
      key: '2',
      title: 'Kupac',
      align: 'center',
      dataIndex: 'ime_kupca_lokala',
      ...getColumnSearchProps('ime_kupca_lokala'),
    },
    {
      key: '3',
      title: 'Lokal',
      align: 'center',
      dataIndex: 'lokali',
      ...getColumnSearchProps('lokali'),
    },
    {
      key: '4',
      title: 'Lamela lokala',
      align: 'center',
      dataIndex: 'lamela_lokala',
      ...getColumnSearchProps('lamela_lokala'),
    },
    {
      key: '5',
      title: 'Cena ponude lokala',
      align: 'center',
      dataIndex: 'cena_lokala_za_kupca',
      ...getColumnSearchProps('cena_lokala_za_kupca'),
    },
    {
      key: '6',
      title: 'Cena lokala',
      align: 'center',
      dataIndex: 'cena_lokala',
      ...getColumnSearchProps('cena_lokala'),
    },

    {
      key: '7',
      title: 'Broj ugovora',
      align: 'center',
      dataIndex: 'broj_ugovora_lokala',
      ...getColumnSearchProps('broj_ugovora_lokala'),
    },
    {
      key: '8',
      title: 'Datum',
      align: 'center',
      dataIndex: 'datum_ugovora_lokala',
      ...getColumnSearchProps('datum_ugovora_lokala'),
    },
    {
      key: '9',
      title: 'Nacin plaćanja',
      align: 'center',
      dataIndex: 'nacin_placanja_lokala',
      render: (text, record) => <span>{record.nacin_placanja_lokala}</span>,
      filters: [
        {
          text: 'Ceo iznos',
          value: 'Ceo iznos',
        },
        {
          text: 'Kredit',
          value: 'Kredit',
        },
        {
          text: 'Na rate',
          value: 'Na rate',
        },
        {
          text: 'Ucešće',
          value: 'Ucesce',
        },
      ],
      onFilter: (value, record) => record.nacin_placanja_lokala.indexOf(value) === 0,
    },
    {
      key: '10',
      title: 'Status',
      align: 'center',
      dataIndex: 'status_ponude_lokala',
      render(text) {
        let color = text === 'potencijalan' ? 'geekblue' : 'green';
        if (text === 'potencijalan') {
          color = 'green';
        } else if (text === 'rezervisan') {
          color = 'blue';
        } else if (text === 'kupljen') {
          color = 'red';
        }
        return (
          <Tag color={color} key={text} style={{ width: '100%', textAlign: 'center' }}>
            {text.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        {
          text: 'potencijalan',
          value: ['potencijalan'],
        },
        {
          text: 'rezervisan',
          value: ['rezervisan'],
        },
        {
          text: 'kupljen',
          value: ['kupljen'],
        },
      ],
      onFilter: (value, record) => record.status_ponude_lokala.indexOf(value) === 0,
    },
    {
      key: '11',
      title: 'Ugovor',
      align: 'center',
      render: (text, record) => (
        <>
          <Button
            disabled={record.status_ponude_lokala === 'potencijalan'}
            onClick={() => {
              Contract(record.id_ponude_lokala);
            }}
          >
            Ugovor
          </Button>
        </>
      ),
    },
    {
      key: '12',
      title: 'Izmeni',
      align: 'center',
      render: (text, record) => (
        <>
          <Button
            disabled={
              (record.status_ponude === 'rezervisan' || record.status_ponude === 'kupljen') && activeRole === 'Prodavac'
            }
            type="primary"
            onClick={() => {
              showModal(true);
              setOffers(record);
            }}
          >
            Izmeni
          </Button>
        </>
      ),
    },
    {
      key: '13',
      title: 'Obriši',
      align: 'center',
      render: (text, record) => (
        <>
          <Popconfirm
            disabled={
              (record.status_ponude === 'rezervisan' || record.status_ponude === 'kupljen') && activeRole === 'Prodavac'
            }
            title="Da li ste sigurni da želite da izbrišete ponudu?"
            placement="left"
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteOffers(record.id_ponude_lokala)}
          >
            <Button
              disabled={
                (record.status_ponude === 'rezervisan' || record.status_ponude === 'kupljen') &&
                activeRole === 'Prodavac'
              }
              type="danger"
            >
              Obriši
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    getListOffers();
  }, []);

  return (
    <div>
      <div style={{ margin: 20 }}>
        <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
          Dodaj novu ponudu
        </Button>
      </div>
      <Table columns={columns} dataSource={setPonude} pagination={{ pageSize: [5] }} rowKey="id_ponude_lokala"></Table>

      <Modal
        title="Izmeni ponudu"
        visible={isModalVisible}
        onOk={handleOkModal}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {!!offers && (
          <PonudaLokala
            edit
            onEdit={getListOffers}
            idKlijenta={offers.id_kupca}
            propsponudalokala={offers}
            getData={getListOffers}
            closeModal={() => setIsModalVisible(false)}
          />
        )}
      </Modal>

      <Modal
        destroyOnClose={true}
        title="Dodaj ponudu lokala"
        visible={isCreateModalVisible}
        onOk={handleOkModal}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        {isCreateModalVisible && (
          <PonudaLokala
            propsponudalokala={{ lokali: id }}
            getData={getListOffers}
            closeModal={() => setIsCreateModalVisible(false)}
          />
        )}
      </Modal>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large"></Spin>}
      </div>
    </div>
  );
}

export default PregledPonudaLokala;
