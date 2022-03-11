import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Button, Upload, message } from 'antd';
import { authService } from 'auth/auth.service';
import { api } from 'api/api';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import getToken from 'utils/getToken';

function Dokumentacija(propsstan) {
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

  const props = {
    name: 'file',
    action: 'https://api.stanovi.biz/stanovi-dms/upload-stanovi-files/',
    headers: {
      Authorization: `${getToken()}`,
    },
    data: () => {
      const data = new FormData();
      // data.append('opis_dokumenta', 'opis');
      data.append('id_stana', '4');

      return data;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  //// API lista dokumentacije
  const getData = async () => {
    setLoaderPage(true);
    api
      .get(`/stanovi-dms/?stan=${propsstan.propsstan.id_stana}`)
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
  ////Api dodavanje novog dokumenta
  const createNewDocument = id_stana => {
    api.post(`/stanovi-dms/upload-stanovi-files/`, id_stana).then(res => {
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
    // {
    //   key: '2',
    //   title: 'Dokument',
    //   align: 'center',
    //   dataIndex: 'opis_dokumenta',
    // },
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
      render: dom => {
        return <span>{moment(dom).format('DD.MM.YYYY')}</span>;
      },
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
      <div style={{ margin: 20, display: 'flex' }}>
        <Upload {...props} method="POST">
          <Button
            // onClick={() => {
            //   createNewDocument(true);
            // }}
            icon={<UploadOutlined />}
            disabled={activeRole === 'Prodavac'}
            type="primary"
          >
            Dodaj novi dokument
          </Button>
        </Upload>
        {/* <div style={{ marginLeft: 20 }}>
          <Button style={{ backgroundColor: 'limegreen', color: 'blanchedalmond' }}>Sacuvaj</Button>
        </div> */}
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: [5] }} rowKey={'id_fajla'} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loaderPage && <Spin tip="Loading page" size="large" />}
      </div>
    </div>
  );
}

export default Dokumentacija;
