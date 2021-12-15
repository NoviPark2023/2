/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Input, Button, Form, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import { api } from 'api/api';
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';

function IzmenaKorisnika(propskorisnika) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ime: propskorisnika.propskorisnika.ime,
      prezime: propskorisnika.propskorisnika.prezime,
      email: propskorisnika.propskorisnika.email,
      username: propskorisnika.propskorisnika.username,
      password: propskorisnika.propskorisnika.password,
      role: propskorisnika.propskorisnika.role,
    });
  }, [propskorisnika]);

  const closeModal2 = () => {
    propskorisnika.closeModal();
  };

  const newUser = () => {
    api
      .put(`/korisnici/izmeni-korisnika/${propskorisnika.propskorisnika.id}/`, { ...form.getFieldValue() })
      .then(res => {
        propskorisnika.closeModal();
        propskorisnika.getData();
        toast.success('Uspesno ste izmenili podatke');
      })
      .catch(e => {
        propskorisnika.closeModal();
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
          label="Ime"
          name="ime"
          rules={[
            {
              required: true,
              message: 'Unesite ime!',
            },
          ]}
        >
          <Input id="ime" size="default" placeholder="Ime" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          label="Prezime"
          name="prezime"
          rules={[
            {
              required: true,
              message: 'Unesite prezime!',
            },
          ]}
        >
          <Input id="prezime" size="default" placeholder="Prezime" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Unesite E-mail!',
            },
          ]}
        >
          <Input id="email" size="default" placeholder="E-mail" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          label="Korisnicko ime"
          name="username"
          rules={[
            {
              required: true,
              message: 'Unesite Korisnicko ime!',
            },
          ]}
        >
          <Input id="username" size="default" placeholder="Korisnicko ime" />
        </FormItem>
        <FormItem
          label="Lozinka"
          name="password"
          rules={[
            {
              required: true,
              message: 'Unesite Lozinku!',
            },
          ]}
        >
          <Input id="password" size="default" placeholder="Lozinka" />
        </FormItem>

        <FormItem
          name="role"
          rules={[
            {
              required: true,
              message: 'Izaberite Korisnika!',
            },
          ]}
        >
          <Select id="role" value={form.getFieldsValue().role} style={{ width: 120 }}>
            <Option value="Prodavac">Prodavac </Option>
            <Option value="Finansije">Finansije</Option>
            <Option value="Administrator">Administrator</Option>
          </Select>
        </FormItem>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={newUser} type="primary" htmlType="submit">
              Izmeni Korisnika
            </Button>

            <Button onClick={closeModal2} type="danger" htmlType="submit">
              Otkazi
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default IzmenaKorisnika;
