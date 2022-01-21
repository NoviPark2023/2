import React, { useEffect, useState } from 'react';
import { api } from 'api/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Graph(propsstan) {
  const [data, setData] = useState({});
  const getData = () => {
    api.get(`/stanovi/ponude-stana-meseci/${propsstan.propsstan.id_stana}`).then(res => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const offerByMonths = data.broj_ponuda_po_mesecima
    ? [
        { name: 'jan', pv: data.broj_ponuda_po_mesecima[0].jan },
        { name: 'feb', pv: data.broj_ponuda_po_mesecima[0].feb },
        { name: 'mar', pv: data.broj_ponuda_po_mesecima[0].mart },
        { name: 'apr', pv: data.broj_ponuda_po_mesecima[0].apr },
        { name: 'maj', pv: data.broj_ponuda_po_mesecima[0].maj },
        { name: 'jun', pv: data.broj_ponuda_po_mesecima[0].jun },
        { name: 'jul', pv: data.broj_ponuda_po_mesecima[0].jul },
        { name: 'avg', pv: data.broj_ponuda_po_mesecima[0].avg },
        { name: 'sep', pv: data.broj_ponuda_po_mesecima[0].sep },
        { name: 'okt', pv: data.broj_ponuda_po_mesecima[0].okt },
        { name: 'nov', pv: data.broj_ponuda_po_mesecima[0].nov },
        { name: 'dec', pv: data.broj_ponuda_po_mesecima[0].dec },
      ]
    : [];
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Ukupan broj ponuda po mesecima</h3>
      <BarChart
        width={600}
        height={300}
        data={offerByMonths}
        margin={{
          top: 5,
          right: 5,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="pv" fill="#0A5474" background={{ fill: '#eee' }} />
      </BarChart>
    </div>
  );
}

export default Graph;
