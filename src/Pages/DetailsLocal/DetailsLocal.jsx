/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Button, Modal } from 'antd';
import { api } from 'api/api';
import styles from './DetailsLocal.module.css';
import 'antd/dist/antd.css';
import GraphLocal from 'components/GraphLocal/GraphLocal';
import { useParams } from 'react-router-dom';
import { authService } from 'auth/auth.service';
import NotFound from 'Pages/NotFound/NotFound';
import Local from 'Modal/Local/Local';
import Scroll from 'components/Scroll/Scroll';
import DocumentationLocal from 'Tabele/DocumentationLocal/DocumentationLocal';

function DetailsLocal() {
  const activeRole = authService.getRole();
  const id = useParams().id;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [showEditModal, setEditModal] = useState(false);

  const onFecthError = error => {
    const errorMessage = error.status === 404 ? <NotFound /> : 'Greska';

    setError(errorMessage);
  };

  const fetchData = id_lokala => {
    setLoading(true);

    api
      .get(`/lokali/detalji-lokala/${id_lokala}/`)
      .then(response => {
        setData(response.data);
      })
      .catch(onFecthError)
      .finally(() => setLoading(false));
  };

  const onUpdate = () => {
    setEditModal(false);

    if (id) {
      fetchData(id);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, []);

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
      <>
        <Scroll>
          <div className={styles['flat-details']}>
            <Card
              className={styles.textLabel}
              title="Detalji lokala"
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
              title="Izmeni podatke lokala"
              visible={showEditModal}
              onOk={onUpdate}
              onCancel={() => setEditModal(false)}
              footer={null}
            >
              <Local getData={onUpdate} edit propslokala={data} closeModal={() => setEditModal(false)} />
            </Modal>
            <Card className={styles.textLabel} style={{ width: '50%', margin: '15px' }}>
              <GraphLocal propslokala={data} />
            </Card>
          </div>
          <DocumentationLocal propslokala={data} />
        </Scroll>
      </>
    );
  }

  return null;
}

export default DetailsLocal;
