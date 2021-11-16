import React, { useState } from 'react';
import { Input, Button, Form, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import style from './NoviStan.module.css';
import { Option } from 'antd/lib/mentions';
import { Link } from 'react-router-dom';
import { api } from 'api/api';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';

function NoviStan() {
  const history = useHistory();
  const url = '/stanovi/kreiraj-stan';
  /////treba li sve ovo?????
  const [data, setData] = useState({
    lamela: '',
    adresa_stana: '',
    kvadratura: '',
    sprat: '',
    broj_soba: '',
    orijentisanost: '',
    broj_terasa: '',
    cena_stana: '',
    status_prodaje: '',
  });
  ////////////
  function submit(e) {
    e.preventDefault();
    api
      .post(url, {
        lamela: data.lamela,
        adresa_stana: data.adresa_stana,
        kvadratura: data.kvadratura,
        sprat: data.sprat,
        broj_soba: data.braj_soba,
        orijentisanost: data.orijentisanost,
        broj_terasa: data.broj_terasa,
        cena_stana: data.stana,
        status_prodaje: data.status_prodaje,
      })
      .then(res => {
        history.push('/stanovi');
      });
  }
  ////treba li ovo????
  //// funkcija za pozivanje input-a
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }
  ///// funkcija za pozivanje select-a
  function handleSelect(value) {
    const newdata = { ...data };
    newdata['orijentisanost'] = value.value;
    setData(newdata);
    console.log(value.label);
  }

  /// TODO: istrazi ovu funkciju, zasto pises duplu?
  function handleSelect2(value) {
    const newdata = { ...data };
    newdata['status_prodaje'] = value.value;
    setData(newdata);
    console.log(value.label);
  }

  return (
    <div className={style.formaStana}>
      <Form
        layout="vertical"
        initialValues={{
          remember: true,
        }}
      >
        <FormItem
          name="lamela"
          rules={[
            {
              required: true,
              message: 'Unesite Lamelu!',
            },
          ]}
        >
          <Input onChange={e => handle(e)} id="lamela" value={data.lamela} size="default" placeholder="Lamela" />
        </FormItem>
        <FormItem
          name="adresa_stana"
          rules={[
            {
              required: true,
              message: 'Unesite adresu stana!',
            },
          ]}
        >
          <Input
            onChange={e => handle(e)}
            id="adresa_stana"
            value={data.adresa_stana}
            size="default"
            placeholder="Adresa stana"
          />
        </FormItem>
        <FormItem
          name="kvadratura"
          rules={[
            {
              required: true,
              message: 'Unesite Kvadraturu!',
            },
          ]}
        >
          <Input
            onChange={e => handle(e)}
            id="kvadratura"
            value={data.kvadratura}
            size="default"
            placeholder="Kvadratura"
          />
        </FormItem>
        <FormItem
          name="sprat"
          rules={[
            {
              required: true,
              message: 'Unesite Sprat!',
            },
          ]}
        >
          <Input onChange={e => handle(e)} id="sprat" value={data.sprat} size="default" placeholder="Sprat" />
        </FormItem>
        <FormItem
          name="broj_soba"
          rules={[
            {
              required: true,
              message: 'Unesite broj soba!',
            },
          ]}
        >
          <Input
            onChange={e => handle(e)}
            id="broj_soba"
            value={data.broj_soba}
            size="default"
            placeholder="Broj soba"
          />
        </FormItem>
        <FormItem
          name="orijentisanost"
          rules={[
            {
              required: true,
              message: 'Unesite orijentisanost!',
            },
          ]}
        >
          <Select
            onChange={handleSelect}
            id="orijentisanost"
            value={data.orijentisanost}
            labelInValue
            defaultValue={{ value: 'orijentisanost' }}
            style={{ width: 120 }}
          >
            <Option value="Sever">Sever</Option>
            <Option value="Jug">Jug</Option>
            <Option value="Istok">Istok</Option>
            <Option value="Zapad">Zapad</Option>
          </Select>
        </FormItem>
        <FormItem
          name="broj_terasa"
          rules={[
            {
              required: true,
              message: 'Unesite Broj terasa!',
            },
          ]}
        >
          <Input
            onChange={e => handle(e)}
            id="broj_terasa"
            value={data.broj_terasa}
            size="default"
            placeholder="Broj terasa"
          />
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
          <Input
            onChange={e => handle(e)}
            id="cena_stana"
            value={data.cena_stana}
            size="default"
            placeholder="Cena stana"
          />
        </FormItem>

        <FormItem
          name="status_prodaje"
          rules={[
            {
              required: true,
              message: 'Unesite Status!',
            },
          ]}
        >
          <Select
            onChange={handleSelect2}
            id="status_prodaje"
            value={data.status_prodaje}
            labelInValue
            defaultValue={{ value: 'Status' }}
            style={{ width: 120 }}
          >
            <Option value="dostupan">Dostupan</Option>
            <Option value="rezervisan">Rezervisan</Option>
            <Option value="prodat">Prodat</Option>
          </Select>
        </FormItem>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={e => submit(e)} type="primary" htmlType="submit">
              Kreiranje Novog stana
            </Button>

            <Link to="/stanovi">
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

export default NoviStan;
