/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input, Button, Form, Select, AutoComplete, DatePicker, Space, message, Tag } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Option } from 'antd/lib/mentions';
import 'antd/dist/antd.css';
import { api } from 'api/api';
import { Spin } from 'antd';

function Garages(propsgaraze) {
  const [form] = Form.useForm();
  const [clients, setClients] = useState({}); // List of clients fetched form server by client name
  const [clientOptions, setClientOptions] = useState([]); // list of formatted clients
  const [clientName, setClientName] = useState(''); // current selected client name
  const [clientId, setClientId] = useState(null); // current selected client id

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  const onClientSelect = selected => {
    const option = clientOptions.find(option => option.value === selected);

    setClientName(option?.label || '');
    setClientId(option?.value || null);
  };

  const onClientSearch = client => {
    api.get(`/kupci/kupci-autocomplete/${client}/`).then(response => {
      setClients(response.data);
    });
  };

  const getSelectedClient = id => {
    if (id)
      api.get(`/kupci/detalji-kupca/${id}/`).then(response => {
        setClientName(response.data.ime_prezime);
        setClientId(id);
      });
  };

  useEffect(() => {
    const { propsgaraze: garaza, edit } = propsgaraze;

    form.setFieldsValue({});
    setClientName(null);
    setClientId(null);

    if (edit) {
      form.setFieldsValue({
        jedinstveni_broj_garaze: garaza.jedinstveni_broj_garaze,
        cena_garaze: garaza.cena_garaze,
        napomena_garaze: garaza.napomena_garaze,
        status_prodaje_garaze: garaza.status_prodaje_garaze,
        datum_ugovora_garaze: garaza.datum_ugovora_garaze,
        nacin_placanja_garaze: garaza.nacin_placanja_garaze,
      });

      getSelectedClient(propsgaraze.propsgaraze.kupac);
    }
  }, [propsgaraze]);
  useEffect(() => {
    if (clients.hasOwnProperty('results')) {
      setClientOptions(
        clients.results.map(client => ({
          value: client.id_kupca,
          label: client.ime_prezime,
        }))
      );
    }
  }, [clients]);

  useEffect(() => {
    if (clientName) {
      onClientSearch(clientName);
    } else {
      setClientId(null);
    }
  }, [clientName]);

  const validateGarages = () => {
    let error = '';

    if ((!clientName || clientName.length === 0) && form.getFieldsValue().status_prodaje_garaze === 'prodata') {
      error = 'Unesite ime kupca!';
    }
    return error;
  };

  const updateGarages = () => {
    setLoaderPage(true);

    const error = validateGarages();
    if (error) {
      setLoaderPage(false);

      message.error({
        content: error,
        className: 'custom-class',
        style: { fontSize: 20, marginTop: '0vh' },
      });
      return;
    }

    const endpoint = propsgaraze.edit
      ? `/garaze/izmeni-garazu/${propsgaraze.propsgaraze.id_garaze}/`
      : '/garaze/kreiraj-garazu/';

    const request = propsgaraze.edit ? api.put : api.post;
    request(endpoint, {
      ...form.getFieldValue(),

      kupac: clientId,
    })
      .then(res => {
        form.setFieldsValue({});
        propsgaraze.closeModal();
        if (propsgaraze.edit) {
          // propsgaraze.onEdit(propsgaraze.idKlijenta);

          propsgaraze.getData();
        } else {
          propsgaraze.getData();
        }
      })
      .catch(error => {
        if (error.data?.jedinstveni_broj_garaze) {
          message.error({
            content: 'Garaza sa ovim brojem vec postoji u sistemu !',
            className: 'custom-class',
            style: { fontSize: 20, marginTop: '0vh' },
          });
        }
      })
      .finally(() => {
        setLoaderPage(false);
      });
  };
  const onFinish = values => {
    updateGarages(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form autoComplete="off" layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <FormItem
          label="Broj garaže"
          name="jedinstveni_broj_garaze"
          rules={[
            {
              required: true,
              message: 'Unesite broj garaže!',
            },
          ]}
        >
          <Input id="jedinstveni_broj_garaze" size="default"></Input>
        </FormItem>
        <FormItem
          label="Cena garaže"
          name="cena_garaze"
          rules={[
            {
              required: false,
              message: 'Unesite broj garaže!',
            },
          ]}
        >
          <Input id="cena_garaze" size="default" />
        </FormItem>

        <FormItem
          label="Ime kupca"
          rules={[
            {
              required: false,
              message: 'Unesite kupca!',
            },
          ]}
        >
          <AutoComplete
            options={clientOptions}
            style={{ width: 300 }}
            onSelect={onClientSelect}
            onChange={value => setClientName(value)}
            placeholder="Pretrazi klijente"
            value={clientName}
          />
        </FormItem>

        <FormItem
          label=" Napomena"
          name="napomena_garaze"
          rules={[
            {
              required: false,
              message: 'Napomena!',
            },
          ]}
        >
          <Input id="napomena_garaze" size="default" placeholder=" napomena" />
        </FormItem>

        <FormItem
          label="Status"
          name="status_prodaje_garaze"
          rules={[
            {
              required: true,
              message: 'Unesite status!',
            },
          ]}
        >
          <Select id="status_prodaje_garaze" value={form.getFieldsValue().status_prodaje_garaze} style={{ width: 120 }}>
            <Option value="dostupna">Dostupna</Option>
            <Option value="rezervisana">Rezervisana</Option>
            <Option value="prodata">Prodata</Option>
          </Select>
        </FormItem>

        <FormItem
          label="Datum"
          name="datum_ugovora_garaze"
          rules={[
            {
              required: true,
              message: ' Unesite datum!',
            },
          ]}
        >
          <p>
            <Tag color={'green'} style={{ width: '50%', textAlign: 'center' }}>
              Trenutno unešen datum: <b>{form.getFieldsValue().datum_ugovora_garaze}</b>
            </Tag>
          </p>
          <Space direction="vertical" size={12}>
            <DatePicker
              // defaultValue={moment(form.getFieldsValue().datum_ugovora)}
              onChange={(val, newDate) => {
                form.setFieldsValue({ datum_ugovora_garaze: newDate });
              }}
              format={'DD.MM.YYYY'}
            />
          </Space>
        </FormItem>
        <FormItem
          label="Način plaćanja"
          name="nacin_placanja_garaze"
          rules={[
            {
              required: true,
              message: 'Izaberite način plaćanja!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().nacin_placanja_garaze} style={{ width: 120 }}>
            <Option value="Ceo iznos">Ceo iznos</Option>
            <Option value="Kredit">Kredit</Option>
            <Option value="Na rate">Na rate</Option>
            <Option value="Ucesce">Ucesce</Option>
          </Select>
        </FormItem>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" htmlType="submit">
              Sačuvaj
            </Button>
            <Button type="danger" onClick={() => propsgaraze.closeModal()}>
              Otkaži
            </Button>
          </div>
        </Form.Item>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loaderPage && <Spin tip="Loading page" size="large"></Spin>}
        </div>
      </Form>
    </div>
  );
}

export default Garages;
