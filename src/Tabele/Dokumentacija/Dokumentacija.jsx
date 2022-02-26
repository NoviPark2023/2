import React from 'react';
import { Button, Table } from 'antd';

function Dokumentacija() {
  const columns = [
    {
      title: 'DOKUMENTACIJA',
      dataIndex: 'name',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Ugovor stana',
      age: 'lokala',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Ugovor lokala',
      age: 'stana',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Ugovor garaze',
      age: 'garaze',
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: [5] }} />
    </div>
  );
}

export default Dokumentacija;
