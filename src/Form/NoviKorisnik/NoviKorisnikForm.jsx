import React, { useState } from 'react';
import { Input, Button, Form, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { UserOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import { api } from 'api/api';
import 'antd/dist/antd.css';
import { toast } from 'react-toastify';

function NoviKorisnik(props) {
  const url = '/korisnici/kreiraj-korisnika/';
  const [data, setData] = useState({
    ime: '',
    prezime: '',
    email: '',
    username: '',
    password: '',
    role: '',
  });
  ////funkcija za otkazi u modalu
  function hideModal() {
    props.closeModal();
  }

  function submit(e) {
    e.preventDefault();
    api
      .post(url, {
        ime: data.ime,
        prezime: data.prezime,
        email: data.email,
        username: data.username,
        password: data.password,
        role: data.role,
      })
      .then(res => {
        console.log(res.data);
        props.closeModal(); ////zatvaranje modala
        props.fetchUsers(); /////upload stranice
        toast.success('Uspesno ste izmenili podatke');
      });
  }

  ////funkcija za pozivanje input-a
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }
  //// funkcija za pozivanje select-a
  function handleSelect(value) {
    const newdata = { ...data };
    newdata['role'] = value.value;
    setData(newdata);
    console.log(value.label);
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
          label="Ime"
          name="ime"
          rules={[
            {
              required: true,
              message: 'Unesite ime!',
            },
          ]}
        >
          <Input
            onChange={e => handle(e)}
            id="ime"
            value={data.ime}
            size="default"
            placeholder="Ime"
            prefix={<UserOutlined />}
          />
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
          <Input
            onChange={e => handle(e)}
            id="prezime"
            value={data.prezime}
            size="default"
            placeholder="Prezime"
            prefix={<UserOutlined />}
          />
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
          label="Korisnicko ime"
          name="username"
          rules={[
            {
              required: true,
              message: 'Unesite Korisnicko ime!',
            },
          ]}
        >
          <Input
            id="username"
            value={data.username}
            onChange={e => handle(e)}
            size="default"
            placeholder="Korisnicko ime"
          />
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
          <Input id="password" value={data.password} onChange={e => handle(e)} size="default" placeholder="Lozinka" />
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
          <Select
            onChange={handleSelect}
            id="role"
            value={data.role}
            labelInValue
            defaultValue={{ value: 'Korisnik' }}
            style={{ width: 120 }}
          >
            <Option value="Prodavac">Prodavac </Option>
            <Option value="Finansije">Finansije</Option>
            <Option value="Administrator">Administrator</Option>
          </Select>
        </FormItem>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={e => submit(e)} type="primary" htmlType="submit">
              Kreiraj Korisnika
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

export default NoviKorisnik;
