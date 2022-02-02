import React, { useEffect } from 'react';
import { Input, Button, Form, Select, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Option } from 'antd/lib/mentions';
import 'antd/dist/antd.css';
import { api } from 'api/api';
import { toast } from 'react-toastify';

function Lokali() {
  const [form] = Form.useForm();
  return (
    <div>
      <Form autoComplete="off" layout="vertical" form={form}>
        <FormItem
          label="Lamela"
          name="lamela"
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
          name="kvadratura"
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
          label="Broj soba"
          name="broj_soba"
          rules={[
            {
              required: true,
              message: 'Unesite broj soba!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().broj_soba} style={{ width: 120 }}>
            <Option value="1.0">1</Option>
            <Option value="1.5">1.5</Option>
            <Option value="2.0">2</Option>
            <Option value="2.5">2.5</Option>
            <Option value="3.0">3</Option>
            <Option value="3.5">3.5</Option>
            <Option value="4.0">4</Option>
            <Option value="4.5">4.5</Option>
            <Option value="5.0">5</Option>
            <Option value="5.5">5.5</Option>
            <Option value="6.0">6</Option>
          </Select>
        </FormItem>
        <FormItem
          label="Orijentisanost"
          name="orijentisanost"
          rules={[
            {
              required: true,
              message: 'Unesite orijentisanost!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().orijentisanost} style={{ width: 120 }}>
            <Option value="Sever">Sever</Option>
            <Option value="Jug">Jug</Option>
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

        <FormItem
          label="Status"
          name="status_lokala"
          rules={[
            {
              required: true,
              message: 'Unesite Status!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().status_prodaje} style={{ width: 120 }}>
            <Option value="dostupan">Dostupan</Option>
            <Option value="rezervisan">Rezervisan</Option>
            <Option value="prodat">Prodat</Option>
          </Select>
        </FormItem>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" htmlType="submit">
              Dodaj
            </Button>

            <Button type="danger">Otkaži</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Lokali;
