/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Input, Form, Select, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import { api } from 'api/api';
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';

function ChangeClients(propsklijenta) {
  const [form] = Form.useForm();

  useEffect(() => {
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

  const sucsessMessages = value => {
    toast.success(value);
  };

  const errorMessages = value => {
    toast.error(value);
  };

  const createClient = values => {
    const endpoint = '/kupci/kreiraj-kupca/';
    api
      .post(endpoint, values)
      .then(res => {
        succses();
        sucsessMessages('uspesno');
      })
      .catch(e => {
        errorMessages('greska');
      });
  };

  const changeClients = (id_kupca, values) => {
    const endpoint = `/kupci/izmeni-kupca/${id_kupca}/`;
    api
      .put(endpoint, values)
      .then(res => {
        propsklijenta.closeModal();
        propsklijenta.getData();
        toast.success('Uspesno ste izmenili podatke');
      })
      .catch(e => {
        propsklijenta.closeModal();
        toast.error('Greskaaa');
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
            <Option value="Fizicko">Fizicko Lice</Option>
            <Option value="Pravno">Pravno Lice</Option>
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
              type: 'email',
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

            <Button onClick={Modal} type="danger" htmlType="submit">
              {propsklijenta.preview ? 'Zatvori' : 'Otkazi'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangeClients;
