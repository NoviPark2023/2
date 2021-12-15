/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Button, Modal } from 'antd';
import { api } from 'api/api';
import styles from './DetaljiKlijenta.module.css';
import 'antd/dist/antd.css';
import IzmeneKlijenta from 'Form/IzmeneKlijenta/IzmeneKlijenta';

function DetaljiKlijenta(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [showEditModal, setEditModal] = useState(false);
  //   const [visible, setVisible] = useState(false);

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
      .get(`/kupci/detalji-kupca/${id}/`)
      .then(response => {
        console.log(response.data);
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
          style={{ width: '50%', margin: '15px' }}
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
        <Card className={styles.card} title="Ponude Klijenta"></Card>
        <Modal
          title="Izmeni"
          visible={showEditModal}
          onOk={onUpdate}
          onCancel={() => setEditModal(false)}
          footer={null}
        >
          <IzmeneKlijenta getData={onUpdate} edit propsklijenta={data} closeModal={() => setEditModal(false)} />
        </Modal>
      </div>
    );
  }

  return null;
}

export default DetaljiKlijenta;
