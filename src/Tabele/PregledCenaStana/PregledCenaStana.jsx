import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Popconfirm } from 'antd';
import { api } from 'api/api';
import IzmenaCeneKvadrata from 'Form/IzmenaCeneKvadrata/IzmenaCeneKvadrata';

function ApartmentsPriceReview() {
  const [selectedPlace, setSelectedPlace] = useState('');
  const [isEditPlaceVisible, setIsEditPlaceVisible] = useState(false);
  const [isCreatePlaceVisible, setIsCreatePlaceVisible] = useState(false);
  ///modal za dodaj
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = id => {
    setIsEditPlaceVisible(id);
  };

  const handleOk = () => {
    setIsEditPlaceVisible(false);
  };

  const handleCancel = () => {
    setIsEditPlaceVisible(false);
  };

  //state za API
  const [data, setData] = useState([]);
  /// lista (tabela) cene kvadrata
  const listOfPrice = () => {
    api.get(`/stanovi/listing-cena-kvadrata`).then(res => {
      setData(res.data);
    });
  };
  ////brisanje cene kvadrata
  const deletePrice = id_azur_cene => {
    api.delete(`/stanovi/izbrisi-cenu-kvadrata/${id_azur_cene}`).then(res => {
      listOfPrice();
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
          <Button
            type="primary"
            onClick={() => {
              showModal(true);
              setSelectedPlace(record);
            }}
          >
            Izmeni
          </Button>
        </div>
      ),
    },
    {
      key: '7',
      title: 'Obrisi',
      render: (text, record) => (
        <>
          <Popconfirm
            title="Da li ste sigurni da zelite da izbrisete cenu stana?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deletePrice(record.id_azur_cene)}
          >
            <Button type="danger">Obrisi</Button>
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
              setIsCreatePlaceVisible(true);
            }}
          >
            Kreiraj Novu Cenu
          </Button>
        </div>
        <Table dataSource={data} columns={columns} pagination={{ pageSize: [5] }} rowKey="id"></Table>
        <Modal title="Izmeni" visible={isEditPlaceVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <IzmenaCeneKvadrata
            edit
            propscenakvadrata={selectedPlace}
            listOfPrice={listOfPrice}
            closeModal={() => showModal(false)}
          />
        </Modal>
        <Modal
          title="Kreiranje Nove Cene"
          visible={isCreatePlaceVisible}
          onOk={handleOk}
          onCancel={() => setIsCreatePlaceVisible(false)}
          footer={null}
        >
          <IzmenaCeneKvadrata
            propscenakvadrata={selectedPlace}
            listOfPrice={listOfPrice}
            closeModal={() => setIsCreatePlaceVisible(false)}
          />
        </Modal>
      </div>
    </>
  );
}

export default ApartmentsPriceReview;
