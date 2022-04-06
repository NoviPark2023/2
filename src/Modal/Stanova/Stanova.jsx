/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input, Button, Form, Select, Checkbox, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Option } from 'antd/lib/mentions';
import 'antd/dist/antd.css';
import { api } from 'api/api';
import { toast } from 'react-toastify';

function ChangeApartments(propsstan) {
  const [price, setPrice] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({});
    if (propsstan.edit) {
      form.setFieldsValue({
        lamela: propsstan.propsstan.lamela,
        kvadratura: propsstan.propsstan.kvadratura,
        sprat: propsstan.propsstan.sprat,
        broj_soba: propsstan.propsstan.broj_soba,
        orijentisanost: propsstan.propsstan.orijentisanost,
        broj_terasa: propsstan.propsstan.broj_terasa,
        cena_stana: propsstan.propsstan.cena_stana,
        unesena_mauelna_cena_stana: propsstan.propsstan.unesena_mauelna_cena_stana,
      });
      if (propsstan.propsstan.unesena_mauelna_cena_stana) {
        setPrice(true);
      } else setPrice(false);
    }
  }, [propsstan]);

  const closeModal2 = () => {
    propsstan.closeModal();
  };
  const succses = () => {
    propsstan.closeModal();
    propsstan.getData();
  };

  const sucsessMessages = value => {
    toast.success(value);
  };

  const errorMessages = value => {
    toast.error(value);
  };

  const editStanova = (id, values) => {
    const endpoint = `/stanovi/izmeni-stan/${id}`;
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
  const createApartmens = values => {
    const endpoint = '/stanovi/kreiraj-stan';
    api
      .post(endpoint, values)
      .then(res => {
        succses();
        sucsessMessages('uspesno');
      })
      .catch(error => {
        if (error.data.lamela) {
          message.error({
            content: 'Stan sa ovom Lamelom je vec registrovan u sistemu !',
            className: 'custom-class',
            style: {
              marginTop: '0vh',
              fontSize: 20,
            },
          });
        }
        if (error.data.detail) {
          message.error({
            content: 'Ažuriranje cena za ovu konfiguraciju stana ne postoji u sistemu !',
            className: 'custom-class',
            style: {
              marginTop: '0vh',
              fontSize: 20,
            },
          });
        }
      });
  };

  const updateApartmenstObj = values => {
    propsstan.edit ? editStanova(propsstan.propsstan.id_stana, values) : createApartmens(values);
  };
  const onFinish = values => {
    updateApartmenstObj(values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form autoComplete="off" layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
          label="Broj terasa"
          name="broj_terasa"
          rules={[
            {
              required: true,
              message: 'Unesite Broj terasa!',
            },
          ]}
        >
          <Select value={form.getFieldsValue().broj_terasa} style={{ width: 120 }}>
            <Option value="0">0</Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        </FormItem>
        <FormItem
          label="Cena stana"
          name="cena_stana"
          rules={[
            {
              required: false,
              message: 'Unesite cenu stana!',
            },
          ]}
        >
          <Input disabled={price ? false : true} size="default" placeholder="Cena stana" />
        </FormItem>

        <FormItem
          label="Manuelna izmena cene stana"
          name="unesena_mauelna_cena_stana"
          valuePropName="checked"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Checkbox
            checked={form.getFieldsValue().unesena_mauelna_cena_stana}
            onChange={value => {
              form.setFieldsValue({
                unesena_mauelna_cena_stana: value.target.checked,
              });
              setPrice(value.target.checked);
            }}
          />
        </FormItem>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" htmlType="submit">
              {propsstan.edit ? 'Izmeni' : 'Dodaj'}
            </Button>

            <Button onClick={closeModal2} type="danger">
              Otkazi
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangeApartments;
