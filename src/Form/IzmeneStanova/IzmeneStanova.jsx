import React, { useEffect } from 'react';
import { Input, Button, Form, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Option } from 'antd/lib/mentions';
import 'antd/dist/antd.css';
import { api } from 'api/api';

function IzmeneStanova(propsstan) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (propsstan.edit) {
      form.setFieldsValue({
        lamela: propsstan.propsstan.lamela,
        adresa_stana: propsstan.propsstan.adresa_stana,
        kvadratura: propsstan.propsstan.kvadratura,
        sprat: propsstan.propsstan.sprat,
        broj_soba: propsstan.propsstan.broj_soba,
        orijentisanost: propsstan.propsstan.orijentisanost,
        broj_terasa: propsstan.propsstan.broj_terasa,
        cena_stana: propsstan.propsstan.cena_stana,
        status_prodaje: propsstan.propsstan.status_prodaje,
      });
    }
  }, [propsstan]);

  const closeModal2 = () => {
    propsstan.closeModal();
  };

  const updateApartmenstObj = () => {
    const endpoint = propsstan.edit ? `/stanovi/izmeni-stan/${propsstan.propsstan.id_stana}` : '/stanovi/kreiraj-stan';

    const request = propsstan.edit ? api.put : api.post;

    request(endpoint, { ...form.getFieldValue() })
      .then(res => {
        propsstan.closeModal();
        propsstan.getData();
      })
      .catch(e => {
        propsstan.closeModal();
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
          label="Adresa stana"
          name="adresa_stana"
          rules={[
            {
              required: true,
              message: 'Unesite adresu stana!',
            },
          ]}
        >
          <Input size="default" placeholder="Adresa stana" />
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
          label="Sprat"
          name="sprat"
          rules={[
            {
              required: true,
              message: 'Unesite Sprat!',
            },
          ]}
        >
          <Input size="default" placeholder="Sprat" />
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
          <Input size="default" placeholder="Broj soba" />
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
            <Option value="Zapad">Zapad</Option>
            <Option value="Jug">Jug</Option>
            <Option value="Istok">Istok</Option>
          </Select>
        </FormItem>
        <FormItem
          label="Broj terasa"
          name="broj_terasa"
          rules={[
            {
              required: true,
              message: 'Unesite Broj terasa!',
            },
          ]}
        >
          <Input size="default" placeholder="Broj terasa" />
        </FormItem>
        <FormItem
          label="Cena stana"
          name="cena_stana"
          rules={[
            {
              required: true,
              message: 'Unesite cenu stana!',
            },
          ]}
        >
          <Input size="default" placeholder="Cena stana" />
        </FormItem>

        <FormItem
          label="Status"
          name="status_prodaje"
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
            <Button onClick={updateApartmenstObj} type="primary" htmlType="submit">
              {propsstan.edit ? 'Izmeni' : 'Dodaj'}
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

export default IzmeneStanova;
