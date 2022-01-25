/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Input, Button, Form, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import { api } from 'api/api';
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';

function ChangeUser(propskorisnika) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (propskorisnika.edit) {
      form.setFieldsValue({
        ime: propskorisnika.propskorisnika.ime,
        prezime: propskorisnika.propskorisnika.prezime,
        email: propskorisnika.propskorisnika.email,
        username: propskorisnika.propskorisnika.username,
        password: propskorisnika.propskorisnika.password,
        role: propskorisnika.propskorisnika.role,
      });
    }
  }, [propskorisnika]);

  const Modal = () => {
    propskorisnika.closeModal();
  };

  const succses = () => {
    propskorisnika.closeModal();
    propskorisnika.getData();
  };

  const sucsessMessages = value => {
    toast.success(value);
  };

  const errorMessages = value => {
    toast.error(value);
  };

  const createUser = values => {
    const endpoint = '/korisnici/kreiraj-korisnika/';
    api
      .post(endpoint, values)
      .then(res => {
        succses();
        sucsessMessages('uspesno');
      })
      .catch(res => {
        console.log(res, 'greska');
        errorMessages('greska');
      });
  };

  const changeUser = (id, values) => {
    const endpoint = `/korisnici/izmeni-korisnika/${id}/`;
    api
      .put(endpoint, values)
      .then(res => {
        succses();
        sucsessMessages('uspesno');
      })
      .catch(res => {
        errorMessages('greska');
      });
  };

  const changeUsers = values => {
    propskorisnika.edit ? changeUser(propskorisnika.propskorisnika.id, values) : createUser(values);
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
              message: 'Unesite  E-mail!',
            },
            {
              type: 'email',
              message: 'Unesite ispravan E-mail!',
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
          label="Korisnik"
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
            <Button type="primary" htmlType="submit">
              {propskorisnika.edit ? 'Izmeni' : 'Dodaj'}
            </Button>

            <Button onClick={Modal} type="danger" htmlType="submit">
              Otkazi
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangeUser;
