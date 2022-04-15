/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Popconfirm, Tag, Card, Descriptions } from 'antd';
import Offers from 'Modal/Offers/Offers';
import { useLocation } from 'react-router';
import { api } from 'api/api';
import { Spin } from 'antd';
import { authService } from 'auth/auth.service';
import styles from './ReviewOffters.module.css';
import Apartment from 'Modal/Apartment/Apartment';
import Scroll from 'components/Scroll/Scroll';

const OffersReview = () => {
  const activeRole = authService.getRole();

  //////history router
  const browserLocation = useLocation();
  const queryParams = new URLSearchParams(browserLocation.search);
  const id = queryParams.get('id'); ///id stana
  const [setPonude, setSelectedOffers] = useState('');
  const [offers, setOffers] = useState(null);

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);
  const [showEditModal, setEditModal] = useState(false);
  const [data, setData] = useState(null);

  ///detalji stana
  const fetchData = id => {
    api.get(`/stanovi/detalji-stana/${id}`).then(response => {
      setData(response.data);
    });
  };

  const onUpdate = () => {
    setEditModal(false);

    if (id) {
      fetchData(id);
    }
  };

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

  const columns = [
    {
      key: '2',
      title: 'Kupac',
      align: 'center',
      dataIndex: 'ime_kupca',
    },
    {
      key: '3',
      title: 'Stan',
      align: 'center',
      dataIndex: 'stan',
    },
    {
      key: '4',
      title: 'Lamela stana',
      align: 'center',
      dataIndex: 'lamela_stana',
    },
    {
      key: '5',
      title: 'Cena ponude stana',
      align: 'center',
      dataIndex: 'cena_stana_za_kupca',
      sorter: (a, b) => a.cena_stana_za_kupca - b.cena_stana_za_kupca,
    },
    {
      key: '6',
      title: 'Cena stana',
      align: 'center',
      dataIndex: 'cena_stana',
      sorter: (a, b) => a.cena_stana - b.cena_stana,
    },

    {
      key: '7',
      title: 'Broj ugovora',
      align: 'center',
      dataIndex: 'broj_ugovora',
    },
    {
      key: '8',
      title: 'Datum',
      align: 'center',
      dataIndex: 'datum_ugovora',
    },
    {
      key: '9',
      title: 'Način plaćanja',
      align: 'center',
      dataIndex: 'nacin_placanja',
      render: (text, record) => <span>{record.nacin_placanja}</span>,
    },
    {
      key: '10',
      title: 'Status',
      align: 'center',
      dataIndex: 'status_ponude',
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
              title="Detalji stana"
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
                <Descriptions.Item label="Lamela">{data.lamela}</Descriptions.Item>
                <Descriptions.Item label="Adresa">{data.adresa_stana}</Descriptions.Item>
                <Descriptions.Item label="Broj soba">{data.broj_soba}</Descriptions.Item>
                <Descriptions.Item label="Broj terasa">{data.broj_terasa}</Descriptions.Item>
                <Descriptions.Item label="Cena stana">{data.cena_stana}</Descriptions.Item>
                <Descriptions.Item label="Kvadratura">{data.kvadratura}</Descriptions.Item>
                <Descriptions.Item label="Orijentisanost">{data.orijentisanost}</Descriptions.Item>
                <Descriptions.Item label="Sprat">{data.sprat}</Descriptions.Item>
                <Descriptions.Item label="Status prodaje">{data.status_prodaje}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Modal
              title="Izmeni"
              visible={showEditModal}
              onOk={onUpdate}
              onCancel={() => setEditModal(false)}
              footer={null}
            >
              <Apartment getData={onUpdate} edit propsstan={data} closeModal={() => setEditModal(false)} />
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
              <Offers
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
              <Offers
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
};

export default OffersReview;
