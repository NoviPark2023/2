import React, { useState } from 'react';
import { Table, Button, Modal, Popconfirm, Tag } from 'antd';
import Ponuda from 'Modal/Ponuda/Ponuda';
import { api } from 'api/api';
import Klijenta from 'Modal/Klijenta/Klijenta';

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

  const columns = [
    {
      key: '1',
      title: 'Lamela stana',
      align: 'center',
      dataIndex: 'lamela_stana',
    },
    // {
    //   key: '2',
    //   title: ' Kupac',
    //   align: 'center',
    //   dataIndex: 'ime_prezime', odraditi modal ovo polje se ne rednederuje kod izmene modala

    // },
    {
      key: '3',
      title: 'Cena ponude stana',
      align: 'center',
      dataIndex: 'cena_stana_za_kupca',
      sorter: (a, b) => a.cena_stana_za_kupca - b.cena_stana_za_kupca,
    },
    {
      key: '4',
      title: 'Cena stana',
      align: 'center',
      dataIndex: 'cena_stana',
    },

    {
      key: '5',
      title: 'Broj ugovora',
      align: 'center',
      dataIndex: 'broj_ugovora',
    },
    {
      key: '6',
      title: 'Datum',
      align: 'center',
      dataIndex: 'datum_ugovora',
    },
    {
      key: '7',
      title: 'Nacin plaćanja',
      align: 'center',
      dataIndex: 'nacin_placanja',
      // render: (text, record) => <span>{record.nacin_placanja}</span>,
    },
    {
      key: '8',
      title: 'Status',
      align: 'center',
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
    },
    {
      key: '9',
      title: 'Ugovor',
      align: 'center',
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
      align: 'center',
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
      align: 'center',
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
      <Table
        columns={columns}
        dataSource={props.tableItems}
        pagination={false}
        scroll={{ y: 'calc(100vh - 265px)' }}
        rowKey={'id_ponude'}
      />

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
