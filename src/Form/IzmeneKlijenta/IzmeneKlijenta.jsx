import React, { useEffect } from 'react';
import { Input, Form, Select, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import { api } from 'api/api';
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';

function IzmeneKlijenta(propsklijenta) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      lice: propsklijenta.propsklijenta.lice,
      ime_prezime: propsklijenta.propsklijenta.ime_prezime,
      email: propsklijenta.propsklijenta.email,
      broj_telefona: propsklijenta.propsklijenta.broj_telefona,
      Jmbg_Pib: propsklijenta.propsklijenta.Jmbg_Pib,
      adresa: propsklijenta.propsklijenta.adresa,
    });
  }, [propsklijenta]);

  const closeModal2 = () => {
    propsklijenta.closeModal();
  };

  const changeCustomer = () => {
    api
      .put(`/kupci/izmeni-kupca/${propsklijenta.propsklijenta.id_kupca}/`, { ...form.getFieldValue() })
      .then(res => {
        propsklijenta.closeModal();
        propsklijenta.getData();
        toast.success('Uspesno ste izmenili podatke');
      })
      .catch(e => {
        propsklijenta.closeModal();
      });
  };

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          remember: true,
        }}
      >
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
              type: 'email',
              message: 'Unesite ispravan E-mail!',
            },
            {
              required: true,
              message: 'Unesite  E-mail!',
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
              <Button onClick={changeCustomer} type="primary" htmlType="submit">
                Sacuvaj Izmene
              </Button>
            )}

            <Button onClick={closeModal2} type="danger" htmlType="submit">
              {propsklijenta.preview ? 'Zatvori' : 'Otkazi'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default IzmeneKlijenta;
