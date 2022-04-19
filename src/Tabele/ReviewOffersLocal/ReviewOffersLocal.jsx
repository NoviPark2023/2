/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Popconfirm, Tag, Card, Descriptions } from 'antd';
import { useLocation } from 'react-router';
import { authService } from 'auth/auth.service';
import { Spin } from 'antd';
import { api } from 'api/api';
import OffersLocal from 'Modal/OffersLocal/OffersLocal';
import styles from './ReviewOffersLocal.module.css';
import Local from 'Modal/Local/Local';
import Scroll from 'components/Scroll/Scroll';

function OverviewOfferLocal() {
  const activeRole = authService.getRole();
  const browserLocation = useLocation();
  const queryParams = new URLSearchParams(browserLocation.search);
  const id = queryParams.get('id'); ///id lokala
  const [setPonude, setSelectedOffers] = useState('');
  const [offers, setOffers] = useState(null);

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

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [data, setData] = useState(null);

  //detalji lokala
  const fetchData = id_lokala => {
    api.get(`/lokali/detalji-lokala/${id_lokala}/`).then(response => {
      setData(response.data);
    });
  };

  const onUpdate = () => {
    setEditModal(false);

    if (id) {
      fetchData(id);
    }
  };

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

  ////ugovor
  const Contract = id_ponude_lokala => {
    api.get(`/ponude-lokali/preuzmi-ugovor-lokala/${id_ponude_lokala}/`).then(res => {
      const link = document.createElement('a');
      link.href = res.data;
      link.download = 'Ugovor';
      link.click();
    });
  };

  const columns = [
    {
      key: '2',
      title: 'Kupac',
      align: 'center',
      dataIndex: 'ime_kupca_lokala',
    },
    {
      key: '3',
      title: 'Lokal',
      align: 'center',
      dataIndex: 'lokali',
    },
    {
      key: '4',
      title: 'Lamela lokala',
      align: 'center',
      dataIndex: 'lamela_lokala',
    },
    {
      key: '5',
      title: 'Cena ponude lokala',
      align: 'center',
      dataIndex: 'cena_lokala_za_kupca',
      sorter: (a, b) => a.cena_lokala_za_kupca - b.cena_lokala_za_kupca,
    },
    {
      key: '6',
      title: 'Cena lokala',
      align: 'center',
      dataIndex: 'cena_lokala',
      sorter: (a, b) => a.cena_lokala - b.cena_lokala,
    },

    {
      key: '7',
      title: 'Broj ugovora',
      align: 'center',
      dataIndex: 'broj_ugovora_lokala',
    },
    {
      key: '8',
      title: 'Datum',
      align: 'center',
      dataIndex: 'datum_ugovora_lokala',
    },
    {
      key: '9',
      title: 'Nacin plaćanja',
      align: 'center',
      dataIndex: 'nacin_placanja_lokala',
      render: (text, record) => <span>{record.nacin_placanja_lokala}</span>,
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
              (record.status_ponude_lokala === 'rezervisan' || record.status_ponude_lokala === 'kupljen') &&
              activeRole === 'Prodavac'
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
                (record.status_ponude_lokala === 'rezervisan' || record.status_ponude_lokala === 'kupljen') &&
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
    if (id) {
      fetchData(id);
    }
  }, []);
  if (data) {
    return (
      <>
        <Scroll>
          <div className={styles['flat-details']}>
            <Card
              className={styles.textLabel}
              title="Detalji Lokala"
              extra={
                <Button
                  disabled={activeRole === 'Prodavac'}
                  type="primary"
                  onClick={() => {
                    setEditModal(true);
                  }}
                >
                  Izmeni
                </Button>
              }
              style={{ width: '50%', margin: '15px' }}
            >
              <Descriptions layout="horizontal">
                <Descriptions.Item label="Lamela">{data.lamela_lokala}</Descriptions.Item>
                <Descriptions.Item label="Adresa lokala">{data.adresa_lokala}</Descriptions.Item>
                <Descriptions.Item label="Broj prostorija">{data.broj_prostorija}</Descriptions.Item>
                <Descriptions.Item label="Cena lokala">{data.cena_lokala}</Descriptions.Item>
                <Descriptions.Item label="Kvadratura">{data.kvadratura_lokala}</Descriptions.Item>
                <Descriptions.Item label="Orijentisanost">{data.orijentisanost_lokala}</Descriptions.Item>
                <Descriptions.Item label="Status prodaje">{data.status_prodaje_lokala}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Modal
              title="Izmeni"
              visible={showEditModal}
              onOk={onUpdate}
              onCancel={() => setEditModal(false)}
              footer={null}
            >
              <Local getData={onUpdate} edit propslokala={data} closeModal={() => setEditModal(false)} />
            </Modal>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loaderPage && <Spin tip="Loading page" size="large" />}
          </div>
          <div style={{ margin: 20 }}>
            <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
              Dodaj novu ponudu
            </Button>
          </div>
          <Table columns={columns} dataSource={setPonude} pagination={false} rowKey="id_ponude"></Table>

          <Modal
            title="Izmeni"
            visible={isModalVisible}
            onOk={handleOkModal}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            {!!offers && (
              <OffersLocal
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
              <OffersLocal
                propsponuda={{ stan: id }}
                getData={getListOffers}
                closeModal={() => setIsCreateModalVisible(false)}
              />
            )}
          </Modal>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loaderPage && <Spin tip="Loading page" size="large"></Spin>}
          </div>
        </Scroll>
      </>
    );
  }
  return null;
}

export default OverviewOfferLocal;
