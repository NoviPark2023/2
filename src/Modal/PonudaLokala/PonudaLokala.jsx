import React, { useEffect, useState } from 'react';
import { Input, Button, Form, Select, AutoComplete, DatePicker, Space, message, Tag } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Option } from 'antd/lib/mentions';
import { api } from 'api/api';
import { toast } from 'react-toastify';
import { Spin } from 'antd';

function PonudaLokala(propsponudalokala) {
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
    api.get(`/kupci/detalji-kupca/${id}/`).then(response => {
      setClientName(response.data.ime_prezime);
      setClientId(id);
    });
  };

  useEffect(() => {
    const { propsponudalokala: ponuda, edit } = propsponudalokala;

    if (edit) {
      form.setFieldsValue({
        cena_lokala_za_kupca: ponuda.cena_lokala_za_kupca,
        broj_ugovora_lokala: ponuda.broj_ugovora_lokala,
        datum_ugovora_lokala: ponuda.datum_ugovora_lokala,
        nacin_placanja_lokala: ponuda.nacin_placanja_lokala,
        status_ponude_lokala: ponuda.status_ponude_lokala,
        napomena_ponude_lokala: ponuda.napomena_ponude_lokala,
        lokali: ponuda.lokali_id,
      });

      getSelectedClient(propsponudalokala.propsponudalokala.kupac_lokala);
    } else {
      form.setFieldsValue({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsponudalokala]); /// [form, propsponudalokala] prolazi i ovako proveriti ovo

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
    setLoaderPage(true);
    const endpoint = propsponudalokala.edit
      ? `/ponude-lokali/izmeni-ponudu-lokala/${propsponudalokala.propsponudalokala.id_ponude_lokala}/`
      : '/ponude-lokali/kreiraj-ponudu-lokala/';

    const request = propsponudalokala.edit ? api.put : api.post;

    request(endpoint, {
      ...form.getFieldValue(),

      kupac_lokala: clientId,
      lokali: propsponudalokala.propsponudalokala.lokali,
    })
      .then(res => {
        form.setFieldsValue({});
        propsponudalokala.closeModal();
        if (propsponudalokala.edit) {
          propsponudalokala.onEdit(propsponudalokala.idKlijenta);
        } else {
          propsponudalokala.getData();
        }
        toast.success('Uspesno ste izmenili podatke');
      })
      .catch(error => {
        if (error.data.broj_ugovora_lokala) {
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
      <Form autoComplete="off" onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" form={form}>
        <FormItem
          label="Ime kupca"
          // name="ime_kupca"
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
          name="cena_lokala_za_kupca"
          rules={[
            {
              required: true,
              message: 'Unesite cenu ponude!',
            },
          ]}
        >
          <Input id="cena_lokala_za_kupca" size="default" placeholder="Cena ponude lokala" />
        </FormItem>
        <FormItem
          label="Broj ugovora"
          name="broj_ugovora_lokala"
          rules={[
            {
              required: false,
              message: 'Unesite broj ugovora!',
            },
          ]}
        >
          <Input id="broj_ugovora_lokala" size="default" placeholder="broj ugovora lokala" />
        </FormItem>
        <FormItem
          label="Datum"
          name="datum_ugovora_lokala"
          rules={[
            {
              required: true,
              message: ' Unesite datum!',
            },
          ]}
        >
          <p>
            <Tag color={'green'} style={{ width: '50%', textAlign: 'center' }}>
              Trenutno unešen datum: <b>{form.getFieldsValue().datum_ugovora_lokala}</b>
            </Tag>
          </p>
          <Space direction="vertical" size={12}>
            <DatePicker
              // defaultValue={moment(form.getFieldsValue().datum_ugovora)}
              onChange={(val, newDate) => {
                form.setFieldsValue({ datum_ugovora_lokala: newDate });
              }}
              format={'DD.MM.YYYY'}
            />
          </Space>
        </FormItem>

        <FormItem
          label=" Napomena"
          name="napomena_ponude_lokala"
          rules={[
            {
              required: false,
              message: ' Napomena!',
            },
          ]}
        >
          <Input id="napomena_ponude_lokala" size="default" placeholder=" napomena" />
        </FormItem>
        <FormItem
          label="Nacin placanja"
          name="nacin_placanja_lokala"
          rules={[
            {
              required: true,
              message: 'Izaberite nacin placanja!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().nacin_placanja_lokala} style={{ width: 120 }}>
            <Option value="Ceo iznos">Ceo iznos</Option>
            <Option value="Kredit">Kredit</Option>
            <Option value="Na rate">Na rate</Option>
            <Option value="Ucesce">Ucesce</Option>
          </Select>
        </FormItem>
        <FormItem
          label="Status "
          name="status_ponude_lokala"
          rules={[
            {
              required: true,
              message: 'Izaberite status ponude!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().status_ponude_lokala} style={{ width: 120 }}>
            <Option value="potencijalan">Potencijalan</Option>
            <Option value="rezervisan">Rezervisan</Option>
            <Option value="kupljen">Kupljen</Option>
          </Select>
        </FormItem>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" htmlType="submit">
              Sačuvaj
            </Button>

            <Button type="danger" onClick={() => propsponudalokala.closeModal()}>
              Otkaži
            </Button>
          </div>
        </Form.Item>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loaderPage && <Spin tip="Loading page" size="large" />}
        </div>
      </Form>
    </div>
  );
}

export default PonudaLokala;
