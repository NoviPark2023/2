/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Button, Modal } from 'antd';
import { api } from 'api/api';
import styles from './DetaljiKlijenta.module.css';
import 'antd/dist/antd.css';
import Klijenta from 'Modal/Klijenta/Klijenta';
import PregledPonudaPoKlijentima from 'Tabele/PregledPonudaPoKlijentima/PregledPonudaPoKlijentima';
import { useParams } from 'react-router-dom';
import Scroll from 'components/Scroll/Scroll';
import { Spin } from 'antd';
import NotFound from 'Pages/NotFound/NotFound';

function DetaljiKlijenta(props) {
  const x = useParams().id;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [showEditModal, setEditModal] = useState(false);

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  const onFecthError = error => {
    const errorMessage =
      error.status === 404 ? (
        <NotFound></NotFound>
      ) : (
        'Doslo je do greske. Molimo Vas pokusajte ponovo ili kontaktirajte podrsku.'
      );

    setError(errorMessage);
  };

  const fetchData = id => {
    setLoaderPage(true);
    api
      .get(`/kupci/detalji-kupca/${id}/`)
      .then(response => {
        setData(response.data);
      })
      .catch(onFecthError)
      .finally(() => {
        setLoaderPage(false);
      });
  };
  const onUpdate = async () => {
    setEditModal(false);

    if (x) {
      setLoading(true);
      await fetchData(x);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData(x);
    setLoading(false);
  }, []);
  const tableItems = data && data.lista_ponuda_kupca ? data.lista_ponuda_kupca : null;

  if (loading) return <div>Loading...</div>;

  if (error) {
    return (
      <div>
        <h3 style={{ color: 'red' }}>{error}</h3>
      </div>
    );
  }

  if (data) {
    return (
      <Scroll>
        <div className={styles['flat-details']}>
          <Card
            className={styles.textLabel}
            title="Detalji Klijenta"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  setEditModal(true);
                }}
              >
                Izmeni
              </Button>
            }
            style={{ width: '50%', margin: '25px' }}
          >
            <Descriptions layout="horizontal">
              <Descriptions.Item label="ID">{data.id_kupca}</Descriptions.Item>
              <Descriptions.Item label="Lice" span={4}>
                {data.lice}
              </Descriptions.Item>
              <Descriptions.Item label="Ime i Prezime">{data.ime_prezime}</Descriptions.Item>
              <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
              <Descriptions.Item label="Broj telefona">{data.broj_telefona}</Descriptions.Item>
              <Descriptions.Item label="PIB/JMBG">{data.Jmbg_Pib}</Descriptions.Item>
              <Descriptions.Item label="Adresa">{data.adresa}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Modal
            title="Izmeni"
            visible={showEditModal}
            onOk={onUpdate}
            onCancel={() => setEditModal(false)}
            footer={null}
          >
            <Klijenta getData={onUpdate} edit propsklijenta={data} closeModal={() => setEditModal(false)} />
          </Modal>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loaderPage && <Spin tip="Loading page" size="large"></Spin>}
          </div>
        </div>
        <div>
          <PregledPonudaPoKlijentima idKlijenta={data.id_kupca} updateFunction={fetchData} tableItems={tableItems} />
        </div>
      </Scroll>
    );
  }

  return null;
}

export default DetaljiKlijenta;
