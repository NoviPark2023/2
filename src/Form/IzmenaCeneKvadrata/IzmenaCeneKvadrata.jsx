/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Input, Button, Form, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { api } from 'api/api';
import { Option } from 'antd/lib/mentions';
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';

function IzmenaCeneKvadrata(propscenakvadrata) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (propscenakvadrata.edit) {
      console.log(propscenakvadrata, 'aleksa');
      form.setFieldsValue({
        sprat: propscenakvadrata.propscenakvadrata.sprat,
        broj_soba: propscenakvadrata.propscenakvadrata.broj_soba,
        orijentisanost: propscenakvadrata.propscenakvadrata.orijentisanost,
        cena_kvadrata: propscenakvadrata.propscenakvadrata.cena_kvadrata,
      });
    }
  }, [propscenakvadrata]);

  const closeModal2 = () => {
    propscenakvadrata.closeModal();
  };

  const succses = () => {
    propscenakvadrata.closeModal();
    propscenakvadrata.listOfPrice();
  };

  const sucsessMessages = value => {
    toast.success(value);
  };

  const errorMessages = value => {
    toast.error(value);
  };

  const editCenaStanova = (id_azur_cene, values) => {
    const endpoint = `/stanovi/promeni-cenu-kvadrata/${id_azur_cene}`;
    api
      .put(endpoint, values)
      .then(res => {
        succses();
        sucsessMessages('uspesno');
      })
      .catch(e => {
        errorMessages('greska');
      });
  };

  const kreiranjeCeneStana = values => {
    const endpoint = '/stanovi/kreiraj-cenu-kvadrata';
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

  const izmeniCenuStana = values => {
    propscenakvadrata.edit
      ? editCenaStanova(propscenakvadrata.propscenakvadrata.id_azur_cene, values)
      : kreiranjeCeneStana(values);
  };
  const onFinish = values => {
    izmeniCenuStana(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
        <FormItem
          label="Sprat"
          name="sprat"
          rules={[
            {
              required: true,
              message: 'Izaberite Sprat!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().sprat} style={{ width: 120 }}>
            <Option value="1.0">1</Option>
            <Option value="2.0">2</Option>
            <Option value="3.0">3</Option>
            <Option value="4.0">4</Option>
            <Option value="5.0">5</Option>
            <Option value="6.0">6</Option>
            <Option value="7.0">7</Option>
            <Option value="PS">PS</Option>
          </Select>
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
          label="Cena Kvadrata"
          name="cena_kvadrata"
          rules={[
            {
              required: true,
              message: 'Unesite cenu kvadrata!',
            },
          ]}
        >
          <Input size="default" placeholder="Cena kvadrata" />
        </FormItem>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" htmlType="submit">
              {propscenakvadrata.edit ? 'Izmeni' : 'Dodaj'}
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

export default IzmenaCeneKvadrata;
