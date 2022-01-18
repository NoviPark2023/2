import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'antd';
import KreiranjeNoveCene from 'Form/KreiranjeNoveCene/KreiranjeNoveCene';
import { api } from 'api/api';

function PregledCenaStana() {
  ///modal za dodaj
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = isShow => {
    setIsModalVisible(isShow);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //state za API
  const [data, setData] = useState([]);

  const listaCeneKvadrata = () => {
    api.get(`/stanovi/listing-cena-kvadrata`).then(res => {
      setData(res.data);
    });
  };

  const columns = [
    {
      key: '1',
      title: 'ID Cene',
      dataIndex: 'id_azur_cene',
    },
    {
      key: '2',
      title: 'Sprat',
      dataIndex: 'sprat',
    },
    {
      key: '3',
      title: 'Broj Soba',
      dataIndex: 'broj_soba',
    },
    {
      key: '4',
      title: 'Orijentacija',
      dataIndex: 'orijentisanost',
    },
    {
      key: '5',
      title: 'Cena Kvadrata',
      dataIndex: 'cena_kvadrata',
    },

    {
      key: '6',
      title: 'Izmeni',
      render: (text, record) => (
        <div>
          <Button type="primary">Izmeni</Button>
        </div>
      ),
    },

    {
      title: 'Akcija',
      key: '7',
      render: (text, record) => (
        <>
          <Button style={{ color: 'black', borderColor: 'black', backgroundColor: 'lime' }}>Potvrdi Novu Cenu</Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    listaCeneKvadrata();
  }, []);
  return (
    <>
      <div>
        <div style={{ margin: 20 }}>
          <Button type="primary" onClick={() => showModal(true)}>
            Kreiraj Novu Cenu
          </Button>
        </div>
        <Table dataSource={data} columns={columns} pagination={{ pageSize: [5] }} rowKey="id"></Table>
        <Modal
          title="Kreiranje Nove Cene"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <KreiranjeNoveCene closeModal={() => showModal(false)} />
        </Modal>
      </div>
    </>
  );
}

export default PregledCenaStana;
