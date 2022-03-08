import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Upload } from 'antd';
import { authService } from 'auth/auth.service';
import { api } from 'api/api';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';

function DokumentacijaLokala() {
  const activeRole = authService.getRole();

  const [editDoc, setEditDoc] = useState(false);

  // const handleOk = () => {
  //   setEditDoc(false);
  // };

  const handleCancel = () => {
    setEditDoc(false);
  };

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  ///API state
  const [data, setData] = useState([]);

  //// API lista dokumentacije
  const getData = async () => {
    setLoaderPage(true);
    api
      .get('/lokali-dms/')
      .then(res => {
        if (res) {
          setData(res.data.results);
        }
      })
      .finally(() => {
        setLoaderPage(false);
      });
  };

  ////Api za brisanje dokumentacije
  const deleteDocument = id_fajla => {
    api.delete(`/lokali-dms/obrisi-dokument-lokala/${id_fajla}/`).then(res => {
      getData();
    });
  };

  ////Api za download
  const downloadDocument = id_fajla => {
    api.get(`/lokali-dms/preuzmi-dokument-lokala/${id_fajla}/`).then(res => {
      const link = document.createElement('a');
      link.href = res.data;
      link.download = 'Dokument';
      link.click();
    });
  };
  ////Api dodavanje novog dokumenta
  const createNewDocument = () => {
    api.put(`/lokali-dms/upload-lokala-files/`).then(res => {
      setData(res.data.results);
    });
  };

  const columns = [
    {
      key: '1',
      title: 'ID',
      align: 'center',
      dataIndex: 'id_fajla',
    },
    {
      key: '2',
      title: 'Dokument',
      align: 'center',
      dataIndex: 'opis_dokumenta',
    },
    {
      key: '3',
      title: 'Naziv fajla',
      align: 'center',
      dataIndex: 'naziv_fajla',
    },
    {
      key: '4',
      title: 'Datum',
      align: 'center',
      dataIndex: 'datum_ucitavanja',
    },
    {
      key: '5',
      title: 'Preuzmi',
      align: 'center',
      render: (text, record) => (
        <>
          <Button
            disabled={activeRole === 'Prodavac'}
            type="primary"
            onClick={() => {
              downloadDocument(record.id_fajla);
            }}
          >
            Preuzmi
          </Button>
        </>
      ),
    },
    {
      key: '6',
      title: 'Obriši',
      align: 'center',
      render: (text, record) => (
        <>
          <Popconfirm
            disabled={activeRole === 'Prodavac'}
            // visible={editDoc}
            // onOk={handleOk}
            title="Da li ste sigurni da želite da izbrišete dokument?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteDocument(record.id_fajla)}
          >
            <Button disabled={activeRole === 'Prodavac'} type="danger">
              Obriši
            </Button>
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
        <Upload>
          <Button
            icon={<UploadOutlined />}
            disabled={activeRole === 'Prodavac'}
            type="primary"
            onClick={() => {
              createNewDocument(true);
            }}
          >
            Dodaj novi dokument
          </Button>
        </Upload>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: [5] }} rowKey={'id_fajla'} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large" />}
      </div>
    </div>
  );
}

export default DokumentacijaLokala;
