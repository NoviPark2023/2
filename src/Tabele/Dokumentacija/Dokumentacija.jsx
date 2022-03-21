import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Upload, message } from 'antd';
import { authService } from 'auth/auth.service';
import { api } from 'api/api';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import getToken from 'utils/getToken';
import { useParams } from 'react-router-dom';

function Dokumentacija() {
  const activeRole = authService.getRole();

  const [editDoc, setEditDoc] = useState(false);

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  ///API state
  const [data, setData] = useState([]);
  const [file, setFile] = useState([]);
  const id = useParams();

  const handleCancel = () => {
    setEditDoc(false);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('stan', id.id);
    formData.append('file', file[0]);
    setLoaderPage();

    api
      .post('/stanovi-dms/upload-stanovi-files/', formData, {
        headers: {
          Authorization: `${getToken()}`,
        },
      })
      .then(res => {
        setFile([]);

        message.success('Uspešno!');
      })
      .catch(() => {
        message.error('Greška!');
      })
      .finally(() => {
        getData();
        setLoaderPage();
      });
  };

  const props = {
    onRemove: () => {},
    beforeUpload: file => {
      setFile([file]);

      return false;
    },
    multiple: false,
    fileList: file,
  };

  //// API lista dokumentacije
  const getData = async () => {
    setLoaderPage(true);
    api
      .get(`/stanovi-dms/?stan=${id.id}`)
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
    api.delete(`/stanovi-dms/obrisi-dokument-stana/${id_fajla}/`).then(res => {
      getData();
    });
  };

  ////Api za download
  const downloadDocument = id_fajla => {
    api.get(`/stanovi-dms/preuzmi-dokument-stana/${id_fajla}/`).then(res => {
      const link = document.createElement('a');
      link.href = res.data;
      link.download = 'Dokument';
      link.click();
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
      title: 'Naziv fajla',
      align: 'center',
      dataIndex: 'naziv_fajla',
    },
    {
      key: '3',
      title: 'Datum',
      align: 'center',
      dataIndex: 'datum_ucitavanja',
      render: dom => {
        return <span>{moment(dom).format('DD.MM.YYYY')}</span>;
      },
    },
    {
      key: '4',
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
      key: '5',
      title: 'Obriši',
      align: 'center',
      render: (text, record) => (
        <>
          <Popconfirm
            disabled={activeRole === 'Prodavac'}
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
      <div style={{ margin: 20, display: 'flex' }}>
        <Upload {...props}>
          <Button type="primary" icon={<UploadOutlined />}>
            Dodaj novi dokument
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          style={{ marginLeft: 20, display: 'flex', backgroundColor: 'limegreen' }}
        >
          Sačuvaj
        </Button>
      </div>
      <div style={{ margin: 20, display: 'flex' }}></div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: [5] }} rowKey={'id_fajla'} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large" />}
      </div>
    </div>
  );
}

export default Dokumentacija;
