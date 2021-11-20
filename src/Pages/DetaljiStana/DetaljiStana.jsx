import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Button, Modal, Row, Col } from 'antd';
import { api } from 'api/api';
import IzmeneStanova from 'Form/IzmeneStanova/IzmeneStanova';
import styles from './DetaljiStana.module.css';

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
            <Descriptions.Item label="Cena stana za kupca">{data.cena_stana_za_kupca}</Descriptions.Item>
            <Descriptions.Item label="Kvadratura">{data.kvadratura}</Descriptions.Item>
            <Descriptions.Item label="Orijentisanost">{data.orijentisanost}</Descriptions.Item>
            <Descriptions.Item label="Sprat">{data.sprat}</Descriptions.Item>
            <Descriptions.Item label="Status prodaje">{data.status_prodaje}</Descriptions.Item>
            <Descriptions.Item label="Klijent prodaje">{data.klijent_prodaje || '/'}</Descriptions.Item>
            <Descriptions.Item label="Napomena" span={10}>
              {data.napomena}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card className={styles.card} title="Slike stana">
          <div className={styles.images}>
            <h3>Trenutno nema unetih slika za ovaj stan.</h3>
          </div>
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
      </div>
    );
  }

  return null;
}

export default DetaljiStana;
