import React, { useState } from 'react';
import { Input, Button, Form, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Option } from 'antd/lib/mentions';
import { api } from 'api/api';

function KreiranjeNoveCene(props) {
  const [form] = Form.useForm();
  const url = '/stanovi/kreiraj-cenu-kvadrata';
  const [data, setData] = useState({
    sprat: '',
    broj_soba: '',
    orijentisanost: '',
    cena_kvadrata: '',
  });
  ////funkcija za otkazi u modalu
  function hideModal() {
    props.closeModal();
  }

  function submit(e) {
    e.preventDefault();
    api
      .post(url, {
        sprat: data.sprat,
        broj_soba: data.broj_soba,
        orijentisanost: data.orijentisanost,
        cena_kvadrata: data.cena_kvadrata,
      })
      .then(res => {
        props.closeModal(); ////zatvaranje modala
      });
  }
  ////funkcija za pozivanje input-a
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  //// funkcija za pozivanje select-a
  function handleSelect(value) {
    const newdata = { ...data };
    newdata['sprat'] = value.value;
    setData(newdata);
  }
  function handleSelect2(value) {
    const newdata = { ...data };
    newdata['broj_soba'] = value.value;
    setData(newdata);
  }
  function handleSelect3(value) {
    const newdata = { ...data };
    newdata['orijentisanost'] = value.value;
    setData(newdata);
  }

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          remember: true,
        }}
      >
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
          <Select
            onChange={handleSelect}
            id="sprat"
            value={data.sprat}
            labelInValue
            defaultValue={{ value: 'Sprat' }}
            style={{ width: 120 }}
          >
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
          <Select
            onChange={handleSelect2}
            id="broj_soba"
            value={data.broj_soba}
            labelInValue
            defaultValue={{ value: 'Broj soba' }}
            style={{ width: 120 }}
          >
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
          <Select
            onChange={handleSelect3}
            id="orijentisanost"
            value={data.orijentisanost}
            labelInValue
            defaultValue={{ value: ' Orijentisanost' }}
            style={{ width: 120 }}
          >
            <Option value="Sever">Sever</Option>
            <Option value="Jug">Jug</Option>
          </Select>
        </FormItem>

        <FormItem
          label="Cena kvadrata"
          name="cena_kvadrata"
          rules={[
            {
              required: true,
              message: 'Unesite cenu kvadrata!',
            },
          ]}
        >
          <Input
            id="cena_kvadrata"
            value={data.cena_kvadrata}
            onChange={e => handle(e)}
            size="default"
            placeholder="Cena kvadrata"
          />
        </FormItem>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={e => submit(e)} type="primary" htmlType="submit">
              Kreiraj Novu Cenu
            </Button>

            <Button onClick={hideModal} type="danger" htmlType="submit">
              Otkazi
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default KreiranjeNoveCene;
