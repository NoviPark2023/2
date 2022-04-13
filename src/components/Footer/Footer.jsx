import React from 'react';
import { Layout } from 'antd';
import logo from 'assets/apartments-logo-footer.png';
import style from './Footer.module.css';
const { Footer } = Layout;

function AppFooter() {
  return (
    <Footer style={{ padding: 0 }}>
      <div className={style.footer}>
        <span style={{ marginRight: '10px' }}></span>
        <img src={logo} alt="logo" className={style.logo} />
      </div>
    </Footer>
  );
}

export default AppFooter;
