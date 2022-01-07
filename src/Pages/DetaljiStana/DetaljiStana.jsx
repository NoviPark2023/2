/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Button, Modal } from 'antd';
import { api } from 'api/api';
import IzmeneStanova from 'Form/IzmeneStanova/IzmeneStanova';
import styles from './DetaljiStana.module.css';
import 'antd/dist/antd.css';
import Grafikon from 'components/Grafikoni/Grafikon';

function DetaljiStana(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [showEditModal, setEditModal] = useState(false);

  const getId = () => {
    return props.match?.params?.id;
  };

  const onFecthError = error => {
    const errorMessage =
      error.status === 404
        ? 'Stan nije pronadjen'
        : 'Doslo je do greske. Molimo Vas pokusajte ponovo ili kontaktirajte podrsku.';

    setError(errorMessage);
  };

  const fetchData = id => {
    setLoading(true);

    api
      .get(`/stanovi/detalji-stana/${id}`)
      .then(response => {
        setData(response.data);
      })
      .catch(onFecthError)
      .finally(() => setLoading(false));
  };

  const onUpdate = () => {
    const id = getId();
    setEditModal(false);

    if (id) {
      fetchData(id);
    }
  };

  useEffect(() => {
    const id = getId();

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
        <div className={styles['flat-details']}>
          <Card
            className={styles.textLabel}
            title="Detalji stana"
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
            style={{ width: '50%', margin: '15px' }}
          >
            <Descriptions layout="horizontal">
              <Descriptions.Item label="Lamela">{data.lamela}</Descriptions.Item>
              <Descriptions.Item label="Adresa" span={4}>
                {data.adresa_stana}
              </Descriptions.Item>
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
            <IzmeneStanova getData={onUpdate} edit propsstan={data} closeModal={() => setEditModal(false)} />
          </Modal>
          <Card className={styles.textLabel} style={{ width: '50%', margin: '15px' }}>
            <Grafikon propsstan={data} />
          </Card>
        </div>
      </>
    );
  }

  return null;
}

export default DetaljiStana;
