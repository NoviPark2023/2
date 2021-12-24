/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input, Button, Form, Select, AutoComplete, DatePicker, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import 'antd/dist/antd.css';
import { api } from 'api/api';
import { toast } from 'react-toastify';
import moment from 'moment';

function IzmenaPonuda(propsponuda) {
  const [form] = Form.useForm();
  const [clients, setClients] = useState({}); // List of clients fetched form server by client name
  const [clientOptions, setClientOptions] = useState([]); // list of formatted clients
  const [clientName, setClientName] = useState(''); // current selected client name
  const [clientId, setClientId] = useState(null); // current selected client id

  const onClientSelect = selected => {
    const option = clientOptions.find(option => option.value === selected);
    console.log(clientOptions, 'kkkkkkkkk');
    setClientName(option?.label || '');
    setClientId(option?.value || null);
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
          value: client.id_kupca,
          label: client.ime_prezime,
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
        } else {
          propsponuda.getData();
        }
        toast.success('Uspesno ste izmenili podatke');
      })
      .catch(e => {
        toast.error('Greskaaa');
      });
  };

  return (
    <div>
      <Form layout="vertical" form={form}>
        <FormItem
          label="Ime kupca"
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
              required: true,
              message: 'Unesite broj ugovora!',
            },
          ]}
        >
          <Input id="broj_ugovora" size="default" placeholder="broj ugovora" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          label="Datum ugovora"
          name="datum_ugovora"
          rules={[
            {
              required: true,
              message: ' Unesite datum!',
            },
          ]}
        >
          <Space direction="vertical" size={12}>
            {form.getFieldsValue().datum_ugovora}
            <DatePicker
              value={moment(form.getFieldsValue().datum_ugovora)}
              onChange={(val, newDate) => {
                console.log('bla bla: ', val, newDate);
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
              required: true,
              message: ' Napomena!',
            },
          ]}
        >
          <Input id="napomena" size="default" placeholder=" napomena" />
        </FormItem>
        <FormItem
          label="Nacin placanja"
          name="nacin_placanja"
          rules={[
            {
              required: true,
              message: 'Izaberite nacin_placanja!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().nacin_placanja} style={{ width: 120 }}>
            <Option value="ceo_iznos">Ceo iznos</Option>
            <Option value="kredit">Kredit</Option>
            <Option value="na_rate">Na rate</Option>
            <Option value="ucesce">Ucesce</Option>
          </Select>
        </FormItem>
        <FormItem
          label="Status "
          name="status_ponude"
          rules={[
            {
              required: true,
              message: 'Izaberite status_ponude!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().status_ponude} style={{ width: 120 }}>
            <Option value="potencijalan">Potencijalan</Option>
            <Option value="rezervisan">Rezervisan</Option>
            <Option value="kupljen">Kupljen</Option>
          </Select>
        </FormItem>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={updateOffers} type="primary" htmlType="submit">
              Sacuvaj
            </Button>

            <Button type="danger" onClick={() => propsponuda.closeModal()} htmlType="submit">
              Otkazi
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default IzmenaPonuda;
