/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input, Form, Select, Button, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined } from '@ant-design/icons';
import { api } from 'api/api';
import 'antd/dist/antd.css';
import { Spin } from 'antd';

function ChangeClients(propsklijenta) {
  const [form] = Form.useForm();

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  useEffect(() => {
    form.setFieldsValue({});
    if (propsklijenta.edit) {
      form.setFieldsValue({
        lice: propsklijenta.propsklijenta.lice,
        ime_prezime: propsklijenta.propsklijenta.ime_prezime,
        email: propsklijenta.propsklijenta.email,
        broj_telefona: propsklijenta.propsklijenta.broj_telefona,
        Jmbg_Pib: propsklijenta.propsklijenta.Jmbg_Pib,
        adresa: propsklijenta.propsklijenta.adresa,
      });
    }
  }, [propsklijenta]);

  const Modal = () => {
    propsklijenta.closeModal();
  };

  const succses = () => {
    propsklijenta.closeModal();
    propsklijenta.getData();
  };

  const createClient = values => {
    const endpoint = '/kupci/kreiraj-kupca/';
    api
      .post(endpoint, values)
      .then(res => {
        succses();
        message.success({
          content: 'Uspešno kreiran novi klijent !',
          className: 'custom-class',
          style: {},
        });
      })
      .catch(error => {
        if (error.data.email) {
          message.error({
            content: 'Klijent sa ovim E-mailom je vec registrovan u sistemu !',
            className: 'custom-class',
            style: { fontSize: 20, marginTop: '0vh' },
          });
        } else if (error.data.broj_telefona) {
          message.error({
            content: 'Klijent sa ovim Telefonskim brojem je vec registrovan u sistemu !',
            className: 'custom-class',
            style: { fontSize: 20, marginTop: '0vh' },
          });
        } else if (error.data.Jmbg_Pib) {
          message.error({
            content: 'Klijent sa unetim (JMBG / PIB) je vec registrovan u sistemu !',
            className: 'custom-class',
            style: { fontSize: 20, marginTop: '0vh' },
          });
        } else if (error.data.ime_prezime) {
          message.error({
            content: 'Klijent sa ovim podacima vec postoji u sistemu, unesite ime oca !',
            className: 'custom-class',
            style: { fontSize: 20 },
          });
        }
      });
  };

  const changeClients = (id_kupca, values) => {
    const endpoint = `/kupci/izmeni-kupca/${id_kupca}/`;
    api
      .put(endpoint, values)
      .then(res => {
        message.success({
          content: 'Uspešno ste izmenili podatke kupca !',
          className: 'custom-class',
          style: {},
        });
        propsklijenta.closeModal();
        propsklijenta.getData();
        setLoaderPage(false);
      })
      .catch(e => {
        propsklijenta.closeModal();
      });
  };

  const changeUsers = values => {
    propsklijenta.edit ? changeClients(propsklijenta.propsklijenta.id_kupca, values) : createClient(values);
  };
  const onFinish = values => {
    changeUsers(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form autoComplete="off" onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" form={form}>
        <FormItem
          label="Lice"
          name="lice"
          rules={[
            {
              required: true,
              message: 'Izaberite Preduzetnika!',
            },
          ]}
        >
          <Select disabled={propsklijenta.preview} id="lice" value={form.getFieldsValue().lice} style={{ width: 120 }}>
            <Select.Option value="Fizicko">Fizicko Lice</Select.Option>
            <Select.Option value="Pravno">Pravno Lice</Select.Option>
          </Select>
        </FormItem>

        <FormItem
          label="Ime i Prezime"
          name="ime_prezime"
          rules={[
            {
              required: true,
              message: 'Unesite Ime i prezime!',
            },
          ]}
        >
          <Input id="ime_prezime" size="default" disabled={propsklijenta.preview} prefix={<UserOutlined />}></Input>
        </FormItem>
        <FormItem
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Unesite  E-mail!',
            },
            {
              message: 'Unesite ispravan E-mail!',
            },
          ]}
        >
          <Input
            id="email"
            size="default"
            placeholder="E-mail"
            disabled={propsklijenta.preview}
            prefix={<UserOutlined />}
          />
        </FormItem>
        <FormItem
          label="Broj telefona"
          name="broj_telefona"
          rules={[
            {
              required: true,
              message: 'Broj telefona!',
            },
          ]}
          hasFeedback
        >
          <Input id="broj_telefona" disabled={propsklijenta.preview} size="default" placeholder="Broj telefona" />
        </FormItem>
        <FormItem
          label="JMBG"
          name="Jmbg_Pib"
          rules={[
            {
              required: true,
              message: 'Unesite PIB/JMBG!',
            },
          ]}
        >
          <Input id="Jmbg_Pib" size="default" disabled={propsklijenta.preview} placeholder="PIB/JMBG" />
        </FormItem>
        <FormItem
          label="Adresa"
          name="adresa"
          rules={[
            {
              required: true,
              message: 'Unesite Adresu!',
            },
          ]}
        >
          <Input id="adresa" size="default" disabled={propsklijenta.preview} placeholder="Adresa" />
        </FormItem>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {!propsklijenta.preview && (
              <Button type="primary" htmlType="submit">
                {propsklijenta.edit ? 'Izmeni' : 'Dodaj'}
              </Button>
            )}

            <Button onClick={Modal} type="danger">
              {propsklijenta.preview ? 'Zatvori' : 'Otkazi'}
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

export default ChangeClients;
