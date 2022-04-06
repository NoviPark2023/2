import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Upload, message } from 'antd';
// import { authService } from 'auth/auth.service';
import { api } from 'api/api';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import getToken from 'utils/getToken';
import moment from 'moment';
import { useParams } from 'react-router-dom';

function DocumentationLocal() {
  // const activeRole = authService.getRole();
  const [, setEditDoc] = useState(false);
  const [upload, setUpload] = useState(false);

  const handleCancel = () => {
    setEditDoc(false);
  };

  ///loader
  const [loaderPage, setLoaderPage] = useState(false);

  ///API state
  const [data, setData] = useState([]);
  const [file, setFile] = useState();
  const id = useParams();

  //// API lista dokumentacije
  const getData = async () => {
    setLoaderPage(true);
    api
      .get(`/lokali-dms/?lokal=${id.id}`)
      .then(res => {
        if (res) {
          setData(res.data.results);
        }
      })
      .finally(() => {
        setLoaderPage(false);
        setUpload(false);
      });
  };

  ////Api za brisanje dokumentacije
  const deleteDocument = id_fajla => {
    setLoaderPage(true);
    api.delete(`/lokali-dms/obrisi-dokument-lokala/${id_fajla}/`).then(res => {
      getData();
    });
  };

  ////Api za download
  const downloadDocument = id_fajla => {
    api.get(`/lokali-dms/preuzmi-dokument-lokala/${id_fajla}/`).then(res => {
      setLoaderPage(false);
      const link = document.createElement('a');
      link.href = res.data;
      link.download = 'Dokument';
      link.click();
    });
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('lokal', id.id);
    formData.append('file', file[0]);
    setLoaderPage();

    api
      .post('/lokali-dms/upload-lokala-files/', formData, {
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

  const columns = [
    {
      key: '1',
      title: 'Naziv fajla',
      align: 'center',
      dataIndex: 'naziv_fajla',
    },
    {
      key: '2',
      title: 'Datum',
      align: 'center',
      dataIndex: 'datum_ucitavanja',
      render: dom => {
        return <span>{moment(dom).format('DD.MM.YYYY')}</span>;
      },
    },
    {
      key: '3',
      title: 'Preuzmi',
      align: 'center',
      render: (text, record) => (
        <>
          <Button
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
      key: '4',
      title: 'Obriši',
      align: 'center',
      render: (text, record) => (
        <>
          <Popconfirm
            title="Da li ste sigurni da želite da izbrišete dokument?"
            placement="left"
            onCancel={handleCancel}
            cancelText="NE"
            okText="DA"
            onConfirm={() => deleteDocument(record.id_fajla)}
          >
            <Button type="danger">Obriši</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div style={{ margin: 20, display: 'flex' }}>
        <Upload {...props}>
          <Button
            onClick={() => {
              setUpload(true);
            }}
            type="primary"
            icon={<UploadOutlined />}
          >
            Dodaj novi dokument
          </Button>
        </Upload>
        <Button
          disabled={upload ? false : true}
          type="primary"
          onClick={handleUpload}
          style={{ marginLeft: 20, display: 'flex', backgroundColor: 'limegreen' }}
        >
          Sačuvaj
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: [5] }} rowKey={'id_fajla'} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large" />}
      </div>
    </div>
  );
}

export default DocumentationLocal;
