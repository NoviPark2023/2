/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input, Button, Form, Select, AutoComplete, DatePicker, Space, message, Tag } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { api } from 'api/api';
import { Spin } from 'antd';

function ChangeOffers(propsponuda) {
  const [form] = Form.useForm();
  const [clients, setClients] = useState({}); // List of clients fetched form server by client name
  const [clientOptions, setClientOptions] = useState([]); // list of formatted clients
  const [clientName, setClientName] = useState(''); // current selected client name
  const [clientId, setClientId] = useState(null); // current selected client id

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  const onClientSelect = selected => {
    const option = clientOptions.find(option => option.value === selected);

    setClientName(option?.value || '');
    setClientId(option?.id || null);
  };

  const onClientSearch = client => {
    api.get(`/kupci/kupci-autocomplete/${client}/`).then(response => {
      setClients(response.data);
    });
  };

  const getSelectedClient = id => {
    api.get(`/kupci/detalji-kupca/${id}/`).then(response => {
      setClientName(response.data.ime_prezime);
      setClientId(id);
    });
  };

  useEffect(() => {
    const { propsponuda: ponuda, edit } = propsponuda;

    if (edit) {
      form.setFieldsValue({
        ime_kupca: ponuda.ime_kupca,
        cena_stana_za_kupca: ponuda.cena_stana_za_kupca,
        broj_ugovora: ponuda.broj_ugovora,
        datum_ugovora: ponuda.datum_ugovora,
        nacin_placanja: ponuda.nacin_placanja,
        status_ponude: ponuda.status_ponude,
        napomena: ponuda.napomena,
        stan: ponuda.stan_id,
      });

      getSelectedClient(propsponuda.propsponuda.kupac);
    } else {
      form.setFieldsValue({});
    }
  }, [propsponuda]);
  useEffect(() => {
    if (clients.hasOwnProperty('results')) {
      setClientOptions(
        clients.results.map(client => ({
          value: client.ime_prezime,
          id: client.id_kupca,
        }))
      );
    }
  }, [clients]);

  useEffect(() => {
    if (clientName) {
      onClientSearch(clientName);
    }
  }, [clientName]);

  const updateOffers = () => {
    setLoaderPage(true);
    const endpoint = propsponuda.edit
      ? `/ponude/izmeni-ponudu/${propsponuda.propsponuda.id_ponude}/`
      : '/ponude/kreiraj-ponudu/';

    const request = propsponuda.edit ? api.put : api.post;

    request(endpoint, {
      ...form.getFieldValue(),

      kupac: clientId,
      stan: propsponuda.propsponuda.stan,
    })
      .then(res => {
        form.setFieldsValue({});
        propsponuda.closeModal();
        if (propsponuda.edit) {
          propsponuda.onEdit(propsponuda.idKlijenta);
          message.success({
            content: 'Uspešno ste izmenili podatke!',
            className: 'custom-class',
            style: {},
          });
        } else {
          propsponuda.getData();
          message.success({
            content: 'Uspešno kreirana ponuda stana!',
            className: 'custom-class',
            style: {},
          });
        }
      })
      .catch(error => {
        if (error.data.broj_ugovora) {
          message.error({
            content: 'Ponuda sa ovim brojem ugovora vec postoji u sistemu !',
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
    updateOffers(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form autoComplete="off" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
        <FormItem
          label="Ime kupca"
          name="ime_kupca"
          rules={[
            {
              required: true,
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
          label="Cena ponude"
          name="cena_stana_za_kupca"
          rules={[
            {
              required: true,
              message: 'Unesite cenu ponude!',
            },
          ]}
        >
          <Input id="cena_stana_za_kupca" size="default" placeholder="Cena ponude" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          label="Broj ugovora"
          name="broj_ugovora"
          rules={[
            {
              required: false,
              message: 'Unesite broj ugovora!',
            },
          ]}
        >
          <Input id="broj_ugovora" size="default" placeholder="broj ugovora" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          label="Datum"
          name="datum_ugovora"
          rules={[
            {
              required: true,
              message: ' Unesite datum!',
            },
          ]}
        >
          <p>
            <Tag color={'green'} style={{ width: '50%', textAlign: 'center' }}>
              Trenutno unešen datum: <b>{form.getFieldsValue().datum_ugovora}</b>
            </Tag>
          </p>
          <Space direction="vertical" size={12}>
            <DatePicker
              // defaultValue={moment(form.getFieldsValue().datum_ugovora)}
              onChange={(val, newDate) => {
                form.setFieldsValue({ datum_ugovora: newDate });
              }}
              format={'DD.MM.YYYY'}
            />
          </Space>
        </FormItem>

        <FormItem
          label=" Napomena"
          name="napomena"
          rules={[
            {
              required: false,
              message: ' Napomena!',
            },
          ]}
        >
          <Input id="napomena" size="default" placeholder=" napomena" />
        </FormItem>
        <FormItem
          label="Način plaćanja"
          name="nacin_placanja"
          rules={[
            {
              required: true,
              message: 'Izaberite način plaćanja!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().nacin_placanja} style={{ width: 120 }}>
            <Select.Option value="Ceo iznos">Ceo iznos</Select.Option>
            <Select.Option value="Kredit">Kredit</Select.Option>
            <Select.Option value="Na rate">Na rate</Select.Option>
            <Select.Option value="Ucesce">Učesće</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          label="Status "
          name="status_ponude"
          rules={[
            {
              required: true,
              message: 'Izaberite status ponude!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().status_ponude} style={{ width: 120 }}>
            <Select.Option value="potencijalan">Potencijalan</Select.Option>
            <Select.Option value="rezervisan">Rezervisan</Select.Option>
            <Select.Option value="kupljen">Kupljen</Select.Option>
          </Select>
        </FormItem>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" htmlType="submit">
              Sačuvaj
            </Button>

            <Button type="danger" onClick={() => propsponuda.closeModal()}>
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

export default ChangeOffers;
