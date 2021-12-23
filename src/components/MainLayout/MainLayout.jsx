import React, { useState } from 'react';
import style from './MainLayout.module.css';
import 'antd/dist/antd.css';
import { Button, Layout, Menu, Modal } from 'antd';
import logo from 'assets/logo.png';
// import { loginContext } from 'App';
import { Link, useHistory, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

const AppHeader = ({ loggedUser, logOut }) => {
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  console.log(useLocation());
  const confirmSignout = e => {
    logOut();
    sessionStorage.removeItem('Token', 'fakeToken');
    history.push('/');
  };

  const showModal = () => {
    setVisible(true);
  };
  return (
    <Header className={style.headerLayout}>
      <div className={style.layoutHeader}>
        <div className={style.headerPages}>
          <Menu
            className={style.menuStyle}
            theme="dark"
            mode="horizontal"
            onSelect={item => {
              localStorage.setItem('navigationIndex', item.key);
            }}
            defaultSelectedKeys={
              localStorage.getItem('navigationIndex') ? localStorage.getItem('navigationIndex') : '1'
            }
          >
            <Menu.Item key={1}>
              <Link to="/stanovi">Stanovi</Link>
            </Menu.Item>
            <Menu.Item key={2}>
              <Link to="/klijenti">Klijenti</Link>
            </Menu.Item>
            <Menu.Item key={3}>
              <Link to="/korisnici">Korisnici</Link>
            </Menu.Item>
            <Menu.Item key={4}>
              <Link to="/izvestaji">Izveštaji</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className={style.userButton}>
          <Button>{loggedUser}</Button>
        </div>
        <div className={style.logOutButton}>
          <Button onClick={showModal} type="danger">
            Odjava
          </Button>

          <Modal
            centered
            visible={visible}
            onOk={() => setVisible(confirmSignout)}
            onCancel={() => setVisible(false)}
            width={400}
            okText="DA"
            cancelText="NE"
          >
            <p>Da li ste sigurni da želite da se odjavite?</p>
          </Modal>
        </div>
      </div>
    </Header>
  );
};

const AppFooter = () => (
  <div className={style.mainLayoutFooter}>
    <span style={{ marginRight: '10px' }}>Prodaja Stanova ©2021 Created by</span>{' '}
    <img src={logo} alt="logo" className={style.mainlayoutlogo} />
  </div>
);
function MainLayout({ children, isLoggedIn, logOut }) {
  // const { logUser } = useContext(loginContext);
  let logUser = sessionStorage.getItem('user');

  return (
    // <Layout>
    <div style={{ height: '100%' }}>
      {isLoggedIn && <AppHeader logOut={logOut} loggedUser={logUser} />}
      <div className={style.siteLayout}>
        <Content>{children}</Content>
      </div>
      {isLoggedIn && <AppFooter />}
    </div>

    // </Layout>
  );
}

export default MainLayout;
