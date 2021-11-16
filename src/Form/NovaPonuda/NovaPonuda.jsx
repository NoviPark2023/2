import React from 'react';
import { Input, Button, Form, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import { Link } from 'react-router-dom';

function NovaPonuda() {
  return (
    <div>
      <Form
        initialValues={{
          remember: true,
        }}
      >
        <FormItem
          name="kupac"
          rules={[
            {
              required: true,
              message: 'Unesite ime kupca!',
            },
          ]}
        >
          <Input size="default" placeholder="Ime kupca" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          name="stan"
          rules={[
            {
              required: true,
              message: 'Unesite adresu stana!',
            },
          ]}
        >
          <Input size="default" placeholder="Adresa stana" prefix={<UserOutlined />} />
        </FormItem>

        <FormItem
          name="cena_stana_za_kupca"
          rules={[
            {
              required: true,
              message: 'Unesite cenu stana!',
            },
          ]}
        >
          <Input size="default" placeholder="Cena stana " prefix={<UserOutlined />} />
        </FormItem>
        <FormItem
          name="cena_stana"
          rules={[
            {
              required: true,
              message: 'Unesite cenu stana!',
            },
          ]}
        >
          <Input size="default" placeholder="cena stana" />
        </FormItem>
        <FormItem
          name="broj_ugovora"
          rules={[
            {
              required: true,
              message: 'Unesite broj ugovora!',
            },
          ]}
        >
          <Input size="default" placeholder="Broj ugovora" />
        </FormItem>
        <FormItem
          name="datum_ugovora"
          rules={[
            {
              required: true,
              message: 'Unesite datum ugovora',
            },
          ]}
        >
          <Input size="default" placeholder="Datum ugovora" />
        </FormItem>

        <FormItem
          name="nacin_placanja"
          rules={[
            {
              required: true,
              message: 'Unesite nacin placanja!',
            },
          ]}
        >
          <Select labelInValue defaultValue={{ value: 'Nacin placanja' }} style={{ width: 120 }}>
            <Option value="ceo_iznos">Ceo iznos</Option>
            <Option value="kredit">Kredit</Option>
            <Option value="na_rate">Na rate</Option>
            <Option value="ucesce">Ucesce</Option>
          </Select>
        </FormItem>
        <FormItem
          name="status_ponude"
          rules={[
            {
              required: true,
              message: 'Unesite Status!',
            },
          ]}
        >
          <Select labelInValue defaultValue={{ value: 'Status' }} style={{ width: 120 }}>
            <Option value="potencijalan">Potencijalan</Option>
            <Option value="rezervisan">Rezervisan</Option>
            <Option value="kupljen">Kupljen</Option>
          </Select>
        </FormItem>

        <Form.Item>
          <div>
            <Button type="primary" htmlType="submit">
              Kreiraj Novu Ponudu
            </Button>
            <Link to="/klijenti">
              <Button type="danger" htmlType="submit">
                Otkazi
              </Button>
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NovaPonuda;
