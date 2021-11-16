import React from 'react';
import { Input, Button, Form, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Option } = Select;

function AdminKorisnik() {
  return (
    <div>
      <Form
        initialValues={{
          remember: true,
        }}
      >
        <FormItem
          name="username"
          rules={[
            {
              required: true,
              message: 'Unesite ime!',
            },
          ]}
        >
          <Input size="default" placeholder="Ime" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          name="username"
          rules={[
            {
              required: true,
              message: 'Unesite prezime!',
            },
          ]}
        >
          <Input size="default" placeholder="Prezime" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          name="username"
          rules={[
            {
              required: true,
              message: 'Unesite Korisničko ime!',
            },
          ]}
        >
          <Input size="default" placeholder="Korisničko ime" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          name="username"
          rules={[
            {
              required: true,
              message: 'Izaberite Korisnika!',
            },
          ]}
        >
          <Select labelInValue defaultValue={{ value: 'Korisnik' }} style={{ width: 120 }}>
            <Option value="jack">Adminstrator</Option>
            <Option value="lucy">Prodavac</Option>
          </Select>
          ,
        </FormItem>
        <FormItem
          name="password"
          rules={[
            {
              required: true,
              message: 'Unesite lozinku!',
            },
          ]}
        >
          <Input.Password size="default" placeholder="Lozinka" prefix={<LockOutlined />} />
        </FormItem>
        <Form.Item>
          <div>
            <Button type="primary" htmlType="submit">
              Izmeni
            </Button>

            <Button type="primary" htmlType="submit">
              Kreiraj Korisnika
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AdminKorisnik;
