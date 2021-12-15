/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Popconfirm, Input, Space } from 'antd';
import IzmenaPonuda from 'Form/IzmenaPonuda/IzmenaPonuda';
import { useLocation } from 'react-router';
import { api } from 'api/api';
import IzmeneKlijenta from 'Form/IzmeneKlijenta/IzmeneKlijenta';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const PAYMENT_TYPE_LABELS = {
  ceo_iznos: 'CEO IZNOS',
  kredit: 'KREDIT',
  na_rate: 'NA RATE',
  ucesce: 'UCESCE',
};

const PregledPonuda = () => {
  //////history router
  const browserLocation = useLocation();
  const queryParams = new URLSearchParams(browserLocation.search);
  const id = queryParams.get('id'); ///id stana

  const price = queryParams.get('price'); ///cena stana

  const [setPonude, setSelectedPonude] = useState('');
  const [isClientVisible, setIsClientVisible] = useState(false);
  const [selectedBuyer] = useState(null);
  const [ponuda, setPonuda] = useState(null);

  ///ponude stana
  const getListaPonuda = () => {
    api.get(`/ponude/lista-ponuda-stana/${id}/`).then(res => {
      setSelectedPonude(res.data.results);
    });
  };
  ////api za brisanje ponude
  const deletePonuda = id_ponude => {
    api.delete(`/ponude/obrisi-ponudu/${id_ponude}/`).then(res => {
      getListaPonuda();
    });
  };

  // modal dodaj
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  ////modal izmeni
  const [isModalVisible, setIsModalVisible] = useState(false);
  ////popconfirm delete button
  const [confirmLoading, setVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);

  // const previewBuyer = id => {
  //   api.get(`/kupci/detalji-kupca/${id}/`).then(response => {
  //     setSelectedBuyer(response.data);
  //     setIsClientVisible(true);
  //   });
  // };

  // const showPopconfirm = () => {
  //   setVisible(true);
  // };

  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setVisible(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOkModal = () => {
    setIsModalVisible(false);
  };

  // const handleCancelModal = () => {
  //   setIsModalVisible(false);
  // };
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
      dataIndex: 'kupac',
      // render: (text, record) => <a onClick={() => previewBuyer(record.kupac)}>{record.kupac}</a>,
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
      title: 'Cena ponude stana',
      dataIndex: 'cena_stana_za_kupca',
      ...getColumnSearchProps('cena_stana_za_kupca'),
    },
    {
      key: '5',
      title: 'Cena stana',
      dataIndex: 'cena_stana',
      ...getColumnSearchProps('cena_stana'),
      render: () => <span>{price}</span>,
    },

    {
      key: '6',
      title: 'Broj ugovora',
      dataIndex: 'broj_ugovora',
      ...getColumnSearchProps('broj_ugovora'),
    },
    {
      key: '7',
      title: 'Datum ugovora',
      dataIndex: 'datum_ugovora',
      ...getColumnSearchProps('datum_ugovora'),
    },
    {
      key: '8',
      title: 'Nacin placanja',
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
      sorter: (a, b) => a.nacin_placanja - b.nacin_placanja,
    },
    {
      key: '9',
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
      key: '10',
      title: 'Napomena',
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              showModal(true);
              setPonuda(record);
            }}
          >
            Napomena
          </Button>
        </>
      ),
    },
    {
      key: '11',
      title: 'Izmeni',
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              showModal(true);
              setPonuda(record);
            }}
          >
            Izmeni
          </Button>
        </>
      ),
    },
    {
      key: '12',
      title: 'Obrisi',
      render: (text, record) => (
        <>
          <Popconfirm
            title="Da li ste sigurni da zelite da izbrisete ponudu?"
            placement="left"
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deletePonuda(record.id_ponude)}
          >
            <Button type="danger">Obrisi</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    getListaPonuda();
  }, []);

  return (
    <div>
      <div style={{ margin: 20 }}>
        <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
          Dodaj Novu Ponudu
        </Button>
      </div>
      <Table columns={columns} dataSource={setPonude} pagination={{ pageSize: [5] }}></Table>

      <Modal
        title="Pregled Klijenta"
        visible={isClientVisible && selectedBuyer}
        onCancel={() => setIsClientVisible(false)}
        footer={null}
      >
        <IzmeneKlijenta preview propsklijenta={selectedBuyer} closeModal={() => setIsClientVisible(false)} />
      </Modal>

      <Modal
        title="Izmeni"
        visible={isModalVisible}
        onOk={handleOkModal}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {!!ponuda && (
          <IzmenaPonuda
            edit
            propsponuda={ponuda}
            getData={getListaPonuda}
            closeModal={() => setIsModalVisible(false)}
          />
        )}
      </Modal>

      <Modal
        title="Dodaj ponudu"
        visible={isCreateModalVisible}
        onOk={handleOkModal}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        {isCreateModalVisible && (
          <IzmenaPonuda
            propsponuda={{ stan: id }}
            getData={getListaPonuda}
            closeModal={() => setIsCreateModalVisible(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default PregledPonuda;
