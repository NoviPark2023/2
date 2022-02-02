import React, { useState } from 'react';
import { Button, Modal, Layout, Space, Menu } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { authService } from 'auth/auth.service';
import logostanovi from 'assets/stanovi-logo-header.png';
import 'antd/dist/antd.css';

const { Header } = Layout;
function AppHeader() {
  const activeRole = authService.getRole();
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const confirmSignout = () => {
    authService.removeToken();
    authService.removeUser();
    authService.removeRole();
    history.push('/login');
  };

  const location = useLocation();
  const showModal = () => {
    setVisible(true);
  };

  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <img style={{ width: '8rem', height: '3rem', marginRight: '22px' }} src={logostanovi} alt="Logo"></img>

      <Menu style={{ width: '100%' }} theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
        <Menu.Item key={'/'}>
          <Link to="/">Stanovi</Link>
        </Menu.Item>
        <Menu.Item key={'/lokali'}>
          <Link to="/lokali">Lokali</Link>
        </Menu.Item>
        <Menu.Item key={'/garaze'}>
          <Link to="/garaze">Garaže</Link>
        </Menu.Item>

        <Menu.Item key={'/klijenti'}>
          <Link to="/klijenti">Klijenti</Link>
        </Menu.Item>
        {activeRole !== 'Prodavac' && (
          <>
            <Menu.Item key={'/korisnici'}>
              <Link to="/korisnici">Korisnici</Link>
            </Menu.Item>
            <Menu.Item key={'/izvestaji'}>
              <Link to="/izvestaji">Izveštaji</Link>
            </Menu.Item>
            <Menu.Item style={{ backgroundColor: '#003380' }} key={'/cenaStana'}>
              <Link to="/cenaStana">Ažuriranje cene stana</Link>
            </Menu.Item>
          </>
        )}
      </Menu>

      <div>
        <Space>
          <Button>{authService.getUser()}</Button>
          <Button onClick={showModal} type="danger">
            Odjava
          </Button>
        </Space>
      </div>
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
    </Header>
  );
}

export default AppHeader;
