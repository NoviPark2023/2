import React, { useEffect, useState } from 'react';
import { api } from 'api/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Graphlocal(propslokala) {
  const [data, setData] = useState({});
  const getData = () => {
    api.get(`/lokali/ponude-lokala-meseci/${propslokala.propslokala.id_lokala}`).then(res => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const offerByMonths = data.broj_ponuda_po_mesecima
    ? [
        { name: 'jan', Ponude: data.broj_ponuda_po_mesecima[0].jan },
        { name: 'feb', Ponude: data.broj_ponuda_po_mesecima[0].feb },
        { name: 'mar', Ponude: data.broj_ponuda_po_mesecima[0].mart },
        { name: 'apr', Ponude: data.broj_ponuda_po_mesecima[0].apr },
        { name: 'maj', Ponude: data.broj_ponuda_po_mesecima[0].maj },
        { name: 'jun', Ponude: data.broj_ponuda_po_mesecima[0].jun },
        { name: 'jul', Ponude: data.broj_ponuda_po_mesecima[0].jul },
        { name: 'avg', Ponude: data.broj_ponuda_po_mesecima[0].avg },
        { name: 'sep', Ponude: data.broj_ponuda_po_mesecima[0].sep },
        { name: 'okt', Ponude: data.broj_ponuda_po_mesecima[0].okt },
        { name: 'nov', Ponude: data.broj_ponuda_po_mesecima[0].nov },
        { name: 'dec', Ponude: data.broj_ponuda_po_mesecima[0].dec },
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
        <Bar dataKey="Ponude" fill="#0A5474" background={{ fill: '#eee' }} />
      </BarChart>
    </div>
  );
}

export default Graphlocal;
