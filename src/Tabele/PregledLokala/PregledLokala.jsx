import React, { useState } from 'react';
import { Button, Table, Modal, Input, Space, Popconfirm, Tag } from 'antd';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Lokali from 'Modal/Lokali/Lokali';

function PregledLokala() {
  const [isCreatePlaceVisible, setIsCreatePlaceVisible] = useState(false);
  const [isEditPlaceVisible, setIsEditPlaceVisible] = useState(false);

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

  // ////hooks za search u tabeli
  // const [searchText, setSearchText] = useState(); ////proveri ovde state na drugim tabelama ('')
  // const [searchedColumn, setSearchedColumn] = useState();

  // ////funkcionanost za search u tabeli
  // const handleSearch = (selectedKeys, confirm, dataIndex) => {
  //   confirm();
  //   setSearchText(selectedKeys[0]);
  //   setSearchedColumn(dataIndex);
  // };

  // const handleReset = clearFilters => {
  //   clearFilters();
  // };

  // let searchInput;

  // const getColumnSearchProps = dataIndex => ({
  //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
  //     <div style={{ padding: 8 }}>
  //       <Input
  //         ref={node => {
  //           searchInput = node;
  //         }}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{ marginBottom: 8, display: 'block' }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{ width: 100 }}
  //         >
  //           Search
  //         </Button>
  //         <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 100 }}>
  //           Reset
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  //   onFilter: (value, record) =>
  //     record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
  //   onFilterDropdownVisibleChange: visible => {
  //     if (visible) {
  //       setTimeout(() => searchInput.select(), 100);
  //     }
  //   },
  //   render: text =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ''}
  //       />
  //     ) : (
  //       text
  //     ),
  // });

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id_lokala',
    },
    {
      key: '2',
      title: 'Lamela',
      dataIndex: 'lamela',
    },
    {
      key: '3',
      title: 'Adresa',
      dataIndex: 'adresa_lokala',
    },
    {
      key: '4',
      title: 'Kvadratura',
      dataIndex: 'kvadratura',
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
      title: 'Broj soba',
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
      key: '6',
      title: 'Orijentisanost',
      dataIndex: 'orijentisanost',
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
      key: '7',
      title: 'Cena',
      dataIndex: 'cena_lokala',
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
      ],
      onFilter: (value, record) => record.cena_lokala >= value[0] && record.cena_lokala <= value[1],
      sorter: (a, b) => a.cena_lokala - b.cena_lokala,
    },
    {
      key: '8',
      title: 'Status',
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
      key: '9',
      title: 'Ponude',
      render: (text, record) => (
        <Link>
          <Button style={{ color: '#092b00', border: '1px solid green' }}>Ponude</Button>
        </Link>
      ),
    },
    {
      key: '10',
      title: 'Detalji',
      render: (text, record) => (
        <Link>
          <Button style={{ color: 'blue', border: '1px solid black' }}>Detalji</Button>
        </Link>
      ),
    },
    {
      key: '11',
      title: 'Izmeni',
      render: (text, record) => (
        <div>
          <Button type="primary">Izmeni</Button>
        </div>
      ),
    },
    {
      key: '12',
      title: 'Obriši',
      render: (text, record) => (
        <>
          <Popconfirm
            title="Da li ste sigurni da želite da izbrišete lokal?"
            placement="left"
            //   onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            //   onConfirm={() => deleteApartment(record.id_stana)}
          >
            <Button type="danger">Obriši</Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <div>
      <div style={{ margin: 20 }}>
        <Button
          //   disabled={activeRole === 'Prodavac'}
          type="primary"
          onClick={() => {
            setIsCreatePlaceVisible(true);
          }}
        >
          Dodaj novi lokal
        </Button>
      </div>
      <Table columns={columns} pagination={{ pageSize: [5] }} rowKey="id_lokala"></Table>
      {/* <Modal title="Izmeni" visible={isEditPlaceVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Lokali edit propsstan={selectedPlace} getData={getData} closeModal={() => showModal(false)} />
      </Modal> */}
      <Modal
        destroyOnClose={true}
        title="Kreiraj novi lokal"
        visible={isCreatePlaceVisible}
        onOk={handleOk}
        onCancel={() => setIsCreatePlaceVisible(false)}
        footer={null}
      >
        <Lokali closeModal={() => setIsCreatePlaceVisible(false)} />
      </Modal>
    </div>
  );
}

export default PregledLokala;
