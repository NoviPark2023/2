import React, { useState } from 'react';
import { Table, Button, Modal, Popconfirm, Input, Space, Tag } from 'antd';
import Ponuda from 'Modal/Ponuda/Ponuda';
import { api } from 'api/api';
import Klijenta from 'Modal/Klijenta/Klijenta';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const PAYMENT_TYPE_LABELS = {
  ceo_iznos: 'CEO IZNOS',
  kredit: 'KREDIT',
  na_rate: 'NA RATE',
  ucesce: 'UCESCE',
};

const ClientOffersReview = props => {
  const [isClientVisible, setIsClientVisible] = useState(false);
  const [selectedBuyer] = useState(null);
  const [offers, setOffers] = useState(null);

  //api za brisanje ponude
  const deleteOffers = id_ponude => {
    api.delete(`/ponude/obrisi-ponudu/${id_ponude}/`).then(res => {
      props.updateFunction(props.idKlijenta);
    });
  };

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

  ////ugovor
  const Contract = id_ponude => {
    api.get(`/ponude/preuzmi-ugovor/${id_ponude}/`).then(res => {
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
      dataIndex: 'id_ponude',
      ...getColumnSearchProps('id_ponude'),
    },

    {
      key: '2',
      title: ' Adresa stana',
      dataIndex: 'adresa_stana',
      ...getColumnSearchProps('adresa_stana'),
    },
    {
      key: '3',
      title: 'Cena ponude stana',
      dataIndex: 'cena_stana_za_kupca',
      ...getColumnSearchProps('cena_stana_za_kupca'),
    },
    {
      key: '4',
      title: 'Cena stana',
      dataIndex: 'cena_stana',
      ...getColumnSearchProps('cena_stana'),
    },

    {
      key: '5',
      title: 'Broj ugovora',
      dataIndex: 'broj_ugovora',
      ...getColumnSearchProps('broj_ugovora'),
    },
    {
      key: '6',
      title: 'Datum ugovora',
      dataIndex: 'datum_ugovora',
      ...getColumnSearchProps('datum_ugovora'),
    },
    {
      key: '7',
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
      sorter: (a, b) => a.nacin_placanja - b.nacin_placanja,
    },
    {
      key: '8',
      title: 'Status',
      dataIndex: 'status_ponude',
      render(text) {
        let color = text === 'dostupan' ? 'geekblue' : 'green';
        if (text === 'dostupan') {
          color = 'green';
        } else if (text === 'rezervisan') {
          color = 'blue';
        } else if (text === 'kupljen') {
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
      key: '9',
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
      key: '10',
      title: 'Izmeni',
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setOffers({ ...record, stan: record.stan_id });
              showModal(true);
            }}
          >
            Izmeni
          </Button>
        </>
      ),
    },
    {
      key: '11',
      title: 'Obriši',
      render: (text, record) => (
        <>
          <Popconfirm
            title="Da li ste sigurni da želite da izbrišete ponudu?"
            placement="left"
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteOffers(record.id_ponude)}
          >
            <Button type="danger">Obriši</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={props.tableItems} pagination={{ pageSize: [5] }}></Table>

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
            idKlijenta={props.idKlijenta}
            onEdit={props.updateFunction}
            propsponuda={offers}
            closeModal={() => setIsModalVisible(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default ClientOffersReview;
