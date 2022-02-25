import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd/lib';
import 'antd/dist/antd.css';
import { api } from 'api/api';
import { Card, Divider } from 'antd';
import { Statistic } from 'antd/es';
import { ArrowDownOutlined, ArrowUpOutlined, CaretRightOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Scroll from 'components/Scroll/Scroll';

function RoiReports() {
  // Set Ukupnu kvadraturu za sve Stanove
  const [squareOfApartments, setsquareOfApartments] = useState({});
  const getSquareOfApartments = async () => {
    api.get('/reports/roi/').then(res => {
      setsquareOfApartments(res.data.kvadratura_stanova);
    });
  };

  // Set Ukupan ROI Stanova
  const [roiApartments, setRoiApartments] = useState({});
  const getRoiApartments = async () => {
    api.get('/reports/roi/').then(res => {
      setRoiApartments(res.data.ukupan_roi_stanova);
    });
  };

  // Suma Ukupnih cena Stanova po Lamelama
  const [priceApartmentsPerLamella, setPriceApartmentsPerLamella] = useState({});
  const getPriceApartmentsPerLamella = async () => {
    api.get('/reports/roi/').then(res => {
      setPriceApartmentsPerLamella(res.data.ukupna_cena_stanova_po_lamelama);
    });
  };

  useEffect(() => {
    getSquareOfApartments();
    getPriceApartmentsPerLamella();
    getRoiApartments();
  }, []);

  return (
    <Scroll>
      {/*Kvadratura Stanova*/}

      <Title level={5}>Kvadratura Stanova</Title>
      <Row gutter={24}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Ukupno kvadrata"
              value={squareOfApartments.stanovi_ukupno_kvadrata}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="m2"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Ukupno kvadrata (-3%)"
              value={squareOfApartments.stanovi_ukupno_korekcija_kvadrata}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="m2"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Razlika (-3%)"
              value={squareOfApartments.razlika_kvadrati_korekcija}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="m2"
            />
          </Card>
        </Col>
      </Row>

      <Divider />

      {/*UKUPNE SUMA I PROSECNA CENA KVADRATA*/}
      <div className="site-card-wrapper">
        <Row gutter={24}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Ukupna Suma"
                value={roiApartments.ukupna_suma_cena_stanova}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CaretRightOutlined />}
                suffix="€"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Prosek cene kvadrata"
                value={roiApartments.prosecna_cena_kvadrata}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CaretRightOutlined />}
                suffix="€"
              />
            </Card>
          </Col>
        </Row>
      </div>
      <Divider />

      {/*UKUPNE SUME CENA STANOVA*/}
      <div className="site-card-wrapper">
        <Title level={5}>Ukupna suma po lamelama</Title>
        <Row gutter={24}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Lamela L1"
                value={roiApartments.suma_cena_stanova_lamela_l1}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CaretRightOutlined />}
                suffix="€"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Lamela L2"
                value={roiApartments.suma_cena_stanova_lamela_l2}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CaretRightOutlined />}
                suffix="€"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Lamela L3"
                value={roiApartments.suma_cena_stanova_lamela_l3}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CaretRightOutlined />}
                suffix="€"
              />
            </Card>
          </Col>
        </Row>
      </div>
      <Divider />

      {/*UKUPNE SUME PO LAMELAMA I SPRATOVIMA*/}

      <Row gutter={24}>
        {/*UKUPNE SUME PO LAMELI 1 I SPRATOVIMA*/}
        <Col span={8}>
          <Card>
            <Statistic
              title="L1 1 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l1_1}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L1 2 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l1_2}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L1 3 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l1_3}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L1 4 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l1_4}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L1 5 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l1_5}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L1 6 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l1_6}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L1 7 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l1_7}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L1 PS SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l1_ps}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
          </Card>
        </Col>

        {/*UKUPNE SUME PO LAMELI 2 I SPRATOVIMA*/}
        <Col span={8}>
          <Card>
            <Statistic
              title="L2 1 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l2_1}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L2 2 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l2_2}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L2 3 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l2_3}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L2 4 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l2_4}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L2 5 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l2_5}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L2 6 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l2_6}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L2 7 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l2_7}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L2 PS SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l2_ps}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
          </Card>
        </Col>

        {/*UKUPNE SUME PO LAMELI 3 I SPRATOVIMA*/}
        <Col span={8}>
          <Card>
            <Statistic
              title="L3 1 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l3_1}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L3 2 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l3_2}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L3 3 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l3_3}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L3 4 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l3_4}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L3 5 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l3_5}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L3 6 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l3_6}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L3 7 SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l3_7}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
            <Statistic
              title="L3 PS SPRAT"
              value={priceApartmentsPerLamella.svi_stanovi_po_lameli_l3_ps}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix=""
              suffix="€"
            />
          </Card>
        </Col>
      </Row>
      <Divider/>
    </Scroll>
  );
}

export default RoiReports;
