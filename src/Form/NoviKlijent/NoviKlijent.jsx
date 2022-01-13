import React, { useState } from 'react';
import { Input, Button, Form, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import { api } from 'api/api';
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';

function NoviKlijent(props) {
  const url = '/kupci/kreiraj-kupca/';
  const [data, setData] = useState({
    lice: '',
    ime_prezime: '',
    email: '',
    broj_telefona: '',
    Jmbg_Pib: '',
    adresa: '',
  });

  ////funkcija za otkazi u modalu
  function hideModal() {
    props.closeModal();
  }

  function submit(e) {
    e.preventDefault();
    api
      .post(url, {
        lice: data.lice,
        ime_prezime: data.ime_prezime,
        email: data.email,
        broj_telefona: data.broj_telefona,
        Jmbg_Pib: data.Jmbg_Pib,
        adresa: data.adresa,
      })
      .then(res => {
        toast.success('Uspesno ste izmenili podatke');
        props.closeModal(); ////zatvaranje modala
        props.fetchUsers(); /////upload stranice
      })
      .catch(e => {
        toast.error('Greskaaa');
      });
  }

  //// funkcija za inpute
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  //// funkcija za select value
  function handleSelect(value) {
    const newdata = { ...data };
    newdata['lice'] = value.value;
    setData(newdata);
  }

  return (
    <div>
      <Form
        layout="vertical"
        initialValues={{
          remember: true,
        }}
      >
        <FormItem
          label="Izaberite preduzetnika"
          name="lice"
          rules={[
            {
              required: true,
              message: 'Izaberite Preduzetnika!',
            },
          ]}
        >
          <Select onChange={handleSelect} id="lice" value={data.lice} labelInValue style={{ width: 120 }}>
            <Option value="Fizicko">Fizicko Lice</Option>
            <Option value="Pravno">Pravno Lice</Option>
          </Select>
        </FormItem>

        <FormItem
          label="Ime i prezime"
          name="ime_prezime"
          rules={[
            {
              required: true,
              message: 'Unesite Ime i prezime!',
            },
          ]}
        >
          <Input
            onChange={e => handle(e)}
            id="ime_prezime"
            value={data.ime_prezime}
            size="default"
            placeholder="Ime i prezime"
            prefix={<UserOutlined />}
          />
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
            onChange={e => handle(e)}
            id="email"
            value={data.email}
            size="default"
            placeholder="E-mail"
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
          <Input
            onChange={e => handle(e)}
            id="broj_telefona"
            value={data.broj_telefona}
            size="default"
            placeholder="Broj telefona"
          />
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
          <Input onChange={e => handle(e)} id="Jmbg_Pib" value={data.Jmbg_Pib} size="default" placeholder="PIB/JMBG" />
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
          <Input onChange={e => handle(e)} id="adresa" value={data.adresa} size="default" placeholder="Adresa" />
        </FormItem>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={e => submit(e)} type="primary" htmlType="submit">
              Kreiraj Klijenta
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

export default NoviKlijent;
