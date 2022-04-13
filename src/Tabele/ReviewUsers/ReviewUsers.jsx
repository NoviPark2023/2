import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Popconfirm } from 'antd';
import { api } from 'api/api';
import Users from 'Modal/Users/Users';
import 'antd/dist/antd.css';
import { Spin } from 'antd';

function ReviewUser() {
  const [user, setUser] = useState('');
  const [editUser, setEditUser] = useState(false);
  const [createUser, setCreateUser] = useState(false);

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  /////modal za dodaj
  const showModal = id => {
    setEditUser(id);
  };

  const handleOk = () => {
    setEditUser(false);
  };

  const handleCancel = () => {
    setEditUser(false);
  };

  //state za API
  const [data, setData] = useState([]);

  ////Api Lista Korisnika
  const getData = () => {
    setLoaderPage(true);
    api
      .get('/korisnici/')
      .then(res => {
        setData(res.data);
      })
      .finally(() => {
        setLoaderPage(false);
      });
  };

  ///api za brisanje korisnika
  const deleteUser = id => {
    api.delete(`/korisnici/obrisi-korisnika/${id}/`).then(res => {
      getData();
    });
  };

  const columns = [
    {
      key: '1',
      title: 'Ime',
      align: 'center',
      dataIndex: 'ime',
    },
    {
      key: '2',
      title: 'Prezime',
      align: 'center',
      dataIndex: 'prezime',
    },
    {
      key: '3',
      title: 'E-mail',
      align: 'center',
      dataIndex: 'email',
    },
    {
      key: '4',
      title: 'Korisničko ime',
      align: 'center',
      dataIndex: 'username',
    },
    {
      key: '5',
      title: 'Tip korisnika',
      align: 'center',
      dataIndex: 'role',
    },

    {
      key: '6',
      title: 'Izmeni',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              showModal(true);
              setUser(record);
            }}
          >
            Izmeni
          </Button>
        </div>
      ),
    },

    {
      title: 'Obriši',
      align: 'center',
      key: '7',
      render: (text, record) => (
        <>
          <Popconfirm
            title="Da li ste sigurni da želite da izbrišete korisnika?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteUser(record.id)}
          >
            <Button type="danger">Obriši</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div style={{ margin: 20 }}>
        <Button
          type="primary"
          onClick={() => {
            setCreateUser(true);
          }}
        >
          Dodaj novog korisnika
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 'calc(100vh - 265px)' }} rowKey="id" />
      <Modal title="Izmeni korisnika" visible={editUser} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Users edit propskorisnika={user} getData={getData} closeModal={() => showModal(false)} />
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Kreiranje korisnika"
        visible={createUser}
        onOk={handleOk}
        onCancel={() => setCreateUser(false)}
        footer={null}
      >
        <Users propskorisnika={user} getData={getData} closeModal={() => setCreateUser(false)} />
      </Modal>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large" />}
      </div>
    </div>
  );
}

export default ReviewUser;
