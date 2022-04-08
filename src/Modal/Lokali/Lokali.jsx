/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Input, Button, Form, Select, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';
import { api } from 'api/api';

function Local(propslokala) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (propslokala.edit) {
      form.setFieldsValue({
        lamela_lokala: propslokala.propslokala.lamela_lokala,
        adresa_lokala: propslokala.propslokala.adresa_lokala,
        kvadratura_lokala: propslokala.propslokala.kvadratura_lokala,
        broj_prostorija: propslokala.propslokala.broj_prostorija,
        orijentisanost_lokala: propslokala.propslokala.orijentisanost_lokala,
        cena_lokala: propslokala.propslokala.cena_lokala,
      });
    }
  }, [propslokala]);

  const closeModal2 = () => {
    propslokala.closeModal();
  };
  const succses = () => {
    propslokala.closeModal();
    propslokala.getData();
  };

  const editLocal = (id_lokala, values) => {
    const endpoint = `/lokali/izmeni-lokal/${id_lokala}/`;
    api
      .put(endpoint, values)
      .then(res => {
        succses();
        message.success({
          content: 'Uspešno izmenjeni podaci lokala !',
          className: 'custom-class',
          style: {},
        });
      })
      .catch(e => {});
  };

  const createLocal = values => {
    const endpoint = '/lokali/kreiraj-lokal/';
    api
      .post(endpoint, values)
      .then(res => {
        succses();
        message.success({
          content: 'Uspešno ste kreirali novi lokal !',
          className: 'custom-class',
          style: {},
        });
      })
      .catch(error => {
        if (error.data.lamela_lokala) {
          message.error({
            content: 'Lokal sa ovom Lamelom je vec registrovan u sistemu !',
            className: 'custom-class',
            style: {
              marginTop: '0vh',
              fontSize: 20,
            },
          });
        }
      });
  };

  const updateLocalObj = values => {
    propslokala.edit ? editLocal(propslokala.propslokala.id_lokala, values) : createLocal(values);
  };
  const onFinish = values => {
    updateLocalObj(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form autoComplete="off" layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <FormItem
          label="Lamela"
          name="lamela_lokala"
          rules={[
            {
              required: true,
              message: 'Unesite Lamelu!',
            },
          ]}
        >
          <Input size="default" placeholder="Lamela" />
        </FormItem>
        <FormItem
          label="Adresa lokala"
          name="adresa_lokala"
          rules={[
            {
              required: true,
              message: 'Unesite adresu lokala!',
            },
          ]}
        >
          <Input size="default" placeholder="Adresa lokala" />
        </FormItem>
        <FormItem
          label="Kvadratura"
          name="kvadratura_lokala"
          rules={[
            {
              required: true,
              message: 'Unesite Kvadraturu!',
            },
          ]}
        >
          <Input size="default" placeholder="Kvadratura" />
        </FormItem>
        <FormItem
          label="Broj prostorija"
          name="broj_prostorija"
          rules={[
            {
              required: true,
              message: 'Unesite broj soba!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().broj_prostorija} style={{ width: 120 }}>
            <Select.Option value="1.0">1</Select.Option>
            <Select.Option value="1.5">1.5</Select.Option>
            <Select.Option value="2.0">2</Select.Option>
            <Select.Option value="2.5">2.5</Select.Option>
            <Select.Option value="3.0">3</Select.Option>
            <Select.Option value="3.5">3.5</Select.Option>
            <Select.Option value="4.0">4</Select.Option>
            <Select.Option value="4.5">4.5</Select.Option>
            <Select.Option value="5.0">5</Select.Option>
            <Select.Option value="5.5">5.5</Select.Option>
            <Select.Option value="6.0">6</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          label="Orijentisanost"
          name="orijentisanost_lokala"
          rules={[
            {
              required: true,
              message: 'Unesite orijentisanost!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().orijentisanost_lokala} style={{ width: 120 }}>
            <Select.Option value="Sever">Sever</Select.Option>
            <Select.Option value="Jug">Jug</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          label="Cena lokala"
          name="cena_lokala"
          rules={[
            {
              required: true,
              message: 'Unesite cenu lokala!',
            },
          ]}
        >
          <Input size="default" placeholder="Cena lokala" />
        </FormItem>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" htmlType="submit">
              {propslokala.edit ? 'Izmeni' : 'Dodaj'}
            </Button>

            <Button onClick={closeModal2} type="danger">
              Otkaži
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Local;
