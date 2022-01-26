/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Popconfirm, Input, Space } from 'antd';
import Ponuda from 'Modal/Ponuda/Ponuda';
import { useLocation } from 'react-router';
import { api } from 'api/api';
import Klijenta from 'Modal/Klijenta/Klijenta';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { authService } from 'auth/auth.service';

const PAYMENT_TYPE_LABELS = {
  ceo_iznos: 'CEO IZNOS',
  kredit: 'KREDIT',
  na_rate: 'NA RATE',
  ucesce: 'UCESCE',
};

const OffersReview = () => {
  const activeRole = authService.getRole();

  //////history router
  const browserLocation = useLocation();
  const queryParams = new URLSearchParams(browserLocation.search);
  const id = queryParams.get('id'); ///id stana
  // const price = queryParams.get('price'); ///cena stana
  const [setPonude, setSelectedOffers] = useState('');
  const [isClientVisible, setIsClientVisible] = useState(false);
  const [selectedBuyer] = useState(null);
  const [offers, setOffers] = useState(null);

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  ///ponude stana
  const getListOffers = (paramId = id) => {
    setLoaderPage(true);
    api
      .get(`/ponude/lista-ponuda-stana/${paramId}/`)
      .then(res => {
        setSelectedOffers(res.data.results);
      })
      .finally(() => {
        setLoaderPage(false);
      });
  };
  ////api za brisanje ponude
  const deleteOffers = id_ponude => {
    api.delete(`/ponude/obrisi-ponudu/${id_ponude}/`).then(res => {
      getListOffers();
    });
  };

  ////ugovor
  const Contract = id_ponude => {
    api.get(`/ponude/preuzmi-ugovor/${id_ponude}/`).then(res => {
      const link = document.createElement('a');
      link.href = res.data;
      link.download = 'Ugovor';
      link.click();
    });
  };

  // modal dodaj
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  ////modal izmeni
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
      dataIndex: 'id_ponude',
      ...getColumnSearchProps('id_ponude'),
    },
    {
      key: '2',
      title: 'Kupac',
      dataIndex: 'ime_kupca',
      ...getColumnSearchProps('kupac'),
    },
    {
      key: '3',
      title: 'Stan',
      dataIndex: 'stan',
      ...getColumnSearchProps('stan'),
    },
    {
      key: '4',
      title: 'Lamela stana',
      dataIndex: 'lamela_stana',
      ...getColumnSearchProps('lamela_stana'),
    },
    {
      key: '5',
      title: 'Cena ponude stana',
      dataIndex: 'cena_stana_za_kupca',
      ...getColumnSearchProps('cena_stana_za_kupca'),
    },
    {
      key: '6',
      title: 'Cena stana',
      dataIndex: 'cena_stana',
      ...getColumnSearchProps('cena_stana'),
      // render: () => <span>{price}</span>,
    },

    {
      key: '7',
      title: 'Broj ugovora',
      dataIndex: 'broj_ugovora',
      ...getColumnSearchProps('broj_ugovora'),
    },
    {
      key: '8',
      title: 'Datum ugovora',
      dataIndex: 'datum_ugovora',
      ...getColumnSearchProps('datum_ugovora'),
    },
    {
      key: '9',
      title: 'Nacin plaćanja',
      dataIndex: 'nacin_placanja',
      render: (text, record) => <span>{PAYMENT_TYPE_LABELS[record.nacin_placanja]}</span>,
      filters: [
        {
          text: 'CEO IZNOS',
          value: 'CEO IZNOS',
        },
        {
          text: 'KREDIT',
          value: 'KREDIT',
        },
        {
          text: 'NA RATE',
          value: 'NA RATE',
        },
        {
          text: 'UCESCE',
          value: 'UCESCE',
        },
      ],
      onFilter: (value, record) => record.nacin_placanja.indexOf(value) === 0,
    },
    {
      key: '10',
      title: 'Status',
      dataIndex: 'status_ponude',
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
      onFilter: (value, record) => record.status_ponude.indexOf(value) === 0,
    },
    {
      key: '11',
      title: 'Ugovor',
      render: (text, record) => (
        <>
          <Button
            disabled={record.status_ponude === 'potencijalan'}
            onClick={() => {
              Contract(record.id_ponude);
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
            onConfirm={() => deleteOffers(record.id_ponude)}
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
      <Table columns={columns} dataSource={setPonude} pagination={{ pageSize: [5] }} rowKey="id_ponude"></Table>

      <Modal
        title="Pregled Klijenta"
        visible={isClientVisible && selectedBuyer}
        onCancel={() => setIsClientVisible(false)}
        footer={null}
      >
        <Klijenta preview propsklijenta={selectedBuyer} closeModal={() => setIsClientVisible(false)} />
      </Modal>

      <Modal
        title="Izmeni"
        visible={isModalVisible}
        onOk={handleOkModal}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {!!offers && (
          <Ponuda
            edit
            onEdit={getListOffers}
            idKlijenta={offers.id_kupca}
            propsponuda={offers}
            getData={getListOffers}
            closeModal={() => setIsModalVisible(false)}
          />
        )}
      </Modal>

      <Modal
        destroyOnClose={true}
        title="Dodaj ponudu"
        visible={isCreateModalVisible}
        onOk={handleOkModal}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        {isCreateModalVisible && (
          <Ponuda
            propsponuda={{ stan: id }}
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
};

export default OffersReview;
